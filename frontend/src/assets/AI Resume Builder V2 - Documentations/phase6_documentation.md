# AI Resume Builder v2 — Phase 6 Documentation
## Free-Tier Production Deployment — Docker · Render · GitHub Actions · Gemini API

---

## 📌 Phase Overview

Phase 6 marks the transition from a **locally developed application** to a **fully deployed, production-ready web service** — entirely for free.

The goals of this phase were:
- Deploy the FastAPI backend to **Render** (free web service tier)
- Serve the React/Vite frontend via **GitHub Pages** or a static host
- Replace the hardcoded Gemini AI dependency with a **flexible, provider-swappable AI client wrapper** (supports both Gemini and Ollama)
- Containerise the backend with **Docker** for consistent, repeatable deployments
- Automate the full build-test-push-deploy pipeline with **GitHub Actions**
- Push all code changes to the remote repository on GitHub before deploying

---

## 🏗️ Architecture Deployed

```
Developer pushes to `v2-rebuild` branch
          ↓
GitHub Actions CI/CD Workflow triggers
          ↓
┌────────────────────────────────────────────────────┐
│  1. Build & lint frontend  (Node 20 + Vite)        │
│  2. Install & test backend (Python 3.12 + pytest)  │
│  3. Build Docker image                             │
│  4. Push image to GitHub Container Registry        │
│     ghcr.io/aradwadtushar/ai-based-resume-...     │
│  5. (Optional) Trigger Render re-deploy via API    │
└────────────────────────────────────────────────────┘
          ↓
Render Web Service (free tier)
  • Pulls Docker image from ghcr.io
  • Loads env vars (Clerk key, Gemini key, DB URL)
  • Runs: uvicorn main:app --host 0.0.0.0 --port 8080
          ↓
Render Free PostgreSQL
  • Connection string in DATABASE_URL env var
  • Alembic migrations run on first startup
          ↓
Frontend (static build)
  • Deployed via GitHub Pages / Cloudflare Pages
  • Calls backend via VITE_BACKEND_URL env var
```

---

## 🧠 Major Systems Built

### 1. AI Client Wrapper (`backend/services/ai_client.py`)

The original codebase called the Gemini API directly with a hard-coded import at the top of `ai_service.py`. This made it impossible to swap providers without touching all the business logic.

We introduced a **factory pattern** through a new wrapper module.

**How it works:**
- Reads the `AI_PROVIDER` environment variable at startup.
- If `AI_PROVIDER=gemini` (or the variable is missing), returns the Gemini model object.
- If `AI_PROVIDER=ollama`, returns an `OllamaClient` instance that calls the Ollama REST API at `OLLAMA_BASE_URL`.

```python
# backend/services/ai_client.py (simplified)

import os
AI_PROVIDER = os.getenv("AI_PROVIDER", "gemini").lower()

try:
    import google.generativeai as genai
    genai.configure(api_key=settings.GEMINI_API_KEY)
    _gemini_model = genai.GenerativeModel("gemini-3.1-flash-lite")
except Exception:
    _gemini_model = None

class OllamaClient:
    def generate_content(self, prompt: str) -> str:
        resp = requests.post(
            f"{OLLAMA_BASE_URL}/api/generate",
            json={"model": OLLAMA_MODEL, "prompt": prompt, "stream": False},
            timeout=30
        )
        return resp.json().get("response", "")

def get_model():
    if AI_PROVIDER == "ollama":
        return OllamaClient()
    if _gemini_model is None:
        raise RuntimeError("Gemini model is not configured. Check GEMINI_API_KEY.")
    return _gemini_model
```

**Key design decision:** `ai_service.py` now only imports `get_model()` from `ai_client.py`. Every `model.generate_content(prompt)` call in ai_service works identically regardless of which provider is behind it. This means:
- **For you (personal dev):** Keep `AI_PROVIDER=gemini` and your free API key locally.
- **For production (or future scale):** Set `AI_PROVIDER=ollama` on Render and all AI calls route to an Ollama server.

### 2. Dockerfile (`Dockerfile` at project root)

Created a minimal production Dockerfile based on the slim Python 3.12 image.

```dockerfile
FROM python:3.12-slim

WORKDIR /app

# Install system build tools (needed for some Python packages)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies first (Docker layer caching)
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source code
COPY backend/ .

# Expose port 8080
EXPOSE 8080

# Start FastAPI with uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
```

**What you learned:**
- `COPY requirements.txt` + `RUN pip install` is always placed **before** `COPY <source>` to exploit Docker's layer cache. If only your code changes (not requirements), Docker reuses the cached `pip install` layer and the rebuild is much faster.
- `python:3.12-slim` excludes unnecessary OS packages, keeping the image under 300 MB.
- `--no-cache-dir` in pip install avoids storing the pip wheel cache inside the image, saving ~50 MB.
- The port is **8080** because Render free tier defaults to that port for Docker services.

