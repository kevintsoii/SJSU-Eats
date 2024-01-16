import os

import psycopg2
from psycopg2 import extras
from dotenv import load_dotenv
from flask import Flask, jsonify

from scraper.scraper import scrape_menus


load_dotenv()

app = Flask(__name__)

conn = psycopg2.connect(
    dbname="sjsu_eats",
    host="localhost",
    port=5432,
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
)
conn.autocommit = True
cur = conn.cursor(cursor_factory=extras.RealDictCursor)


@app.route("/api/menus/<date>")
def get_menus(date):
    """
    Fetches menus for the specified date.
    If none are found, requests a scrape of today's menus from the API.

    Args:
        date (str): YYYY-MM-DD format
    """
    # date, meal, location, items
    cur.execute("SELECT * FROM menus WHERE date = %s;", (date, ))
    rows = cur.fetchall()

    if not rows:
        if scrape_menus(date):
            cur.execute("SELECT * FROM menus WHERE date = %s;", (date, ))
            rows = cur.fetchall()
    
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
