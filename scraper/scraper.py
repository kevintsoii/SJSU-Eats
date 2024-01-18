import os
import json
import time
from typing import Dict, Any
from datetime import datetime, timedelta

import psycopg2
import requests
from dotenv import load_dotenv


API_URL = "https://api.dineoncampus.com/v1/location/5b50c589f3eeb609b36a87eb/periods/%s?platform=0&date=%s"
MEAL_TYPES = {
    "64ed07d2351d530789c1010d": "breakfast",
    "64ed07d2351d530789c10121": "lunch",
    "64ed07d2351d530789c10117": "dinner"
}

load_dotenv()

conn = psycopg2.connect(
    dbname="sjsu_eats",
    host="localhost",
    port=5432,
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
)
conn.autocommit = True
cur = conn.cursor()

found_items = set()
found_locations = set()


def add_item(item_data: Dict[str, Any]) -> None:
    if item_data["name"] in found_items:
        return
    
    nutrients = {
        nutrient_data["name"].split(" (")[0]: nutrient_data["value_numeric"] + nutrient_data["uom"]
        for nutrient_data in item_data["nutrients"]
    }
    filters = [
        filter_data["name"]
        for filter_data in item_data["filters"]
        if filter_data["type"] == "label"
    ]
    try:
        cur.execute(
            "INSERT INTO items VALUES (%s, %s, %s, %s, %s, %s);",
            (item_data["name"], item_data["desc"], item_data["portion"],
             item_data["ingredients"], json.dumps(nutrients), json.dumps(filters))
        )
        print(f'Added new item: {item_data["name"]}.')
    except psycopg2.IntegrityError:
        pass

    found_items.add(item_data["name"])


def add_location(location_data: Dict[str, Any]) -> None:
    if location_data["name"] in found_locations:
        return
    
    try:
        cur.execute(
            "INSERT INTO locations (name) VALUES (%s);",
            (location_data["name"], )
        )
        print(f'Added new location: {location_data["name"]}.')
    except psycopg2.IntegrityError:
        pass

    found_locations.add(location_data["name"])


def scrape_menus(date: str) -> bool:
    """
    Scrapes breakfast, lunch, and dinner menus for a given date.
    Inserts items, locations, and menus into the database.
    """
    scraped = False

    for meal_hash, meal_type in MEAL_TYPES.items():
        response = requests.get(API_URL % (meal_hash, date))
        data = response.json()
        
        for location_data in data["menu"]["periods"]["categories"]:
            items = []
            add_location(location_data)
            for item_data in location_data["items"]:
                add_item(item_data)
                items.append(item_data["name"])
            
            try:
                cur.execute(
                    "INSERT INTO menus VALUES (%s, %s, %s, %s)",
                    (date, meal_type, location_data["name"], items)
                )
                scraped = True
            except psycopg2.IntegrityError:
                pass
            conn.commit()
    
    return scraped


def main():
    current_date = datetime(2023, 12, 1)
    end_date = datetime(2024, 12, 15)
    
    while current_date < end_date:
        print(f'Obtaining menus for {current_date.strftime("%Y-%m-%d")}.')
        scrape_menus(current_date.strftime("%Y-%m-%d"))
        current_date += timedelta(days=1)
        time.sleep(5)
    
    cur.close()
    conn.close()


if __name__ == "__main__":
    main()