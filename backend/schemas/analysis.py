from datetime import datetime
from uuid import UUID
from pydantic import BaseModel

class AnalysisResponse(BaseModel):
    id: UUID
    user_id: UUID
    resume_text: str
    job_description: str | None
    score: int
    feedback: dict
    created_at: datetime

    class Config:
        from_attributes = True
        model_config = {"from_attributes": True} # support Pydantic v2 from_attributes
