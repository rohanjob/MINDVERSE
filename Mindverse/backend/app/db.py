from motor.motor_asyncio import AsyncIOMotorClient
from typing import Optional
import os

class Database:
    client: Optional[AsyncIOMotorClient] = None
    
db = Database()

async def get_database():
    return db.client.mindverse_db

async def connect_to_mongo():
    """Connect to MongoDB on startup"""
    mongodb_uri = os.getenv("MONGODB_URI", "mongodb://localhost:27017/")
    db.client = AsyncIOMotorClient(mongodb_uri)
    
    # Test connection
    try:
        await db.client.admin.command('ping')
        print(f"✅ Connected to MongoDB: {mongodb_uri}")
    except Exception as e:
        print(f"❌ MongoDB connection error: {e}")
        raise

async def close_mongo_connection():
    """Close MongoDB connection on shutdown"""
    if db.client:
        db.client.close()
        print("✅ Closed MongoDB connection")

async def get_collection(collection_name: str):
    """Get a collection from the database"""
    database = await get_database()
    return database[collection_name]

# Collection names
STORIES_COLLECTION = "stories"
TEMPLES_COLLECTION = "temples"
STOTRAMS_COLLECTION = "stotrams"
USERS_COLLECTION = "users"
