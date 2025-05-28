from fastapi import APIRouter, HTTPException, Depends
from datetime import datetime
from bson import ObjectId
from app.config.mongo import get_database
from app.models.user import User, UserCreate
from passlib.context import CryptContext
from pydantic import BaseModel

router = APIRouter(prefix="/user", tags=["user"])

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

class LoginData(BaseModel):
    email: str
    password: str

# Routes
@router.post("/signup", response_model=User)
async def signup(user: UserCreate):
    db = get_database()
    # Check if user already exists
    if db.users.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create new user
    user_dict = user.model_dump()
    user_dict["password"] = get_password_hash(user_dict["password"])
    user_dict["is_active"] = True
    user_dict["created_at"] = datetime.utcnow()
    
    # Insert into database
    result = db.users.insert_one(user_dict)
    
    # Return created user (without password)
    created_user = db.users.find_one({"_id": result.inserted_id})
    created_user["id"] = str(created_user.pop("_id"))
    created_user.pop("password")
    return User.model_validate(created_user)

@router.post("/login", response_model=User)
async def login(login_data: LoginData):
    db = get_database()
    # Find user
    user = db.users.find_one({"email": login_data.email})
    if not user:
        raise HTTPException(status_code=400, detail="Invalid email or password")
    
    # Verify password
    if not verify_password(login_data.password, user["password"]):
        raise HTTPException(status_code=400, detail="Invalid email or password")
    
    # Return user info (without password)
    user["id"] = str(user.pop("_id"))
    user.pop("password")
    return User.model_validate(user)

@router.get("/me/{user_id}", response_model=User)
async def get_user(user_id: str):
    db = get_database()
    user = db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user["id"] = str(user.pop("_id"))
    user.pop("password")
    return User.model_validate(user)
