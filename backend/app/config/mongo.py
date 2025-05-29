from pymongo import MongoClient
from pymongo.database import Database
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

def get_database() -> Database:
    client = MongoClient(MONGO_URI)
    return client["qr"]

db = get_database()
