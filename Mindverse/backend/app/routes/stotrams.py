from fastapi import APIRouter, HTTPException, status, Query
from typing import List, Optional
from bson import ObjectId

from app.models.schemas import Stotram, StotramCreate, ResponseModel
from app.db import get_collection, STOTRAMS_COLLECTION

router = APIRouter()

@router.get("/", response_model=List[Stotram])
async def get_stotrams(type: Optional[str] = Query(None, description="Filter by type: tandava, bhairava, vishnu")):
    """Get all stotrams with optional type filter"""
    try:
        collection = await get_collection(STOTRAMS_COLLECTION)
        
        query = {}
        if type:
            query["type"] = type
        
        stotrams = await collection.find(query).to_list(length=100)
        return stotrams
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.get("/{stotram_id}", response_model=Stotram)
async def get_stotram(stotram_id: str):
    """Get a specific stotram by ID"""
    try:
        collection = await get_collection(STOTRAMS_COLLECTION)
        stotram = await collection.find_one({"_id": ObjectId(stotram_id)})
        
        if not stotram:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Stotram not found"
            )
        
        return stotram
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.post("/", response_model=ResponseModel, status_code=status.HTTP_201_CREATED)
async def create_stotram(stotram: StotramCreate):
    """Create a new stotram"""
    try:
        collection = await get_collection(STOTRAMS_COLLECTION)
        stotram_dict = stotram.model_dump()
        
        result = await collection.insert_one(stotram_dict)
        
        return ResponseModel(
            message="Stotram created successfully",
            data={"id": str(result.inserted_id)}
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
