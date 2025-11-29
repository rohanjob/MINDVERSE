from fastapi import APIRouter

router = APIRouter()

@router.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "MindVerse API",
        "version": "2.0.0",
        "framework": "FastAPI"
    }
