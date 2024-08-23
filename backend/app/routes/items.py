from fastapi import APIRouter, Depends
from pymongo.collection import Collection
from app.test_database import get_database

router = APIRouter()

# i think depends is used because of a "shared database connection"
@router.get("/item-types/")
def get_item_types(item_type: str, db: Collection = Depends(get_database)):
    if item_type not in db.list_collection_names():
        return {"error": "invalid item type"}

    items = list(db[item_type].find())
    return items
