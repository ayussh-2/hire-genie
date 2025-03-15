from pydantic import BaseModel, EmailStr
from typing import Optional


class UserBase(BaseModel):
    email: EmailStr
    username: str

    class Config:
        from_attributes = True


class UserCreate(UserBase):
    password: str
    role: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class ProfileBase(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    bio: Optional[str] = None

    class Config:
        from_attributes = True


class ProfileCreate(ProfileBase):
    pass


class Profile(ProfileBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True


class User(UserBase):
    id: int
    is_active: bool
    profile: Optional[Profile] = None

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str
    user: dict


class TokenData(BaseModel):
    username: Optional[str] = None
