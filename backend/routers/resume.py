from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import UUID
from database import get_db
from models.resume import Resume
from schemas.resume import ResumeCreate, ResumeResponse
from sqlalchemy import select
from schemas.resume import ResumeUpdate
from auth.dependencies import get_current_user
#from routers.auth import get_current_user



router = APIRouter(
    prefix="/api/resumes",
    tags=["Resumes"],
)



@router.post(
    "/",
    response_model=ResumeResponse,
)
async def create_resume(
    resume_data: ResumeCreate,
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    new_resume = Resume(
        user_id=current_user.id,

        title=resume_data.title,

        template="modern",

        data={
            "summary": "",
            
    "personalInfo": {
        "fullName": "",
        "email": "",
        "phone": "",
        "location": "",
        "linkedin": "",
        "github": "",
        "portfolio": "",
        "summary": "",
    },

    "experience": [],
    "education": [],
    "skills": [],
    "projects": [],
},

        photo_url=None,
    )

    db.add(new_resume)

    await db.commit()

    await db.refresh(new_resume)

    return new_resume

@router.get(
    "/",
    response_model=list[ResumeResponse]
)
async def get_resumes(
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    query = select(Resume).where(
        Resume.user_id == current_user.id
    )

    result = await db.execute(query)

    resumes = result.scalars().all()

    return resumes
    
    
@router.get(
    "/{resume_id}",
    response_model=ResumeResponse,
)
async def get_resume(
    resume_id: UUID,
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    query = select(Resume).where(
        Resume.id == resume_id,
        Resume.user_id == current_user.id,
    )

    result = await db.execute(query)

    resume = result.scalar_one_or_none()

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found",
        )

    return resume

@router.patch(
    "/{resume_id}",
    response_model=ResumeResponse,
)
async def update_resume(
    resume_id: UUID,
    resume_data: ResumeUpdate,
    

    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    query = select(Resume).where(
        Resume.id == resume_id,
        Resume.user_id == current_user.id,
    )
    
    result = await db.execute(query)

    resume = result.scalar_one_or_none()

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found",
        )

    if resume_data.title is not None:
     resume.title = resume_data.title

    if resume_data.data is not None:
     resume.data = resume_data.data

    if resume_data.template is not None:
     resume.template = resume_data.template
    print("INCOMING TEMPLATE:", resume_data.template)
    await db.commit()

    await db.refresh(resume)

    return resume

@router.delete("/{resume_id}")
async def delete_resume(
    resume_id: UUID,

    current_user=Depends(get_current_user),

    db: AsyncSession = Depends(get_db),
):
    query = select(Resume).where(
        Resume.id == resume_id,
        Resume.user_id == current_user.id,
    )

    result = await db.execute(query)

    resume = result.scalar_one_or_none()

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found",
        )

    await db.delete(resume)

    await db.commit()

    return {
        "message": "Resume deleted successfully"
    }

