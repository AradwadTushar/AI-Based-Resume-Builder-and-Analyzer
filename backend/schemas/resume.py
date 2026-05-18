from datetime import datetime
from uuid import UUID

from pydantic import BaseModel

class ResumeBase(BaseModel):
    title: str
    template: str
    data: dict = {}
    photo_url: str | None = None


class ResumeCreate(BaseModel):
    title: str


class ResumeUpdate(BaseModel):
    title: str | None = None
    template: str | None = None
    data: dict | None = None
    photo_url: str | None = None
    
class ResumeResponse(BaseModel):
    id: UUID
    title: str
    template: str
    photo_url: str | None
    data: dict 
    created_at: datetime
    updated_at: datetime

    model_config = {
        "from_attributes": True
    }