import os
import sys

import psycopg2
from dotenv import load_dotenv


DATABASE_NAME = "sjsu_eats"

load_dotenv()

try:
    conn = psycopg2.connect(
        host="localhost",
        port=5432,
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
    )
    conn.autocommit = True
except psycopg2.Error as e:
    sys.exit(f"Failed to connect to PostgreSQL: {e}")

cur = conn.cursor()

try:
    cur.execute(f"CREATE DATABASE {DATABASE_NAME};")
except psycopg2.Error as e:
    input("Warning: The database already exists.\n"
          "Press enter to continue (old data will be lost): ")

cur.close()
conn.close()

conn = psycopg2.connect(
    dbname="sjsu_eats",
    host="localhost",
    port=5432,
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
)

cur = conn.cursor()

cur.execute("""
    DROP TABLE IF EXISTS items;
    CREATE TABLE items (
        item_id CHAR(24) PRIMARY KEY,
        name VARCHAR(64) NOT NULL,
        description VARCHAR(256),
        portion VARCHAR(64),
        ingredients TEXT,
        nutrients JSONB,
        filters JSONB
    );
"""
)

cur.execute("""
    DROP TABLE IF EXISTS locations;
    CREATE TABLE locations (
        location_id CHAR(24) PRIMARY KEY,
        name VARCHAR(64) NOT NULL,
        image VARCHAR(256)
    );
"""
)

cur.execute("""
    DROP TABLE IF EXISTS menus;
    CREATE TABLE menus (
        date DATE,
        meal SMALLINT,
        location_id CHAR(24) REFERENCES locations(location_id),
        item_ids CHAR(24)[],
        PRIMARY KEY(date, meal, location_id)
    );
"""
)

cur.close()
conn.close()

print("Successfully created tables.")
