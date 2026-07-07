from fastapi import FastAPI
from routers.resume import router as resume_router
from routers.auth import router as auth_router
from fastapi.middleware.cors import CORSMiddleware
from routers.ai import router as ai_router
from routers.analyze import router as analyze_router
from routers import export
from fastapi.staticfiles import StaticFiles
import os



app = FastAPI()
app.mount(
    "/templates",
    StaticFiles(directory="templates"),
    name="templates"
)
# Read extra allowed origins from env (comma-separated)
_extra_origins = os.getenv("ALLOWED_ORIGINS", "")
_allowed_origins = [
    "http://localhost:5173",
    *[o.strip() for o in _extra_origins.split(",") if o.strip()],
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=_allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)


app.include_router(resume_router)

app.include_router(ai_router)

app.include_router(export.router)

app.include_router(analyze_router)

@app.get("/")
async def root():
    return {"message": "AI Resume Builder API running"}

@app.get("/healthz")
async def healthz():
    return {"status": "ok"}