from pydantic import BaseModel


class SummaryGenerateRequest(BaseModel):
    skills: list[str] = []
    experience: list[dict] = []
    education: list[dict] = []


class SummaryGenerateResponse(BaseModel):
    summary: str
    
class ExperienceRewriteRequest(BaseModel):
    role: str
    company: str
    description: str


class ExperienceRewriteResponse(BaseModel):
    improved_description: str
    
class ATSAnalysisRequest(BaseModel):
    summary: str = ""
    skills: list[str] = []
    experience: list[dict] = []
    education: list[dict] = []
    projects: list[dict] = []


class ATSAnalysisResponse(BaseModel):
    score: int
    missing_keywords: list[str]
    weak_sections: list[str]
    suggestions: list[str]
    
class JDMatchRequest(BaseModel):
    resume_data: dict
    job_description: str


class JDMatchResponse(BaseModel):
    match_score: int
    matched_keywords: list[str]
    missing_keywords: list[str]
    recommendations: list[str]