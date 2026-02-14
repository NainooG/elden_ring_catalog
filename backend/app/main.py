from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import items

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or ["*"] to allow all origins during development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(items.router)


@app.get("/")
def read_root():
    return {"message": "Welcome to the Elden Ring Item Explorer API!"}
