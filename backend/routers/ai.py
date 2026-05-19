from fastapi import APIRouter

from schemas.ai import (
    ATSAnalysisRequest,
    ATSAnalysisResponse,
    ExperienceRewriteRequest,
    ExperienceRewriteResponse,
    JDMatchRequest,
    JDMatchResponse,
    SummaryGenerateRequest,
    SummaryGenerateResponse,
)

from services.ai_service import analyze_resume, generate_summary, match_job_description, rewrite_experience

router = APIRouter(
    prefix="/api/ai",
    tags=["AI"],
)


@router.post(
    "/generate-summary",
    response_model=SummaryGenerateResponse,
)
async def generate_resume_summary(
    payload: SummaryGenerateRequest,
):
    summary = await generate_summary(payload.model_dump())

    return SummaryGenerateResponse(
        summary=summary
    )
    
@router.post(
    "/rewrite-experience",
    response_model=ExperienceRewriteResponse,
)
async def rewrite_experience_route(
    payload: ExperienceRewriteRequest,
):
    improved = await rewrite_experience(
        payload.model_dump()
    )

    return ExperienceRewriteResponse(
        improved_description=improved
    )
    

@router.post(
    "/analyze-resume",
    response_model=ATSAnalysisResponse,
)
async def analyze_resume_route(
    payload: ATSAnalysisRequest,
):
    result = await analyze_resume(
        payload.model_dump()
    )

    return ATSAnalysisResponse(**result)

@router.post(
    "/match-job-description",
    response_model=JDMatchResponse,
)
async def match_jd_route(
    payload: JDMatchRequest,
):
    result = await match_job_description(
        payload.model_dump()
    )

    return JDMatchResponse(**result)