### 3. Docker Compose (`docker-compose.yml` at project root)

Added a local development compose file that brings up the backend together with an optional Ollama container on the same Docker network — useful for future testing with a local LLM.

```yaml
version: '3.8'
services:
  backend:
    build: .
    ports:
      - "8080:8080"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - CLERK_SECRET_KEY=${CLERK_SECRET_KEY}
      - GEMINI_API_KEY=${GEMINI_API_KEY}
      - AI_PROVIDER=ollama
      - OLLAMA_BASE_URL=http://ollama:11434
    depends_on:
      - ollama
  ollama:
    image: ollama/ollama:0.3.9
    ports:
      - "11434:11434"
    volumes:
      - ollama_data:/root/.ollama
    restart: unless-stopped
volumes:
  ollama_data:
```

**Note:** `depends_on` only guarantees the `ollama` container is **started**, not that the model is ready. In practice, the backend waits via a short `sleep 5` in the entrypoint before making API calls.

### 4. GitHub Actions Workflow (`.github/workflows/deploy.yml`)

The full CI/CD pipeline runs automatically whenever you push to `main` or `v2-rebuild`.

**Jobs and their responsibilities:**

| Job | Runner | What it does |
|-----|--------|--------------|
| `build-frontend` | `ubuntu-latest` | Installs Node 20, runs `npm ci`, lints, tests, and builds the static site. Uploads `dist/` as an Actions artifact for 90 days. |
| `build-backend` | `ubuntu-latest` | Installs Python 3.12, installs backend dependencies from `requirements.txt`, runs `pytest`. |
| `docker-build-push` | `ubuntu-latest` | Needs both jobs above to succeed. Logs into `ghcr.io` using the built-in `GITHUB_TOKEN` (no extra secret needed), builds the multi-arch Docker image, and pushes it as `ghcr.io/<repo>:latest`. |
| `deploy-render` | `ubuntu-latest` | **Optional.** Only runs if `RENDER_API_KEY` is set as a GitHub Actions secret. Calls the Render API to trigger a re-deploy of the existing service. |

```yaml
# Key snippet — Docker build & push
- name: Build and push Docker image
  uses: docker/build-push-action@v5
  with:
    context: .
    push: true
    tags: ghcr.io/${{github.repository}}:latest
```

**What you learned:**
- `ghcr.io` (GitHub Container Registry) is **free for public repos** and integrates seamlessly with `GITHUB_TOKEN`, so you need zero extra credentials in your secrets.
- Docker Buildx + QEMU enables **multi-architecture builds** (amd64 + arm64), which means the same image works on Mac M-series chips locally and on Render's x86-64 servers.
- A CI job `needs: [job-a, job-b]` creates a **dependency graph**; the Docker push only happens if both the frontend and backend build jobs succeed first.

### 5. Health Check Endpoint (`/healthz`)

Added a lightweight health endpoint to `backend/main.py` that Render and monitoring tools can ping to verify the service is up.

```python
@app.get("/healthz")
async def healthz():
    return {"status": "ok"}
```

**Why this matters:** Render uses the health check to decide whether a newly deployed container is ready to receive traffic. Without it, Render falls back to checking for HTTP 200 on `/`, which works — but `/healthz` is the industry standard and avoids accidentally routing health traffic through your authentication middleware.

---

## ⚙️ Environment Variables — Reference Table

| Variable | Local `.env` value | Render value | Purpose |
|----------|--------------------|--------------|---------|
| `DATABASE_URL` | `postgresql+asyncpg://postgres:2905@localhost:5432/ai_resume` | Render free PostgreSQL URI | SQLAlchemy async DB connection |
| `CLERK_SECRET_KEY` | `sk_test_...` | Same key (or prod key if you upgrade Clerk) | Clerk JWT verification |
| `GEMINI_API_KEY` | Your personal Gemini API key | Same key | AI text generation (Gemini provider) |
| `AI_PROVIDER` | `gemini` (or omit) | `gemini` | Selects which AI backend `ai_client.py` uses |
| `OLLAMA_BASE_URL` | `http://localhost:11434` | `http://localhost:11434` (if Ollama runs as sidecar) | Ollama REST API address |
| `OLLAMA_MODEL` | `llama3` | `llama3` | Which Ollama model to use |

---

## 🔥 Errors Faced & Lessons Learned

### 1. Git push rejected — remote ahead of local

**Error message:**
```
! [rejected] v2-rebuild -> v2-rebuild (fetch first)
hint: Updates were rejected because the remote contains work that you do not have locally.
```

**Cause:** Another commit existed on the remote `v2-rebuild` branch that hadn't been pulled to the local machine (e.g., a merge from GitHub UI or another device).

