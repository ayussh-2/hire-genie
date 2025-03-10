# Empty init file to make auth a package
from fastapi import APIRouter

router = APIRouter()


@router.get("/auth")
def read_auth():
    return {"message": "Authentication routes"}
