# AI Resume Builder v2 — Phase 6 Documentation
## Free-Tier Production Deployment & Debugging Log (Render + Cloudflare Pages)

---

## 📌 Phase Overview

Phase 6 marks the complete end-to-end deployment of **ResumeIQ AI** to cloud environments. During this process, several challenges arose across containerization, network routing, database migrations, cross-origin security, iframe sandboxing, and stylesheet resolution. 

This document serves as a comprehensive master log recording every deployment challenge, its root cause, and the exact engineering fix implemented to bring the full-stack system live.

---

# ── Part 1: Infrastructure & Git Workflows ──

## Issue 1: Git Rebase Lock Error
* **Error**:
  ```text
  error: update_ref failed for ref 'refs/heads/v2-rebuild'
  cannot lock ref
  ```
* **Root Cause**: A commit push was initiated while an interactive rebase was still active in another process, locking git reference updates.
* **Fix**: Force-quit the rebase to return the repository index to a clean state:
  ```bash
  git rebase --quit
  ```

## Issue 2: Render Deployment Container Overhead
* **Problem**: Attempting to run a local Ollama service sidecar inside Render free-tier containers consumed excessive RAM, exceeding the 512MB limit and causing container crashes.
* **Fix**: Switched the production AI provider flag back to Gemini:
  ```env
  AI_PROVIDER=gemini
  ```
  This allowed fast startups and minimized memory consumption while keeping Ollama as a zero-code-change local development option.

## Issue 3: Dockerfile Entrypoint Cleanup
* **Problem**: The initial Dockerfile still contained references to `entrypoint.sh` and `ollama serve` setups, causing container startup crashes when Ollama was disabled.
* **Fix**: Simplified the Dockerfile to initiate uvicorn directly:
  ```dockerfile
  CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
  ```

## Issue 4: Missing Python Backend Dependencies
* **Error**:
  ```text
  ModuleNotFoundError: No module named 'clerk_backend_api'
  ModuleNotFoundError: No module named 'pdfminer'
  ```
* **Root Cause**: Newly introduced python packages (`clerk-backend-api` and `pdfminer.six`) were installed in the local virtual environment but omitted from `requirements.txt`.
* **Fix**: Installed packages and updated dependencies:
  ```bash
  pip install clerk-backend-api pdfminer.six
  pip freeze > requirements.txt
  ```

## Issue 5: Requirements Generation outside Virtual Environment
* **Problem**: Running `pip freeze` outside the active virtual environment exported system-level Python packages instead of the project-specific dependencies.
* **Fix**: Activated the backend environment first before freeze:
  ```bash
  backend\.venv\Scripts\activate
  pip freeze > requirements.txt
  ```

---

# ── Part 2: Backend Authentication & Database Configuration ──

## Issue 6: Clerk Publishable Key Missing
* **Error**:
  ```text
  @clerk/clerk-react: Missing publishableKey
  ```
* **Root Cause**: The frontend Clerk SDK was missing its publishable initializer key on the production host.
* **Fix**: Injected `VITE_CLERK_PUBLISHABLE_KEY` into Cloudflare Pages' Environment Variables dashboard and rebuilt.

## Issue 7: JWT Authentication Failed (401 Unauthorized)
* **Error**:
  ```text
  AxiosError: Request failed with status code 401
  TOKEN_INVALID_AUTHORIZED_PARTIES: Authorized party claim (azp) does not match.
  ```
* **Root Cause**: The backend JWT verification was hardcoded to trust only `http://localhost:5173`. When requests came from the production URL `https://resumeiq-ai.pages.dev`, Clerk rejected the token.
* **Fix**: Configured authorized parties via environment variables:
  ```env
  CLERK_AUTHORIZED_PARTIES=http://localhost:5173,https://resumeiq-ai.pages.dev
  ```
  Updated authentication checks to split the allowed origins array dynamically:
  ```python
  AuthenticateRequestOptions(
      authorized_parties=settings.CLERK_AUTHORIZED_PARTIES.split(",")
  )
  ```

## Issue 8: Missing Pydantic Settings Attribute
* **Error**:
  ```text
  'Settings' object has no attribute 'CLERK_AUTHORIZED_PARTIES'
  ```
* **Root Cause**: The newly introduced variable was not defined in the backend's validation model.
* **Fix**: Added the string validation parameter to the Pydantic class:
  ```python
  class Settings(BaseSettings):
      CLERK_AUTHORIZED_PARTIES: str
  ```

## Issue 9: Database Tables Missing on Container Boot
* **Error**:
  ```text
  asyncpg.exceptions.UndefinedTableError: relation "users" does not exist
  ```
* **Root Cause**: The Render PostgreSQL service was a clean database instance. Database schema migrations were never executed.
* **Fix**: Configured Alembic to execute migrations inside the Docker container automatically before launching FastAPI:
  ```dockerfile
  CMD ["sh", "-c", "alembic upgrade head && uvicorn main:app --host 0.0.0.0 --port ${PORT:-8080}"]
  ```

## Issue 10: Alembic Connecting to Localhost
* **Error**:
  ```text
  OSError: Connect call failed ('127.0.0.1', 5432)
  ```
* **Root Cause**: `alembic/env.py` was reading the connection string from the static `alembic.ini` file, which still pointed to a local database.
* **Fix**: Configured Alembic to use the runtime `DATABASE_URL` settings:
  ```python
  from config import settings
  config.set_main_option("sqlalchemy.url", settings.DATABASE_URL)
  ```

## Issue 11: Gemini Initialization Startup Crash
* **Error**:
  ```text
  RuntimeError: Gemini model is not configured.
  ```
