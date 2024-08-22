import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

def get_database():
    CONNECTION_STRING = os.getenv("MONGODB_CONNECTION_STRING")
    client = MongoClient(CONNECTION_STRING)
    return client["elden_ring"]

db = get_database()

def test_connection():
    try:
        collections = db.list_collection_names()
        print("Connected to mongo")
        print("collections", collections)
    except Exception as e:
        print("failed to connect", e)

if __name__ == "__main__":
    test_connection()