'''
INITIALIZING DATABASE COLLECTIONS
'''

import os
from dotenv import load_dotenv
from pymongo import MongoClient
import pandas as pd 

load_dotenv()

# 2
def connect_to_mongoDB():
    CONNECTION_STRING = os.getenv("MONGODB_CONNECTION_STRING")
    client = MongoClient(CONNECTION_STRING)
    return client["elden_ring"]

def parse_csv(file_path):
    df = pd.read_csv(file_path)
    return df.to_dict(orient="records")

def insert_data_into_mongoDB(data, collection_name, db):
    collection = db[collection_name]
    collection.insert_many(data)

# 1
def initialize_data():
    db = connect_to_mongoDB()

    weapons_data = parse_csv("/Users/khushnaingobindpuri/Desktop/projects/elden_ring_catalog/backend/csv_files/weapons.csv")
    insert_data_into_mongoDB(weapons_data, "weapons" , db)

    armors_data = parse_csv("/Users/khushnaingobindpuri/Desktop/projects/elden_ring_catalog/backend/csv_files/armors.csv")
    insert_data_into_mongoDB(armors_data, "armors", db)

    bosses_data = parse_csv("/Users/khushnaingobindpuri/Desktop/projects/elden_ring_catalog/backend/csv_files/bosses.csv")
    insert_data_into_mongoDB(bosses_data, "bosses", db)

    great_runes_data = parse_csv("/Users/khushnaingobindpuri/Desktop/projects/elden_ring_catalog/backend/csv_files/greatRunes.csv")
    insert_data_into_mongoDB(great_runes_data, "great_runes", db)

    npcs_data = parse_csv("/Users/khushnaingobindpuri/Desktop/projects/elden_ring_catalog/backend/csv_files/npcs.csv")
    insert_data_into_mongoDB(npcs_data, "npcs", db)

    remembrances_data = parse_csv("/Users/khushnaingobindpuri/Desktop/projects/elden_ring_catalog/backend/csv_files/remembrances.csv")
    insert_data_into_mongoDB(remembrances_data, "remembrances", db)

    shields_data = parse_csv("/Users/khushnaingobindpuri/Desktop/projects/elden_ring_catalog/backend/csv_files/shields.csv")
    insert_data_into_mongoDB(shields_data, "shields", db)

    talismans_data = parse_csv("/Users/khushnaingobindpuri/Desktop/projects/elden_ring_catalog/backend/csv_files/talismans.csv")
    insert_data_into_mongoDB(talismans_data, "talismans", db)

if __name__ == "__main__":
    initialize_data()
