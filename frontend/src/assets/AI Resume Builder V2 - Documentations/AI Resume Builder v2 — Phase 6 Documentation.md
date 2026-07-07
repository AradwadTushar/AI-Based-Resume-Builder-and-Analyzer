# Phase 6: Deployment Challenges & Fixes

## Overview

During deployment of the AI Resume Builder & Analyzer, multiple runtime, dependency, infrastructure, and configuration issues were encountered. This document records every major issue, its cause, and the implemented solution.

---

# 1. Git Rebase Lock Error

### Error

```text
error: update_ref failed for ref 'refs/heads/v2-rebuild'
cannot lock ref
```

### Cause

A commit was pushed while an interactive rebase was still active, causing Git's branch reference to become inconsistent.

### Solution

Exited the unfinished rebase.

```bash
git rebase --quit
```

Repository returned to a clean state.

---

# 2. Render Deployment Configuration

## Initial Plan

Originally attempted to deploy with:

* Docker Compose
* Ollama
* Internal AI service

### Problem

The application is intended for personal usage and testing.

Running Ollama inside Render:

* increases deployment complexity
* consumes memory
* unnecessary while Gemini API is available

### Solution

Switched deployment strategy.

Old

```
AI_PROVIDER=ollama
```

New

```
AI_PROVIDER=gemini
```

Result

* Smaller Docker image
* Faster startup
* Free Gemini API used directly

---

# 3. Dockerfile Simplification

## Initial Dockerfile

Included

```dockerfile
ENTRYPOINT ["/entrypoint.sh"]
```

and

```
ollama serve
```

### Problem

Ollama was no longer required.

### Solution

Removed

* entrypoint.sh
* ENTRYPOINT
* Ollama startup

Final Dockerfile

```dockerfile
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
```

---

# 4. Missing Clerk SDK

## Error

```text
ModuleNotFoundError:
No module named 'clerk_backend_api'
```

### Cause

Package installed locally but not added to requirements.txt.

### Solution

Installed

```bash
pip install clerk-backend-api
```

Regenerated

```bash
pip freeze > requirements.txt
```

Committed updated dependency list.

---

# 5. Missing PDF Parser

## Error

```text
ModuleNotFoundError:
No module named 'pdfminer'
```

### Cause

pdfminer.six missing from deployment dependencies.

### Solution

Installed

```bash
pip install pdfminer.six
```

Updated

```
requirements.txt
```

---

# 6. Incorrect Requirements Generation

### Problem

requirements.txt was generated outside the project's virtual environment.

Result

Many packages were missing or incorrect.

### Solution

Activated project venv.

```bash
backend\.venv\Scripts\activate
```

Generated

```bash
pip freeze > requirements.txt
```

Verified required packages existed.

Example

```
fastapi
SQLAlchemy
pdfminer.six
clerk-backend-api
google-generativeai
```

---

# 7. Gemini Initialization Crash

## Error

```text
RuntimeError:
Gemini model is not configured.
```

### Cause

Gemini model was initialized immediately during module import.

When Render started, environment variables were not yet validated.

### Solution

Changed implementation to lazy initialization.

Old

```python
model = get_model()
```

New

```python
def get_gemini_model():
    return get_model()
```

Model now initializes only when an AI request occurs.

Benefits

* Faster startup
* Better error handling
* Application boots without requiring AI immediately

---

# 8. WeasyPrint Missing Linux Libraries

## Error

```
cannot load library
libgobject-2.0
```

### Cause

WeasyPrint depends on Linux system packages not included in python:3.12-slim.

Missing libraries included

* cairo
* pango
* gdk-pixbuf
* gobject

### Solution

Installed required Debian packages in Dockerfile.

Example

```dockerfile
apt-get install -y \
libgobject-2.0-0 \
libpango-1.0-0 \
libpangocairo-1.0-0 \
libcairo2 \
libgdk-pixbuf-2.0-0
```

PDF generation now works on Render.

---

# 9. PostgreSQL Configuration

### Task

Created free PostgreSQL database on Render.

Configured

```
DATABASE_URL
```

using Render's Internal Database URL.

Backend connected successfully.

---

# 10. Render Environment Variables

Configured

```
DATABASE_URL

CLERK_SECRET_KEY

GEMINI_API_KEY

AI_PROVIDER=gemini
```

These are managed through Render Environment Variables.

---

# 11. Backend Health Endpoint

Added

```python
@app.get("/healthz")
```

Returns

```json
{
  "status":"ok"
}
```

Used by Render Health Checks.

---

# 12. Frontend Deployment

Initially attempted

Cloudflare Worker

### Problem

Worker deployments do not build Vite applications automatically.

### Solution

Deleted Worker deployment.

Created

Cloudflare Pages project.

Configuration

```
Framework
Vite

Root Directory
frontend

Build Command
npm run build

Output Directory
dist
```

---

# 13. React Router Configuration

Added

```
frontend/public/_redirects
```

Contents

```
/* /index.html 200
```

Prevents 404 errors when refreshing routes.

---

# 14. Missing Clerk Publishable Key

## Error

```
Missing publishableKey
```

### Cause

Cloudflare Pages did not receive

```
VITE_CLERK_PUBLISHABLE_KEY
```

during build.

### Solution

Added environment variables inside Cloudflare Pages.

```
VITE_CLERK_PUBLISHABLE_KEY

VITE_API_BASE_URL
```

Then rebuilt frontend.

---

# 15. Incorrect API URL

Mistaken value

```
https://your-render-service.onrender.com
```

was left unchanged.

### Solution

Updated

```
VITE_API_BASE_URL
```

to actual Render backend URL.

---

# 16. Cloudflare Pages Deployment

Successfully deployed frontend.

Project URL

```
https://resumeiq-ai.pages.dev
```

Backend

```
https://resumeiq-ai-hub4.onrender.com
```

---

# Lessons Learned

* Always generate `requirements.txt` from the project virtual environment.
* Delay initialization of external services (Gemini) until actually needed.
* Render environment variables are only available after deployment starts.
* WeasyPrint requires Linux system libraries in Docker images.
* Use Cloudflare Pages for Vite projects instead of Cloudflare Workers.
* Verify environment variables before building frontend applications.
* Separate frontend and backend deployments simplify scaling and debugging.

---

## Final Deployment Architecture

```
                Cloudflare Pages
              (React + Vite Frontend)
                       │
                       │ HTTPS
                       ▼
         Render Web Service (FastAPI Backend)
                       │
          ┌────────────┴────────────┐
          │                         │
          ▼                         ▼
   Render PostgreSQL          Gemini API
```

This deployment journey involved solving Git issues, Docker configuration, Python dependencies, Linux runtime libraries, environment variable management, frontend hosting, authentication setup, and cloud infrastructure integration, resulting in a fully cloud-hosted architecture using Cloudflare Pages, Render, PostgreSQL, Clerk, and Gemini.
