import numpy as np
from fastapi import APIRouter, Depends, HTTPException
from pymongo.collection import Collection
from app.test_database import get_database
from bson import ObjectId

router = APIRouter()

def convert_nan_to_none(data):
    """Convert NaN values in the data to None."""
    if isinstance(data, list):
        for item in data:
            for key, value in item.items():
                if isinstance(value, float) and np.isnan(value):
                    item[key] = None
    elif isinstance(data, dict):
        for key, value in data.items():
            if isinstance(value, float) and np.isnan(value):
                data[key] = None
    return data

def convert_objectid(data):
    """Convert ObjectId to string in a MongoDB document."""
    if isinstance(data, list):
        for item in data:
            if "_id" in item:
                item["_id"] = str(item["_id"])
    elif isinstance(data, dict):
        if "_id" in data:
            data["_id"] = str(data["_id"])
    return data

@router.get("/items/{item_type}/")
def get_items_by_type(item_type: str, db: Collection = Depends(get_database)):
    collections = db.list_collection_names()

    if item_type not in collections:
        raise HTTPException(status_code=404, detail="Item type not found")

    # items = db[item_type]
    # print(items.name)
    # print(type(items))
    
    # print(list(db[item_type].find())) # prints a list of JSON objects
    
    items = list(db[item_type].find()) 
    items = convert_objectid(items)  # Convert ObjectId to string
    items = convert_nan_to_none(items)  # Convert NaN to None
    return items
