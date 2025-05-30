from fastapi import APIRouter
from .user import router as user_router
from .qr import router as qr_router

router = APIRouter()

router.include_router(user_router)
router.include_router(qr_router)
