from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, ConfigDict, BeforeValidator
from typing import Optional, List, Dict, Any, Annotated
import os
import uuid
from datetime import datetime, timezone
from bson import ObjectId

from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")


def coerce_oid(v):
    if isinstance(v, ObjectId):
        return str(v)
    return v


PyObjectId = Annotated[str, BeforeValidator(coerce_oid)]


class BaseDocument(BaseModel):
    model_config = ConfigDict(extra="ignore", populate_by_name=True)

    id: Optional[PyObjectId] = Field(default=None, alias="_id")

    def to_mongo(self) -> dict:
        d = self.model_dump(by_alias=True, exclude_none=True)
        if d.get("_id") is None:
            d.pop("_id", None)
        return d

    @classmethod
    def from_mongo(cls, doc: dict):
        return cls(**doc)


class Progress(BaseDocument):
    player_id: str
    stage: str = "map"
    starter: Optional[str] = None
    completed: List[str] = Field(default_factory=list)
    badges: List[str] = Field(default_factory=list)
    dex: List[str] = Field(default_factory=list)
    lessons: List[Dict[str, str]] = Field(default_factory=list)
    interests: List[str] = Field(default_factory=list)
    champion: bool = False
    updated_at: str = Field(
        default_factory=lambda: datetime.now(timezone.utc).isoformat()
    )


class ProgressIn(BaseModel):
    model_config = ConfigDict(extra="ignore")

    player_id: str
    stage: str = "map"
    starter: Optional[str] = None
    completed: List[str] = Field(default_factory=list)
    badges: List[str] = Field(default_factory=list)
    dex: List[str] = Field(default_factory=list)
    lessons: List[Dict[str, str]] = Field(default_factory=list)
    interests: List[str] = Field(default_factory=list)
    champion: bool = False


@api_router.get("/")
async def root():
    return {"status": "ok", "app": "adis-journey-emerald"}


@api_router.get("/progress/{player_id}", response_model=Progress, response_model_exclude={"id"})
async def get_progress(player_id: str):
    doc = await db.progress.find_one({"player_id": player_id})
    if not doc:
        return Progress(player_id=player_id)
    return Progress.from_mongo(doc)


@api_router.post("/progress", response_model=Progress, response_model_exclude={"id"})
async def save_progress(input: ProgressIn):
    data = Progress(
        player_id=input.player_id,
        stage=input.stage,
        starter=input.starter,
        completed=input.completed,
        badges=input.badges,
        dex=input.dex,
        lessons=input.lessons,
        interests=input.interests,
        champion=input.champion,
        updated_at=datetime.now(timezone.utc).isoformat(),
    )
    await db.progress.replace_one(
        {"player_id": input.player_id}, data.to_mongo(), upsert=True
    )
    return data


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
