from pydantic import BaseModel, EmailStr
from typing import Optional, List
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Table, DateTime, Text
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import datetime

# Association table for many-to-many between Outfit and Clothes
outfit_clothes = Table(
    "outfit_clothes",
    Base.metadata,
    Column("outfit_id", Integer, ForeignKey("outfits.id"), primary_key=True),
    Column("clothes_id", Integer, ForeignKey("clothes.id"), primary_key=True)
)

class UserDB(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    clothes = relationship("ClothesDB", back_populates="user", cascade="all, delete-orphan")
    outfits = relationship("OutfitDB", back_populates="user", cascade="all, delete-orphan")

class User(BaseModel):
    id: int
    username: str
    email: EmailStr
    is_active: bool

    class Config:
        orm_mode = True

class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserRegister(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    username: str = None
    email: EmailStr = None
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class ClothesDB(Base):
    __tablename__ = "clothes"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    image_url = Column(String, nullable=False)
    description = Column(String, nullable=True)
    category = Column(String, nullable=True)
    color = Column(String, nullable=True)
    user = relationship("UserDB", back_populates="clothes")
    outfits = relationship("OutfitDB", secondary=outfit_clothes, back_populates="clothes")

class ClothingItem(BaseModel):
    id: int
    user_id: int
    image_url: str
    description: Optional[str] = None
    category: Optional[str] = None
    color: Optional[str] = None

    class Config:
        orm_mode = True

class OutfitRequest(BaseModel):
    user_id: int
    occasion: Optional[str] = None
    weather: Optional[str] = None
    preferences: Optional[List[str]] = None

class OutfitGenerateRequest(BaseModel):
    clothes_ids: List[int]
    event: Optional[str] = None
    season: Optional[str] = None

class OutfitGenerateResponse(BaseModel):
    suggestion: str

class OutfitDB(Base):
    __tablename__ = "outfits"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    suggestion_text = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    user = relationship("UserDB", back_populates="outfits")
    clothes = relationship("ClothesDB", secondary=outfit_clothes, back_populates="outfits") 