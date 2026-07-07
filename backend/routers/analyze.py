from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from database import get_db
from models.analysis import Analysis
from models.user import User
from auth.dependencies import get_current_user
from services.pdf_parser import parse_pdf
from services.ai_service import analyze_raw_resume
from schemas.analysis import AnalysisResponse

router = APIRouter(
    prefix="/api/analyze",
    tags=["Analysis"],
)


@router.post("/", response_model=AnalysisResponse, status_code=status.HTTP_201_CREATED)
async def analyze_pdf_resume(
    file: UploadFile = File(...),
    job_description: str = Form(None),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # Validate file format
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only PDF files are supported.",
        )

    try:
        pdf_bytes = await file.read()
        extracted_text = parse_pdf(pdf_bytes)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to parse PDF file: {str(e)}",
        )

    if not extracted_text.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Could not extract any text from the PDF. Please ensure the PDF is not an image or password protected.",
        )

    # Perform AI analysis
    try:
        analysis_result = await analyze_raw_resume(extracted_text, job_description)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"AI analysis failed: {str(e)}",
        )

    score = analysis_result.get("score", 0)
    # The JSON feedback structure returned from Gemini
    feedback = {
        "missing_keywords": analysis_result.get("missing_keywords", []),
        "weak_sections": analysis_result.get("weak_sections", []),
        "suggestions": analysis_result.get("suggestions", []),
        "rewrites": analysis_result.get("rewrites", []),
    }

    # Store analysis record in PostgreSQL
    new_analysis = Analysis(
        user_id=current_user.id,
        resume_text=extracted_text,
        job_description=job_description,
        score=score,
        feedback=feedback,
    )

    db.add(new_analysis)
    await db.commit()
    await db.refresh(new_analysis)

    return new_analysis


@router.get("/{analysis_id}", response_model=AnalysisResponse)
async def get_analysis_result(
    analysis_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(Analysis).where(
            Analysis.id == analysis_id,
            Analysis.user_id == current_user.id
        )
    )
    analysis = result.scalar_one_or_none()

    if not analysis:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Analysis record not found",
        )

    return analysis


@router.get("/", response_model=list[AnalysisResponse])
async def list_analyses(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(Analysis)
        .where(Analysis.user_id == current_user.id)
        .order_by(Analysis.created_at.desc())
    )
    analyses = result.scalars().all()
    return analyses


@router.delete("/{analysis_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_analysis_record(
    analysis_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # Try converting analysis_id to UUID if needed, or query direct
    # SQLAlchemy select handles uuid string inputs gracefully
    result = await db.execute(
        select(Analysis).where(
            Analysis.id == analysis_id,
            Analysis.user_id == current_user.id
        )
    )
    analysis = result.scalar_one_or_none()

    if not analysis:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Analysis record not found",
        )

    await db.delete(analysis)
    await db.commit()
    return None

