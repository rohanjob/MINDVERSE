from fastapi import APIRouter, HTTPException, status
from typing import List
from bson import ObjectId

from app.models.schemas import Temple, TempleCreate, ResponseModel
from app.db import get_collection, TEMPLES_COLLECTION

router = APIRouter()

@router.get("/", response_model=List[Temple])
async def get_temples():
    """Get all temples"""
    try:
        collection = await get_collection(TEMPLES_COLLECTION)
        temples = await collection.find().to_list(length=100)
        return temples
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.get("/{temple_id}", response_model=Temple)
async def get_temple(temple_id: str):
    """Get a specific temple by ID"""
    try:
        collection = await get_collection(TEMPLES_COLLECTION)
        temple = await collection.find_one({"_id": ObjectId(temple_id)})
        
        if not temple:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Temple not found"
            )
        
        return temple
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.post("/", response_model=ResponseModel, status_code=status.HTTP_201_CREATED)
async def create_temple(temple: TempleCreate):
    """Create a new temple"""
    try:
        collection = await get_collection(TEMPLES_COLLECTION)
        temple_dict = temple.model_dump()
        
        result = await collection.insert_one(temple_dict)
        
        return ResponseModel(
            message="Temple created successfully",
            data={"id": str(result.inserted_id)}
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
