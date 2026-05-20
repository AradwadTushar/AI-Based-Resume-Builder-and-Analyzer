from fastapi import FastAPI
from routers.resume import router as resume_router
from routers.auth import router as auth_router
from fastapi.middleware.cors import CORSMiddleware
from routers.ai import router as ai_router
from routers import export
from fastapi.staticfiles import StaticFiles



app = FastAPI()
app.mount(
    "/templates",
    StaticFiles(directory="templates"),
    name="templates"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)


app.include_router(resume_router)

app.include_router(ai_router)

app.include_router(export.router)

@app.get("/")
async def root():
    return {"message": "AI Resume Builder API running"}