import sqlite3
from pathlib import Path

DATABASE = Path(__file__).resolve().parent / "courses.db"
def get_connection():
    connection = sqlite3.connect(DATABASE)
    connection.row_factory = sqlite3.Row
    connection.execute("PRAGMA foreign_keys = ON")
    return connection
def init_db():
    connection = get_connection()

    schema_path = Path(__file__).resolve().parent / "schema.sql"

    with open(schema_path, "r", encoding="utf-8") as file:
        connection.executescript(file.read())

    connection.commit()
    connection.close()

    print("Database created successfully!")
def seed_db():
    connection = get_connection()

    seed_path = Path(__file__).resolve().parent / "seed.sql"

    with open(seed_path, "r", encoding="utf-8") as file:
        connection.executescript(file.read())

    connection.commit()
    connection.close()

    print("Sample courses added successfully!")