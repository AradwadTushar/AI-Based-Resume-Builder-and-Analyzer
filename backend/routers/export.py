from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import Response
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from models.resume import Resume
from services.pdf_generator import generate_resume_pdf

from auth.dependencies import get_current_user
from models.user import User


router = APIRouter(
    prefix="/api/resumes",
    tags=["Export"]
)


@router.get("/{resume_id}/export")

async def export_resume(
    resume_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    result = await db.execute(
        select(Resume).where(
            Resume.id == resume_id,
            Resume.user_id == current_user.id
        )
    )

    resume = result.scalar_one_or_none()

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    resume_data = resume.data

    pdf = generate_resume_pdf(
        resume_data=resume_data,
        template_name=resume.template or "engineer"
    )

    filename = f"{resume.title}.pdf"

    return Response(
        content=pdf,
        media_type="application/pdf",
        headers={
            "Content-Disposition":
            f"attachment; filename={filename}"
        }
    )