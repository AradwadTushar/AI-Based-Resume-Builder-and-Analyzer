import uuid

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from models.resume import Resume
from schemas.resume import ResumeCreate, ResumeResponse
from sqlalchemy import select
from schemas.resume import ResumeUpdate
from routers.auth import get_current_user



router = APIRouter(
    prefix="/api/resumes",
    tags=["Resumes"],
)



@router.post("/", response_model=ResumeResponse)
async def create_resume(
    resume_data: ResumeCreate,
    db: AsyncSession = Depends(get_db),
):
    new_resume = Resume(
        user_id=FAKE_USER_ID,
        title=resume_data.title,
        template=resume_data.template,
        data=resume_data.data,
    )

    db.add(new_resume)

    await db.commit()

    await db.refresh(new_resume)

    return new_resume

@router.get("/")
async def get_resumes(
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return {
        "message": "Authenticated route working",
        "user": current_user,
    }
    
    
@router.get("/{resume_id}", response_model=ResumeResponse)
async def get_resume(
    resume_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Resume).where(
            Resume.id == resume_id,
            Resume.user_id == FAKE_USER_ID,
        )
    )

    resume = result.scalar_one_or_none()

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found",
        )

    return resume

@router.put("/{resume_id}", response_model=ResumeResponse)
async def update_resume(
    resume_id: uuid.UUID,
    resume_data: ResumeUpdate,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Resume).where(
            Resume.id == resume_id,
            Resume.user_id == FAKE_USER_ID,
        )
    )

    resume = result.scalar_one_or_none()

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found",
        )

    update_data = resume_data.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(resume, key, value)

    await db.commit()

    await db.refresh(resume)

    return resume

@router.delete("/{resume_id}")
async def delete_resume(
    resume_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Resume).where(
            Resume.id == resume_id,
            Resume.user_id == FAKE_USER_ID,
        )
    )

    resume = result.scalar_one_or_none()

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found",
        )

    await db.delete(resume)

    await db.commit()

    return {"message": "Resume deleted successfully"}