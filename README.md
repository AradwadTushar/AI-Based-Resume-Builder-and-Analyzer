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

[Features](#-features) • [Demo](#-demo) • [Architecture](#-architecture) • [Setup](#-setup) • [API](#-api-reference) • [Team](#-team)

</div>

---

## 📌 What is ResumeIQ AI?

ResumeIQ AI is a production-ready, full-stack web application designed to move beyond traditional flat forms into an industry-aware document editor and parsing platform. It provides users with two core paths: a smart, real-time resume builder with contextual AI workflows, and a standalone PDF analyzer that extracts, semantic-matches, and scores existing resumes against modern ATS standards.

Built using a highly decoupled, stateful async backend and a sleek glass-morphism dark-mode UI, the application features an isolated cross-platform hybrid rendering ecosystem ensuring what you see in the browser matches your generated PDF export pixel-for-pixel.

---

## ✨ Features

### 🛠️ Intelligent Resume Builder
- **✨ Swappable Theme Registry** — Seamlessly shift between multiple ATS-safe, clean layouts (`engineer`, `modern`, `creative`, `photo_professional`) on the fly.
- **🔄 Dynamic Section Registry** — Form fields, section headers, and preview schemas adapt instantly based on the chosen profession archetype (e.g., renames "Projects" to "Portfolio" for Designers or "Experience" to "Clinical Experience" for Medical tracks).
- **⏱️ Debounced Autosave System** — State updates persist in-flight to a PostgreSQL `JSONB` schema, minimizing backend API spam while protecting drafting flow.
- **📸 Passport Photo Compression** — Clean native uploader converting square images into efficient Base64 data strings seamlessly embedded into the document's profile state.

### 🧠 AI Analytics & Optimization
- **🔍 PDF Parsing Pipeline** — Local high-speed textual extractions using `pdfminer.six` directly inside the Python environment—zero dependency on external parsers.
- **🎯 Semantic Keyword Matching** — Leverages LLM context to look beyond strict string matching, recognizing conceptual structural equivalence (e.g., maps `FastAPI` context directly to `REST Backend Development`).
- **📊 Circular Visual Scorecard** — Animated dashboard featuring visual score indicators, contextual red-tag missing keyword chips, and side-by-side phrasing comparison differentials.
- **💾 Historical Analytics Archive** — A dedicated chronological tracking page for looking back at past uploads, scores, and targeted feedback trends with safe execution modals.

---

## 🎬 Demo

> 🎬 *Add your premium UI interaction GIF here — record a 30-second form-to-PDF flow.*
![alt text](<ResumeIQ Optimization.gif>)

```
Upload PDF / Fill Form → Dynamic Categorization → AI Optimization → Export Validation Preview → Final PDF Download
```

---

## 🏗 Architecture

### Hybrid Rendering & Data Lifecycle Flow

```
┌─────────────────────────────────────────────────────────────┐
│                  FRONTEND (React + Vite + Tailwind)         │
│                                                               │
│   Landing → Dashboard → Editor Workspace → History Log       │
│                                                               │
│   State Changes ──► [Debounced Hook Timeout]                  │
│                            │                                  │
│                            ▼                                  │
│            PUT /api/resumes/{id} (JSONB Schema + JWT)         │
└────────────────────────────┬──────────────────────────────────┘
                             │ Axios Interceptors (Clerk Token)
┌────────────────────────────▼──────────────────────────────────┐
│                    BACKEND (FastAPI Async)                    │
│                                                               │
│   /auth/verify   ──► Maps external token to PostgreSQL row    │
│   /resumes/crud  ──► Persists multi-user ownership state      │
│   /analyze       ──► Extracts PDF text via pdfminer.six       │
│   /export        ──► normalizes context via Template Registry │
│                        │                                      │
│                        ▼                                      │
│             [Jinja2 HTML Compiling Engine]                    │
│                        │                                      │
│                        ▼                                      │
│             [WeasyPrint Local PDF Transpiler]                 │
└────────────────────────────┬──────────────────────────────────┘
                             │
┌────────────────────────────▼──────────────────────────────────┐
│                    PRODUCTION DATA STORAGE                    │
│                                                               │
│   PostgreSQL (JSONB Documents + Secure Auth Mappings)         │
└───────────────────────────────────────────────────────────────┘
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

## ⚙️ Setup

### Prerequisites
- Python 3.12+
- Node.js 20+
- PostgreSQL database engine
- Google Gemini API Key or a local Ollama server deployment

---

### 1. Project Initialization

```bash
git clone https://github.com/AradwadTushar/ai-based-resume-builder-v2.git
cd ai-resume-v2
```

---

### 2. Backend Environment Assembly

```bash
cd backend

# Establish Python environment
python -m venv .venv
source .venv/bin/activate  # On Windows use: .venv\Scripts\activate

# Install locked dependencies
pip install -r requirements.txt
```

Create a `backend/.env` configuration file:

```env
DATABASE_URL=postgresql+asyncpg://postgres:password@localhost:5432/resumeiq_db
CLERK_SECRET_KEY=sk_test_...
GEMINI_API_KEY=AIzaSy...
AI_PROVIDER=gemini  # Switch to 'ollama' for free self-hosted production scaling
CORS_ORIGINS=http://localhost:5173
```

Execute schema migrations and boot the server:

```bash
alembic upgrade head
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

---

### 3. Frontend Compilation

```bash
cd ../frontend

# Install node dependencies
npm install

# Initialize tailwind design bindings
npx shadcn@latest init
```

Create a `frontend/.env.local` configuration file:

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
```

Execute development client workspace:

```bash
npm run dev
```

---

### 4. Containerized Execution (Optional alternative)

To stand up the complete network layer including a local open-source LLM model sidecar configuration:

```bash
docker-compose up --build
```

---

## 📡 API Reference

All protected application routes enforce rigid parameter cross-checking ensuring that executing operations match user data signatures implicitly extracted via backend-validated verification steps (`Resume.user_id == current_user.id`).

| Method | Route | Description |
| --- | --- | --- |
| `POST` | `/api/auth/verify` | Authenticates Clerk token, provisions internal system row mapping if new. |
| `GET` | `/api/resumes` | Retrieves summary collections associated with the user payload. |
| `POST` | `/api/resumes` | Generates a fresh structural database record initialized with raw skeleton states. |
| `PUT` | `/api/resumes/{id}` | Persists user modifications directly to nested JSONB documents. |
| `DELETE` | `/api/resumes/{id}` | Destroys resume tracking node safely away from collection frameworks. |
| `POST` | `/api/resumes/{id}/generate` | Invokes prompt injection sequences to format descriptions into clear ATS bullet points. |
| `GET` | `/api/resumes/{id}/export` | Compiles real-time Jinja configurations into raw streaming PDF data. |
| `POST` | `/api/analyze` | Processes multi-part document extractions against custom target descriptions. |
| `GET` | `/api/analyze/history` | Fetches historical log array collections for user workspace visibility. |

---

## 📁 Project Structure

```
ai-resume-v2/
├── backend/                        # FastAPI Enterprise Engine
│   ├── main.py                     # Lifecycle configurations, CORS routing, Middleware
│   ├── config.py                   # Strict system variables parsing using Pydantic
│   ├── database.py                 # Async transactional operations management
│   ├── models/                     # Relational definitions mapped using SQLAlchemy
│   ├── schemas/                    # Type validations & structural boundaries
│   ├── routers/                    # Clean endpoints layer isolation
│   ├── services/                   # Decoupled AI workflows, parsing, and rendering engines
│   └── templates/                  # Modular compilation frameworks (HTML / CSS components)
├── frontend/                       # Interactive User Interfaces
│   ├── src/
│   │   ├── api/                    # Centralized request modules powered by Axios
│   │   ├── components/             # Reusable UX, loaders, structures, modals
│   │   ├── features/               # Modular interfaces for Editor and Analyzer panels
│   │   ├── pages/                  # Top-level viewport rendering anchors
│   │   └── context/                # Unidirectional global state configuration
└── .github/workflows/              # Robust Continuous Integration / Continuous Deployment
    └── deploy.yml                  # Automated compilation, testing, and multi-arch Docker distribution
```

---

## 🔒 Security Architectures

- **Client Disbelief Matrix** — Identities are never trusted explicitly via simple client strings; all validation sequences map securely from cryptographically verified asymmetric signatures.
- **IDOR Fortress Constraints** — SQL queries crosscheck context parameters inside the transactional execution layer, rendering data poisoning vectors impotent.
- **Server-Shielded Variable Protocols** — Crucial operations credentials (Gemini, Database strings) are constrained safely back behind backend borders, completely hidden from client inspection.

---

## 👥 Team

**Tushar Aradwad** — *System Architect / AI & Core Backend Engineer*
[@AradwadTushar](https://github.com/AradwadTushar) | [LinkedIn Profile](https://www.linkedin.com/in/tushar-aradwad-536570307)

---

## 📄 License

This repository is shared open for development and modifications under the terms of the MIT License — review the [LICENSE](/LICENSE) document for exact terms.

---

<div align="center">

Crafted with premium UI intent by Team ResumeIQ | Final Year Project Excellence

*"Elevating professional identity through structural algorithmic intelligence."*

</div>
