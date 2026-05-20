from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from fastapi.responses import (
    Response,
    HTMLResponse
)

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db

from models.resume import Resume
from models.user import User

from auth.dependencies import (
    get_current_user
)

from services.pdf_generator import (
    generate_resume_pdf,
    render_resume_template
)


router = APIRouter(
    prefix="/api/resumes",
    tags=["Export"]
)


@router.get("/{resume_id}/export")
async def export_resume(

    resume_id: str,

    db: AsyncSession = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
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

    pdf = generate_resume_pdf(

        resume_data=resume.data,

        template_name=
            resume.template or "engineer"
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


@router.get(
    "/{resume_id}/preview",

    response_class=HTMLResponse
)

async def preview_resume(

    resume_id: str,

    db: AsyncSession = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
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

    rendered_html = render_resume_template(

        resume_data=resume.data,

        template_name=
            resume.template or "engineer"
    )

    return HTMLResponse(
        content=rendered_html
    )