* **Root Cause**: Google Gemini API model configurations were instantiated during module imports, causing crashes at boot time before Render had fully loaded environment keys.
* **Fix**: Wrapped the builder in a lazy initialization function inside `ai_client.py` so the model is configured only upon receiving its first text request.

---

# ── Part 3: Frontend & Rendering Architecture ──

## Issue 12: Frontend Deployment Type Conflict
* **Problem**: Deploying the frontend to Cloudflare Workers failed because Workers do not build Vite configurations natively.
* **Fix**: Shifted to Cloudflare Pages, configuring the project with a Vite preset, root directory as `frontend`, and output folder as `dist`.

## Issue 13: React Router SPA Refresh 404
* **Error**: Refreshing any subpage route on the deployed URL threw a `404 Not Found`.
* **Root Cause**: The static file host tries to find physical directories for routes (like `/dashboard`) instead of letting React Router intercept the path.
* **Fix**: Added a public redirects configuration file `frontend/public/_redirects` to fallback all requests to `index.html`:
  ```text
  /* /index.html 200
  ```

## Issue 14: Backend API URL Misconfigured
* **Problem**: Frontend network calls failed after deployment.
* **Root Cause**: The API URL was pointed to `localhost:8000`.
* **Fix**: Setup environment variables in the Pages panel, pointing `VITE_API_BASE_URL` to `https://resumeiq-ai-hub4.onrender.com`.

## Issue 15: Resume Preview Failed After Deployment
* **Error**: The preview panel displayed a `localhost refused to connect` error.
* **Root Cause**: The iframe source attribute contained a hardcoded local preview URL.
* **Fix**: Cleaned up code to read from the env variable dynamically:
  ```jsx
  src={`${API_BASE_URL}/api/resumes/${resumeId}/preview`}
  ```

## Issue 16: Double-slash URL Router 404
* **Error**:
  ```text
  GET //api/resumes/.../preview 404 Not Found
  ```
* **Root Cause**: A trailing slash in `VITE_API_BASE_URL` (e.g. `https://domain.com/`) resulted in a double slash `//api` inside the request paths, which FastAPI rejected.
* **Fix**: Cleaned base URL strings in the frontend and added a silent path cleaning middleware in `main.py`:
  ```python
  @app.middleware("http")
  async def clean_double_slashes_middleware(request, call_next):
      path = request.scope.get("path", "")
      if "//" in path:
          request.scope["path"] = path.replace("//", "/")
      return await call_next(request)
  ```

## Issue 17: Cross-Origin Iframe Authentication Failure (401 Unauthorized)
* **Error**: The iframe preview threw a `401 Unauthorized` inside the browser view.
* **Root Cause**: An `<iframe>` element triggers native browser calls and cannot custom inject headers like `Authorization: Bearer <token>`. In cross-origin environments, browsers block Clerk session cookies (`__session`) inside iframes, leaving requests unauthenticated.
* **Fix**: Refactored `ExportPreviewModal.jsx` to fetch the preview HTML using the authenticated `axiosClient` and render the output inside the iframe using `srcDoc`:
  ```javascript
  axiosClient.get(`/api/resumes/${resumeId}/preview`)
    .then((res) => setHtmlContent(res.data));
  
  // Render:
  <iframe srcDoc={htmlContent} />
  ```

## Issue 18: Unstyled HTML Preview inside srcDoc
* **Problem**: The preview showed content but had no styling or layout rules.
* **Root Cause**: Because the iframe renders from a string source (`srcDoc`), relative stylesheet calls (e.g. `href="/templates/modern/style.css"`) resolved against the Cloudflare Pages origin instead of the backend Render URL.
* **Fix**: Injected a `<base>` URL tag into the head of the preview HTML dynamically:
  ```javascript
  if (html.includes("<head>")) {
    html = html.replace("<head>", `<head><base href="${API_BASE_URL}/">`);
  }
  ```

## Issue 19: WeasyPrint Page Break Whitespace Gaps
* **Problem**: The generated PDF showed massive empty gaps (e.g. Page 1 layout empty at the bottom).
* **Root Cause**: The template stylesheets applied `page-break-inside: avoid;` to `.section` elements in both standard stylesheets and `@media print` queries, forcing WeasyPrint to push entire sections to new pages.
* **Fix**: Removed `.section` from the page-break avoid rules, keeping it only on individual entries (`.entry`) so sections flow naturally across pages.

## Issue 20: Copy-Paste Formatting Description Linebreaks
* **Problem**: Descriptions pasted from PDF resumes rendered as single paragraphs containing raw bullet points (`•`) or broken line breaks.
* **Fix**: Added a string-to-array parser inside the backend's `template_context.py` to identify bullet characters, split paragraphs, and strip hard wrap newlines into clean lists dynamically.

---

## Final Deployment Status

### Backend (Render + PostgreSQL)
* ✅ Docker deployment successful
* ✅ PostgreSQL connected & automatic Alembic migrations active
* ✅ Clerk asymmetric JWT verification validated
* ✅ Dynamic environment authorized parties configured
* ✅ Context-aware PDF compilation & WeasyPrint pipelines active
* ✅ /healthz monitoring operational

### Frontend (Cloudflare Pages)
* ✅ Vite static distribution active
* ✅ SPA redirection rule configured
* ✅ Cross-Origin request validation verified
* ✅ Authentication flows live
* ✅ Iframe authenticated preview using `srcDoc` & `<base>` resolved
* ✅ Export and PDF downloads operational

---

## Final Deployment Architecture

```
                       Cloudflare Pages
                     (Vite static build)
                              │
                              │ HTTPS API calls (Clerk Authorization)
                              ▼
                 Render Web Service (FastAPI)
                              │
               ┌──────────────┴──────────────┐
               │                             │
               ▼                             ▼
       Render PostgreSQL                Gemini API
     (Auto-Alembic Schema)
```