**Solution:** Always run `git pull --rebase` before pushing. Rebase replays your local commits on top of the remote tip instead of creating a merge commit, keeping the history linear.

```bash
git pull --rebase
# resolve any conflicts if they appear
git push origin v2-rebuild
```

**Lesson:** On a solo project this usually happens when you edit a file directly on GitHub.com. Always pull first — or set `git config pull.rebase true` globally.

---

### 2. Relative import error in `ai_service.py`

**Error:** After refactoring `ai_service.py` to import from `ai_client.py`, the server threw:

```
ImportError: attempted relative import with no known parent package
```

**Cause:** The import was written as `from .ai_client import get_model` (relative import), but `uvicorn main:app` treats the `backend/` directory as the root package. Python's import system couldn't resolve the leading dot because no `__init__.py` existed to declare a package.

**Solution:** Use either a bare import `from services.ai_client import get_model` (with the services directory discoverable via `sys.path`) or add an `__init__.py` to `backend/services/`.

**Lesson:** Relative imports (`from . import ...`) only work inside a proper Python package. When running uvicorn from the `backend/` directory directly, all imports should be absolute.

---

### 3. `ENTRYPOINT` vs `CMD` in Dockerfile

During the Ollama-entrypoint phase, the Dockerfile had:
```dockerfile
ENTRYPOINT ["/entrypoint.sh"]
```
which overrides `CMD` completely. Later, when we simplified to Gemini-only, the `CMD` was removed but the `ENTRYPOINT` still referenced the deleted shell script — causing the container to crash on startup.

**Lesson:** Use `CMD` for the default startup command unless you specifically need `ENTRYPOINT` (e.g., when the container always runs the same executable but accepts different arguments). Prefer:
```dockerfile
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
```

---

### 4. Node version incompatibility with Vite

**Warning from Vite dev server:**
```
You are using Node.js 22.9.0. Vite requires Node.js 20.19+ or 22.12+.
```

**Cause:** Node 22.9 falls in the gap between two supported ranges. Vite 8 requires exactly `>= 20.19` or `>= 22.12`.

**Solution (two options):**
1. Upgrade Node to 22.12+ (or LTS 20.19+) using `nvm use 20` or `nvm use 22.12`.
2. Pin a compatible Node version in `package.json` under the `engines` field, and the GitHub Actions workflow already uses `node-version: '20'` which is safe.

---

### 5. `lucide-react` export named `Github` does not exist

**Error in browser console:**
```
SyntaxError: The requested module 'lucide-react.js' does not provide an export named 'Github'
```

**Cause:** The correct export is `GitHub` (capital H) in lucide-react v0.300+. The old `Github` name was removed in a breaking version update.

**Fix:** Replace `import { Github } from 'lucide-react'` with `import { GitHub } from 'lucide-react'`.

---

## 📁 Files Changed / Created

| File | Type | Summary |
|------|------|---------|
| `backend/services/ai_client.py` | **NEW** | Provider factory — returns Gemini or Ollama client based on `AI_PROVIDER`. |
| `backend/services/ai_service.py` | **MODIFIED** | Removed direct Gemini import; now calls `get_model()` from `ai_client.py`. |
| `backend/requirements.txt` | **MODIFIED** | Added `requests==2.32.3` (Ollama HTTP client dependency). |
| `backend/main.py` | **MODIFIED** | Added `/healthz` health-check endpoint. |
| `backend/.env` | **MODIFIED** | Added `AI_PROVIDER=gemini` to control provider selection. |
| `Dockerfile` | **NEW** | Minimal Python 3.12-slim image; installs deps, copies backend source, runs uvicorn on port 8080. |
| `docker-compose.yml` | **NEW** | Local dev compose config: backend + optional Ollama sidecar on the same Docker network. |
| `entrypoint.sh` | **NEW (then simplified)** | Originally started Ollama before uvicorn; simplified back to a direct CMD after decision to keep Gemini. |
| `.github/workflows/deploy.yml` | **NEW** | Four-job CI/CD: frontend build → backend test → Docker push to ghcr.io → optional Render deploy. |

---

## 🚀 Deployment Checklist (Render + GitHub Packages)

```
- [x] AI client wrapper created (supports Gemini + Ollama)
- [x] ai_service.py updated to use wrapper
- [x] requests added to requirements.txt
- [x] /healthz endpoint added to main.py
- [x] Dockerfile created (python:3.12-slim, port 8080)
- [x] docker-compose.yml created (backend + ollama sidecar)
- [x] GitHub Actions workflow created (.github/workflows/deploy.yml)
- [x] Code committed and pushed to v2-rebuild branch
- [ ] Create Render free Web Service (Docker source, ghcr.io image)
- [ ] Add env vars on Render (DATABASE_URL, CLERK_SECRET_KEY, GEMINI_API_KEY, AI_PROVIDER=gemini)
- [ ] Create Render free PostgreSQL → paste URI into DATABASE_URL
- [ ] (Optional) Add RENDER_API_KEY + RENDER_SERVICE_ID to GitHub secrets
- [ ] Verify live URL: https://<service>.onrender.com/healthz → {"status":"ok"}
- [ ] Test full flow: sign-in → create resume → analyze → download PDF
```

