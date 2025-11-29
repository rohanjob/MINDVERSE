from fastapi import APIRouter, HTTPException, status
from typing import List
from bson import ObjectId

from app.models.schemas import Story, StoryCreate, ResponseModel
from app.db import get_collection, STORIES_COLLECTION

router = APIRouter()

@router.get("/", response_model=List[Story])
async def get_stories():
    """Get all stories"""
    try:
        collection = await get_collection(STORIES_COLLECTION)
        stories = await collection.find().to_list(length=100)
        return stories
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.get("/{story_id}", response_model=Story)
async def get_story(story_id: str):
    """Get a specific story by ID"""
    try:
        collection = await get_collection(STORIES_COLLECTION)
        story = await collection.find_one({"_id": ObjectId(story_id)})
        
        if not story:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Story not found"
            )
        
        return story
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.post("/", response_model=ResponseModel, status_code=status.HTTP_201_CREATED)
async def create_story(story: StoryCreate):
    """Create a new story"""
    try:
        collection = await get_collection(STORIES_COLLECTION)
        story_dict = story.model_dump()
        
        result = await collection.insert_one(story_dict)
        
        return ResponseModel(
            message="Story created successfully",
            data={"id": str(result.inserted_id)}
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.delete("/{story_id}", response_model=ResponseModel)
async def delete_story(story_id: str):
    """Delete a story"""
    try:
        collection = await get_collection(STORIES_COLLECTION)
        result = await collection.delete_one({"_id": ObjectId(story_id)})
        
        if result.deleted_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Story not found"
            )
        
        return ResponseModel(message="Story deleted successfully")
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
