from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "*"
    ],  # Allow React, Vite, and all origins for dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Log on startup
@app.on_event("startup")
async def startup_event():
    logger.info("Kanban FastAPI app started. CORS enabled for localhost:3000, 5173, and all origins.") 