---

## 🌐 AI Provider Strategy

| Scenario | `AI_PROVIDER` | LLM Used | Cost |
|----------|---------------|----------|------|
| **Personal local dev** | `gemini` (or unset) | Gemini Flash Lite via Google API | Free personal quota |
| **Production (Render)** | `gemini` | Gemini Flash Lite via Google API | Free personal quota (fine for low traffic) |
| **Future scale / public launch** | `ollama` | LLaMA 3 or Gemma 2 via local server | $0 (runs inside the container or a sidecar) |

> **Decision made during Phase 6:** Since traffic will be low (personal project / portfolio showcase), Gemini API stays for both local and production. Ollama is kept as a future option — all the code infrastructure is already in place; you only need to change one environment variable (`AI_PROVIDER=ollama`) and add the Ollama service.

---

## 🔒 Security Notes

1. **Never commit `.env` to Git.** The `.gitignore` already excludes `.env` files. The Render env vars are set via the dashboard, not the repository.
2. **`GITHUB_TOKEN`** used by the Docker push job is a short-lived, scoped token automatically injected by GitHub Actions. You do not need to create a Personal Access Token (PAT) for ghcr.io on public repositories.
3. **Passport photos** (if stored) should only be returned to the authenticated user. The Clerk middleware (`Depends(get_current_user)`) must protect any route that reads or writes user-specific media.
4. **Gemini API key** is server-side only; it lives in `backend/.env` and Render's env var store. It is never exposed to the React frontend.

---

## 📚 Key Concepts Learned in Phase 6

| Concept | What you learned |
|---------|----------------|
| **Docker layer caching** | Ordering `COPY requirements.txt` + `RUN pip install` before `COPY source/` means code changes don't invalidate the dependency cache, keeping rebuilds fast. |
| **GHCR vs Docker Hub** | GitHub Container Registry is free for public repos and uses the same `GITHUB_TOKEN` as the rest of Actions — zero extra setup. Docker Hub free tier limits pulls to 100/6h per IP. |
| **`git pull --rebase`** | Rebases your local commits on top of the remote instead of creating a noisy merge commit. Keeps history linear and clean. |
| **Factory pattern for providers** | Abstracting the AI provider behind `get_model()` means business logic (`ai_service.py`) never needs to know *which* LLM is running — making future migrations a one-variable change. |
| **CI/CD `needs` dependency graph** | Using `needs: [job-a, job-b]` ensures Docker image is only pushed after both build jobs pass — preventing a broken image from being deployed. |
| **Health check endpoints** | Industry standard `/healthz` endpoint lets Render (and k8s, load balancers, etc.) verify service health independently of application routes. |
| **`CMD` vs `ENTRYPOINT`** | `CMD` sets the default command and can be overridden at `docker run` time. `ENTRYPOINT` sets a fixed executable. Use `CMD` for simple servers; `ENTRYPOINT` for wrappers. |

---

## 🔭 Future Steps (Phase 7+)

1. **Cloudinary integration** – Store passport photos in Cloudinary instead of Base64 in DB. Free tier: 25 GB bandwidth, 300 K transforms/month.
2. **Ollama switch** – When traffic grows, set `AI_PROVIDER=ollama` on Render and add an Ollama sidecar (or separate Fly.io service) to eliminate API rate-limit concerns.
3. **Alembic auto-migration on deploy** – Add `alembic upgrade head` as a pre-start command in the Dockerfile so DB schema changes are applied automatically on every new deploy.
4. **Frontend deployment** – Build and deploy the React app to Cloudflare Pages (free, unlimited bandwidth) with `VITE_BACKEND_URL` pointing to the Render backend URL.
5. **Custom domain** – Attach a free `.github.io` subdomain (via GitHub Pages) or a Cloudflare-managed domain for a professional public URL.
6. **Monitoring** – Add Sentry (free tier, 5 K errors/month) for error tracking, and UptimeRobot (free) to send a ping to `/healthz` every 5 minutes and alert you if the service goes down.

---

*Phase 6 deployment is complete. The codebase is containerised, the CI/CD pipeline is active, and the backend is ready to be connected to a Render free-tier service. The Gemini API powers all AI features in production, with Ollama available as a zero-code-change future upgrade.*
