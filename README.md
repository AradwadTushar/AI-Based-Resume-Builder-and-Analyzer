<div align="center">

<img src="frontend/src/assets/full_logo.png" alt="ResumeIQ AI Logo" width="120"/>

# ResumeIQ AI

### AI-Powered Resume Builder, ATS Optimization & Analytics Engine

[![Python](https://img.shields.io/badge/Python-3.12-3776AB?style=flat&logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.x-009688?style=flat&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-JSONB-4169E1?style=flat&logo=postgresql&logoColor=white)](https://www.postgresql.org)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=flat&logo=clerk&logoColor=white)](https://clerk.com)
[![Gemini](https://img.shields.io/badge/Gemini_1.5_Flash-Google-4285F4?style=flat&logo=google&logoColor=white)](https://ai.google.dev)
[![Docker](https://img.shields.io/badge/Docker-Container-2496ED?style=flat&logo=docker&logoColor=white)](https://docker.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat)](LICENSE)

**Transform your resume with an industry-aware live editor, instant ATS scoring, semantic keyword intelligence, and premium exports.**

[Features](#-features) • [Demo & Screenshots](#-demo--screenshots) • [Architecture](#-architecture) • [Development Journey](#-development-journey-timeline) • [Setup Guide](#%EF%B8%8F-setup-guide) • [API](#-api-reference) • [Team](#-team)

</div>

---

## 📌 What is ResumeIQ AI?

ResumeIQ AI is a production-ready, full-stack web application designed to move beyond traditional flat forms into an industry-aware document editor and parsing platform. It provides users with two core paths: a smart, real-time resume builder with contextual AI workflows, and a standalone PDF analyzer that extracts, semantic-matches, and scores existing resumes against modern ATS standards.

Built using a highly decoupled, stateful async backend and a sleek glass-morphism dark-mode UI, the application features an isolated cross-platform hybrid rendering ecosystem ensuring what you see in the browser matches your generated PDF export pixel-for-pixel.

---

## ✨ Features

### 🛠️ Intelligent Resume Builder
* **✨ Swappable Theme Registry** — Seamlessly shift between multiple ATS-safe, clean layouts (`engineer`, `modern`, `creative`, `photo_professional`) on the fly.
* **🔄 Dynamic Section Registry** — Form fields, section headers, and preview schemas adapt instantly based on the chosen profession archetype (e.g., renames "Projects" to "Portfolio" for Designers or "Experience" to "Clinical Experience" for Medical tracks).
* **⏱️ Debounced Autosave System** — State updates persist in-flight to a PostgreSQL `JSONB` schema, minimizing backend API spam while protecting drafting flow.
* **📸 Passport Photo Compression** — Clean native uploader converting square images into efficient Base64 data strings seamlessly embedded into the document's profile state.

### 🧠 AI Analytics & Optimization
* **🔍 PDF Parsing Pipeline** — Local high-speed textual extractions using `pdfminer.six` directly inside the Python environment—zero dependency on external parsers.
* **🎯 Semantic Keyword Matching** — Leverages LLM context to look beyond strict string matching, recognizing conceptual structural equivalence (e.g., maps `FastAPI` context directly to `REST Backend Development`).
* **📊 Circular Visual Scorecard** — Animated dashboard featuring visual score indicators, contextual red-tag missing keyword chips, and side-by-side phrasing comparison differentials.
* **💾 Historical Analytics Archive** — A dedicated chronological tracking page for looking back at past uploads, scores, and targeted feedback trends with safe execution modals.

---

## 🎬 Demo & Screenshots

### 🌐 Premium Landing Page
<div align="center">
  <img src="frontend/src/assets/hero.png" alt="ResumeIQ Landing Page Workspace" width="90%"/>
</div>

### 📸 Page-wise Workspaces & App Views
Below are the core page designs that make up the ResumeIQ AI ecosystem:

| Page / Workspace | UI Mockup / Placeholder | Key Functional Elements |
| --- | --- | --- |
| **User Sign-In** | `![Interactive Login Screen](frontend/src/assets/login_screenshot.png)` | Responsive split-screen, dynamic orbiting node SVG visualization, dark-mode Clerk container. |
| **Dashboard** | `![Dashboard Workspace](frontend/src/assets/dashboard_screenshot.png)` | Glassmorphism cards showing draft collections, creation buttons, and metadata logs. |
| **Live Editor** | `![Resume Editor](frontend/src/assets/editor_screenshot.png)` | Double column layout: responsive forms on the left, iframe rendering (React preview / srcDoc compilation) on the right. |
| **ATS Scanner** | `![ATS Scanner & Scoring](frontend/src/assets/analyzer_screenshot.png)` | Drag-and-drop file uploader zone, circular animated SVG scorecard, missing keywords red tag chips, rewrite diff table. |
| **History Logs** | `![History Log](frontend/src/assets/history_screenshot.png)` | Chronological dashboard tracking past uploads, scores, and delete verification prompts. |

---

## 🏗 Architecture & Cloud Infrastructure

### System Topology

```mermaid
graph TD
    subgraph Client ["Frontend (Cloudflare Pages)"]
        UI["React 18 + Vite + TailwindCSS"]
        AuthUI["Clerk Auth Component"]
        Editor["Live Preview & Split-Form Editor"]
        HealthCheck["BackendStatusBanner (Cold-start detector)"]
    end

    subgraph Auth ["Authentication"]
        Clerk["Clerk Identity Provider (RS256 JWT)"]
    end

    subgraph Backend ["Backend API (Render Docker Web Service)"]
        FastAPI["FastAPI Async Engine (ASGI / Python 3.12)"]
        CORS["CORS Middleware (Cloudflare Pages Allowlist)"]
        AuthMiddleware["JWT Asymmetric Token Verification"]
        WeasyPrint["WeasyPrint + Cairo PDF Rendering Pipeline"]
        PDFParser["pdfminer.six Local PDF Extractor"]
    end

    subgraph AI ["AI Intelligence Layer"]
        Gemini["Google Gemini 1.5 Flash API"]
    end

    subgraph Database ["Serverless Persistence (Neon.tech)"]
        Neon["PostgreSQL 16 (JSONB Schemas + asyncpg Pool)"]
        Alembic["Alembic Migration Engine"]
    end

    UI --> AuthUI
    AuthUI -->|Login / Session| Clerk
    UI -->|JWT Bearer Token| CORS
    CORS --> FastAPI
    FastAPI --> AuthMiddleware
    AuthMiddleware -->|Validate RS256| Clerk
    FastAPI -->|Async Session / SQLAlchemy| Neon
    Alembic -->|Schema Sync on Startup| Neon
    FastAPI -->|Extract Raw Text| PDFParser
    FastAPI -->|Semantic Keyword & Score Prompt| Gemini
    FastAPI -->|Jinja2 Context + CSS Engine| WeasyPrint
    WeasyPrint -->|Pixel-Perfect Binary PDF| UI
```

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite, TailwindCSS, Axios, Lucide Icons |
| **Authentication** | Clerk Security Framework (Stateless Identity Layer / Asymmetric RS256 Verification) |
| **Backend** | FastAPI, Uvicorn ASGI Server, Pydantic v2 |
| **Database/ORM** | PostgreSQL, Async SQLAlchemy 2.0, Alembic Migrations, JSONB Storage |
| **PDF Engineering** | WeasyPrint, Jinja2 Template Injections, `pdfminer.six` |
| **AI Intelligence** | Google Gemini 1.5 Flash / Ollama Client Wrapper (Factory Provider Pattern) |
| **Containerization** | Docker, Docker Compose (Multi-arch automated standard) |

---

## 📂 Development Journey (Timeline)

The development of **ResumeIQ AI** is documented stage-by-stage. These documentation logs are located in the repository's assets directory and are highly useful for learning or tracing structural updates:

1. **[Phase 1: Database Setup & Clerk Integration](./frontend/src/assets/AI%20Resume%20Builder%20V2%20-%20Documentations/AI%20Resume%20Builder%20v2%20—%20Phase%201%20&%20Clerk%20Authentication%20Integration%20Documentation.docx)**
   * Establishes the initial database tables and Clerk identity mappings.
2. **[Phase 2: Core Editor & Real-time State Layout](./frontend/src/assets/AI%20Resume%20Builder%20V2%20-%20Documentations/AI%20Resume%20Builder%20v2%20—%20Phase%202%20Documentation%20&%20Learning%20Notes.docx)**
   * Configures the React workspace, state structures, and debounced database autosave checks.
3. **[Phase 3: Jinja2 & WeasyPrint PDF Engines](./frontend/src/assets/AI%20Resume%20Builder%20V2%20-%20Documentations/AI%20Resume%20Builder%20v2%20—%20Phase%203%20Documentation.docx)**
   * Integrates backend compilation templates and stylesheet injection configurations.
4. **[Phase 4: Unified PDF Parsing, ATS Analyzer & Role-Registry Systems](./frontend/src/assets/AI%20Resume%20Builder%20V2%20-%20Documentations/AI%20Resume%20Builder%20v2%20—%20Phase%204%20Documentation.md)**
   * Builds the local PDF parsing engine, Gemini scoring rubric, and profession-aware UI input strategies.
5. **[Phase 5: Premium UI, Custom Photo Compression & Swappable LLMs](./frontend/src/assets/AI%20Resume%20Builder%20V2%20-%20Documentations/AI%20Resume%20Builder%20v2%20—%20Phase%205%20Documentation.md)**
   * Implements glassmorphism, onboarding guides, Base64 profile photo processing, and the Gemini/Ollama provider factory.
6. **[Phase 6: Multi-Cloud Production Release & Complete Debugging Log](./frontend/src/assets/AI%20Resume%20Builder%20V2%20-%20Documentations/AI%20Resume%20Builder%20v2%20—%20Phase%206%20Documentation.md)**
   * Logs 20 verified issues and fixes regarding Docker startup migrations, asymmetric JWT audience verification, iframe sandboxing base-tags, and print-media page-break overflows.

---

## ⚙️ Setup Guide

### Prerequisites
* **Python**: Version 3.12+
* **Node.js**: Version 20+ (Vite compatible)
* **PostgreSQL**: Operational local or cloud database instance
* **External API Key**: Google Gemini API key (or local Ollama model installation)

---

### 1. Local Environment Configuration

#### A. Backend Setup
```bash
# Clone the repository
git clone https://github.com/AradwadTushar/AI-Based-Resume-Builder-and-Analyzer.git
cd AI-Based-Resume-Builder-and-Analyzer

# Navigate to backend
cd backend

# Establish Python environment
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install required packages
pip install -r requirements.txt
```

Create a **`backend/.env`** configuration file:
```env
DATABASE_URL=postgresql+asyncpg://postgres:password@localhost:5432/resumeiq_db
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxx
GEMINI_API_KEY=AIzaSyxxxxxxxxxxxxxxxx
AI_PROVIDER=gemini  # Switch to 'ollama' for free local/self-hosted processing
CLERK_AUTHORIZED_PARTIES=http://localhost:5173
```

Execute schema migrations and start the server:
```bash
# Run database schema migrations
alembic upgrade head

# Start local uvicorn server
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```
Verify the API is running by visiting: `http://localhost:8000/healthz` (`{"status":"ok"}`).

#### B. Frontend Setup
```bash
# Navigate to frontend
cd ../frontend

# Clean install packages
npm ci
```

Create a **`frontend/.env.local`** configuration file:
```env
VITE_API_BASE_URL=http://localhost:8000
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxx
```

Start the Vite development server:
```bash
npm run dev
```
Open `http://localhost:5173` to access the application.

---

### 2. Containerized Setup (Docker Compose)
To spin up the complete full-stack environment including an Ollama container running LLaMA3:

```bash
docker-compose up --build
```
This mounts the backend container on port `8080` and the Ollama sidecar on port `11434`.

---

### 3. Production Environment Keys (Cloud)

When hosting the application on cloud platforms (e.g., **Render** for the backend, **Cloudflare Pages** for the frontend), ensure the following environment configurations are set:

#### Backend (Render Dashboard Variables)
* **`DATABASE_URL`**: Render PostgreSQL External Database URI.
* **`CLERK_SECRET_KEY`**: Clerk production secret key.
* **`GEMINI_API_KEY`**: Gemini API key.
* **`AI_PROVIDER`**: `gemini`
* **`ALLOWED_ORIGINS`**: `https://your-frontend-project.pages.dev` (allows requests from Cloudflare).
* **`CLERK_AUTHORIZED_PARTIES`**: `https://your-frontend-project.pages.dev,http://localhost:5173` (validates JWT audience).

#### Frontend (Cloudflare Dashboard Variables)
* **`VITE_API_BASE_URL`**: Your Render backend URL (e.g., `https://your-backend.onrender.com` - *without trailing slash*).
* **`VITE_CLERK_PUBLISHABLE_KEY`**: Clerk publishable key.

---

## 📡 API Reference

All protected application routes enforce asymmetric token decoding (`Depends(get_current_user)`). Transactions crosscheck resource ownership (`Resume.user_id == current_user.id`) to block IDOR vectors.

| Method | Route | Auth | Description |
| --- | --- | --- | --- |
| `POST` | `/api/auth/verify` | Yes | Validates Clerk token, registers user in database if new. |
| `GET` | `/api/resumes` | Yes | Retrieves list of drafts owned by the user. |
| `POST` | `/api/resumes` | Yes | Creates a new resume draft with baseline schema structures. |
| `PUT` | `/api/resumes/{id}` | Yes | Updates JSONB resume template state and title parameters. |
| `DELETE` | `/api/resumes/{id}` | Yes | Removes a draft safely from the database. |
| `POST` | `/api/resumes/{id}/generate` | Yes | Calls Gemini to rewrite experience bullet points. |
| `GET` | `/api/resumes/{id}/preview` | Yes | Returns compiled HTML preview displaying styling. |
| `GET` | `/api/resumes/{id}/export` | Yes | Generates and downloads a print-ready PDF using WeasyPrint. |
| `POST` | `/api/analyze` | Yes | Evaluates PDF textual details against pasted job descriptions. |
| `GET` | `/api/analyze/history` | Yes | Lists past analyzer scores and keyword gap logs. |

---

## 🔒 Security Architecture
* **Client Disbelief Authentication**: Client assertions are never trusted explicitly. User identity is derived exclusively from backend-validated asymmetric signatures (`RS256`).
* **Secure Sandbox Preview**: Previews are loaded securely in isolated sandbox iframe elements using `srcDoc` inputs to block DOM scripting vulnerabilities and cookie sharing.
* **Server-Hidden Keys**: Gemini API, PostgreSQL credentials, and encryption secrets exist exclusively behind backend environment walls.

---

## 👥 Team
* **Tushar Aradwad** — *System Architect / AI & Core Backend Engineer*
  * [@AradwadTushar](https://github.com/AradwadTushar) | [LinkedIn](https://www.linkedin.com/in/tushar-aradwad-536570307)

---

## 📄 License
Shared open for development under the terms of the **MIT License**. Review the [LICENSE](/LICENSE) document for exact terms.
