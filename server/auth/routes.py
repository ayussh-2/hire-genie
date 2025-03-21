from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from jose import JWTError, jwt

from database import get_db
from core.config import settings
from core.security import create_access_token, create_refresh_token
from core.responses import success_response, error_response
from auth import crud, schemas

from auth.dependencies import get_current_user

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register")
def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user_email = crud.get_user_by_email(db, email=user.email)
    if db_user_email:
        return error_response(
            message="Registration failed",
            errors="Email already registered",
            status_code=status.HTTP_400_BAD_REQUEST,
        )
    created_user = crud.create_user(db=db, user=user)
    return success_response(
        data=schemas.User.from_orm(created_user).dict(),
        message="User registered successfully",
        status_code=status.HTTP_201_CREATED,
    )


@router.post("/login")
def login_user(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if not db_user:
        return error_response(
            message="Login failed",
            errors="User not found",
            status_code=status.HTTP_404_NOT_FOUND,
        )
    if not crud.authenticate_user(db, email=user.email, password=user.password):
        return error_response(
            message="Login failed",
            errors="Incorrect email or password",
            status_code=status.HTTP_401_UNAUTHORIZED,
        )
    return success_response(
        data=schemas.User.from_orm(db_user).dict(),
        message="Login successful",
        status_code=status.HTTP_200_OK,
    )


@router.post("/token")
def login_for_access_token(user: schemas.UserLogin, db: Session = Depends(get_db)):
    user = crud.authenticate_user(db, user.email, user.password)
    if not user:
        return error_response(
            message="Authentication failed",
            errors="Incorrect email or password",
            status_code=status.HTTP_401_UNAUTHORIZED,
        )

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={
            "sub": user.username,
            "name": user.username,
            "email": user.email,
            "id": user.id,
            "role": user.role,
        },
        expires_delta=access_token_expires,
    )

    refresh_token = create_refresh_token(
        data={
            "sub": user.username,
            "id": user.id,
        }
    )

    token_data = {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "user": schemas.User.from_orm(user).dict(),
    }
    return success_response(data=token_data, message="Login successful")


@router.get("/me")
def read_users_me(current_user=Depends(get_current_user)):
    if not current_user.is_active:
        return error_response(
            message="Access denied",
            errors="User account is inactive",
            status_code=status.HTTP_403_FORBIDDEN,
        )

    return success_response(
        data=schemas.User.from_orm(current_user).dict(),
        message="User details retrieved successfully",
    )


@router.post("/refresh", response_model=schemas.Token)
async def refresh_token(refresh_token: str, db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid refresh token",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(
            refresh_token,
            settings.SECRET_KEY,
            algorithms=[settings.JWT_ALGORITHM],
        )
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError as e:
        print(f"JWT Error during refresh: {e}")
        raise credentials_exception

    user = crud.get_user_by_username(db, username=username)
    if user is None:
        raise credentials_exception

    # Create new access and refresh tokens
    access_token = create_access_token(
        data={
            "sub": user.username,
            "name": user.username,
            "email": user.email,
            "id": user.id,
            "role": user.role,
        }
    )
    new_refresh_token = create_refresh_token(data={"sub": user.username, "id": user.id})

    return {
        "access_token": access_token,
        "refresh_token": new_refresh_token,
        "token_type": "bearer",
        "user": schemas.User.from_orm(user).dict(),
    }
