from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from auth.routes import router as auth_router
from database import create_tables

app = FastAPI(title="AI-Powered Recruitment Platform API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the router without prefix since we added it in the router definition
app.include_router(auth_router)

# Add other routers as needed
# app.include_router(other_router)


@app.get("/")
def read_root():
    return {"message": "Welcome to the AI-Powered Recruitment Platform API"}


@app.on_event("startup")
def startup_db_client():
    create_tables()


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
