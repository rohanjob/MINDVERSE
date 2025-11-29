from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from bson import ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(cls, core_schema, handler):
        return {"type": "string"}

# Story Models
class StoryBase(BaseModel):
    title: str
    description: str
    verse: str
    category: str
    deity: str = "shiva"

class StoryCreate(StoryBase):
    pass

class Story(StoryBase):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    model_config = {
        "populate_by_name": True,
        "arbitrary_types_allowed": True,
        "json_encoders": {ObjectId: str}
    }

# Temple Models
class Coordinates(BaseModel):
    latitude: float
    longitude: float

class TempleBase(BaseModel):
    name: str
    location: str
    description: str
    significance: str
    deity: str = "shiva"
    coordinates: Optional[Coordinates] = None

class TempleCreate(TempleBase):
    pass

class Temple(TempleBase):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    model_config = {
        "populate_by_name": True,
        "arbitrary_types_allowed": True,
        "json_encoders": {ObjectId: str}
    }

# Stotram Models
class Verse(BaseModel):
    sanskrit: str
    translation: str
    verse_number: int

class StotramBase(BaseModel):
    type: str  # tandava, bhairava, vishnu
    title: str
    verses: List[Verse]
    deity: str
    author: Optional[str] = None

class StotramCreate(StotramBase):
    pass

class Stotram(StotramBase):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    model_config = {
        "populate_by_name": True,
        "arbitrary_types_allowed": True,
        "json_encoders": {ObjectId: str}
    }

# Response Models
class ResponseModel(BaseModel):
    message: str
    data: Optional[dict] = None

class ErrorResponse(BaseModel):
    error: str
    details: Optional[str] = None
