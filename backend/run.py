import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import router as api_router

app = FastAPI(
    title="QR Code Tracker API",
    description="API for QR code generation and tracking",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Include API routes
app.include_router(api_router)

if __name__ == "__main__":
    uvicorn.run(
        "run:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
