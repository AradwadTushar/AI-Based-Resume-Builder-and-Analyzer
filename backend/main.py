from fastapi import FastAPI
from routers.resume import router as resume_router

app = FastAPI()

app.include_router(resume_router)


@app.get("/")
async def root():
    return {"message": "AI Resume Builder API running"}