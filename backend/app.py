import os
from datetime import datetime

import psycopg2
from psycopg2 import extras
from dotenv import load_dotenv
from flask import Flask, jsonify
from flask_cors import CORS

from scraper.scraper import scrape_menus


load_dotenv()

app = Flask(__name__)
CORS(app)

currently_scraping = set()

conn = psycopg2.connect(
    dbname="sjsu_eats",
    host="localhost",
    port=5432,
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
)
conn.autocommit = True
cur = conn.cursor(cursor_factory=extras.RealDictCursor)


def is_valid_date(date: str) -> bool:
    try:
        datetime.strptime(date, "%Y-%m-%d")
        return True
    except ValueError:
        return False


@app.route("/api/menus/<date>")
def get_menus(date):
    """
    Fetches menus for the specified date.
    If none are found, requests a scrape of today's menus from the API.

    Args:
        date (str): YYYY-MM-DD format
    """
    if not is_valid_date(date):
        return jsonify({"error": "Invalid date format."}), 400
    
    # date, meal, location, items
    cur.execute("SELECT * FROM menus WHERE date = %s;", (date, ))
    rows = cur.fetchall()

    if not rows:
        if date not in currently_scraping:
            currently_scraping.add(date)
            scraped_successfully = scrape_menus(date)
            currently_scraping.remove(date)
            if scraped_successfully:
                cur.execute("SELECT * FROM menus WHERE date = %s;", (date, ))
                rows = cur.fetchall()

    if not rows:
        return jsonify({"error": "No menus found for this date."}), 404
    
    item_names = set()
    for row in rows:
        item_names.update(row["items"])

    if item_names:
        cur.execute("SELECT * FROM items WHERE name IN %s", (tuple(item_names), ))
        item_rows = cur.fetchall()
        item_data = {
            item_row["name"]: {k: v for k, v in item_row.items() if k != "name"}
            for item_row in item_rows
        }
    
    menus = {
        "breakfast": {},
        "lunch": {},
        "dinner": {}
    }
    for row in rows:
        menus[row["meal"]][row["location"]] = [
            item_data[item_name] for item_name in row["items"]
        ]
    
    return jsonify(menus)
