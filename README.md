# AI Resume Builder & Analyzer v2

An intelligent AI-powered resume platform built using **React, FastAPI, PostgreSQL, Jinja2, and WeasyPrint**.

The project focuses on building a scalable resume ecosystem with:

* Dynamic resume templates
* Realtime editing & autosave
* AI-powered resume analysis
* ATS-friendly PDF generation
* Job description matching
* Profession-aware resume systems

---

# 🚀 Current Status

### ✅ Completed

* Authentication System (Clerk)
* Resume CRUD APIs
* React Resume Editor
* Autosave Architecture
* Dynamic Template Switching
* Backend Rendering Pipeline
* Export Preview Modal
* Styled PDF Export (Jinja2 + WeasyPrint)
* React Live Preview System
* Dynamic Template Registry

### 🚧 In Progress

* Intelligent Resume Composition System
* Dynamic Profession-Based Sections
* Resume Analyzer Pipeline
* ATS Scoring Engine
* JD Matching System

---

# 🛠 Tech Stack

## Frontend

* React
* TailwindCSS
* Vite
* Clerk Authentication

## Backend

* FastAPI
* PostgreSQL
* SQLAlchemy Async
* Jinja2
* WeasyPrint

## AI / Future Systems

* Gemini API
* Resume Analysis
* ATS Optimization
* JD Matching

---

# 🧠 Core Features

## Dynamic Resume Templates

Supports multiple resume designs:

* Engineer
* Modern
* Creative

with scalable template architecture.

---

## Realtime Resume Editing

* Instant preview updates
* Autosave functionality
* Dynamic section rendering

---

## Export Preview System

Before downloading:

```text id="rd1"
Editor
↓
Backend-rendered Preview
↓
Styled PDF Export
```

This ensures export accuracy and rendering consistency.

---

# 📄 PDF Rendering Pipeline

The project uses:

* Jinja2 HTML templates
* CSS-based styling
* WeasyPrint PDF generation

for ATS-friendly exports.

---

# 🏗 Project Architecture

```text id="rd2"
Frontend (React)
↓
Autosave + API
↓
FastAPI Backend
↓
PostgreSQL
↓
Jinja2 Rendering
↓
WeasyPrint
↓
Styled PDF Export
```

---

# 📌 Planned Features

## Intelligent Resume Composition

* Profession-aware resumes
* Dynamic editor sections
* Role-based rendering
* Shared visual templates

## Resume Analyzer

* ATS scoring
* Resume parsing
* JD matching
* AI optimization suggestions

---

# ⚡ Setup

## Frontend

```bash id="rd3"
cd frontend
npm install
npm run dev
```

## Backend

```bash id="rd4"
cd backend

# create virtual env
python -m venv .venv

# activate
.venv\Scripts\activate

# install dependencies
pip install -r requirements.txt

# run server
uvicorn main:app --reload
```

---

# 📂 Project Structure

```text id="rd5"
frontend/
backend/

backend/templates/
├── engineer/
├── modern/
├── creative/
```

---

# 🎯 Vision

The goal is to build a complete intelligent resume ecosystem that combines:

* scalable rendering systems
* AI-powered analysis
* profession-aware resume generation
* ATS optimization
* modern UX

---

# 👨‍💻 Author

Tushar Aradwad
