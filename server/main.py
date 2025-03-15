from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from auth.routes import router as auth_router
from jobs.routes import router as jobs_router
from database import create_tables
import logging
from auth.models import User
from jobs.models import Job

app = FastAPI(title="HireGenie API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logger = logging.getLogger("uvicorn")


# @app.on_event("startup")
# def startup_db_client():
#     create_tables()
#     logger.info("Database migrations completed successfully")


app.include_router(auth_router, prefix="/api")
app.include_router(jobs_router, prefix="/api")


@app.get("/")
def read_root():
    return {"message": "Welcome to the HireGenie API"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
