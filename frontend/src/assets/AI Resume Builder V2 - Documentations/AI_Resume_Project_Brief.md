# AI Resume Analyzer & Builder — Project Brief v2

> Use this document as the master context when chatting with GPT or any other AI coding assistant.
> Paste the relevant section at the start of each conversation so the AI has full context.

---

## What You're Building

A full-stack web app with two core features:

- **Resume Builder** — User fills a smart form (name, education, experience, skills, projects, links, photo). AI generates polished bullet points and a summary. User picks a job-type template (Engineer, Teacher, Designer, etc.) and downloads a professional PDF.
- **Resume Analyzer** — User uploads an existing resume PDF and optionally pastes a job description. AI extracts content, scores it, identifies gaps, and gives specific actionable feedback.

Both features live in one unified app.

---

## Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| Frontend | React 18 + Vite | Same as your v1 builder |
| Styling | TailwindCSS + shadcn/ui | Clean, consistent components |
| Auth | Clerk | JWT-based, same as v1 |
| Backend | FastAPI (Python) | Async, clean, well-typed |
| Validation | Pydantic v2 | Request/response schemas |
| ORM | SQLAlchemy 2.0 (async) | With asyncpg driver |
| Database | PostgreSQL | Replaces MySQL from v1 |
| AI | Google Gemini 1.5 Flash API | Free tier available; swap to OpenAI/Claude later |
| PDF generation | WeasyPrint + Jinja2 | HTML templates → PDF |
| PDF parsing | pdfminer.six | Extract text from uploaded resumes |
| File storage | Cloudinary | Passport photos + uploaded PDFs |
| HTTP client | Axios (frontend) | Same as v1 |

---

## Project Folder Structure

```
ai-resume-v2/
│
├── backend/                        # FastAPI app
│   ├── main.py                     # App entry point, CORS, router registration
│   ├── config.py                   # Settings from .env (Pydantic BaseSettings)
│   ├── database.py                 # SQLAlchemy async engine + session
│   │
│   ├── models/                     # SQLAlchemy ORM models
│   │   ├── user.py
│   │   ├── resume.py
│   │   └── analysis.py
│   │
│   ├── schemas/                    # Pydantic request/response schemas
│   │   ├── resume.py
│   │   └── analysis.py
│   │
│   ├── routers/                    # FastAPI route handlers
│   │   ├── auth.py                 # Clerk JWT verification
│   │   ├── resume.py               # CRUD for resumes
│   │   ├── analyze.py              # PDF upload + AI analysis
│   │   └── export.py               # PDF generation + download
│   │
│   ├── services/                   # Business logic (no HTTP here)
│   │   ├── ai_service.py           # Gemini API calls
│   │   ├── pdf_parser.py           # pdfminer.six extraction
│   │   ├── pdf_generator.py        # Jinja2 + WeasyPrint
│   │   └── cloudinary_service.py  # File upload/delete
│   │
│   ├── templates/                  # Resume HTML templates
│   │   ├── engineer/
│   │   │   ├── template.html
│   │   │   └── style.css
│   │   ├── teacher/
│   │   │   ├── template.html
│   │   │   └── style.css
│   │   ├── designer/
│   │   │   ├── template.html
│   │   │   └── style.css
│   │   └── finance/
│   │       ├── template.html
│   │       └── style.css
│   │
│   ├── requirements.txt
│   └── .env                        # Never commit this
│
├── frontend/                       # React + Vite app
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   │
│   ├── src/
│   │   ├── main.jsx                # ClerkProvider, RouterProvider
│   │   ├── App.jsx                 # Routes definition
│   │   │
│   │   ├── api/                    # Axios instances + API call functions
│   │   │   ├── axiosClient.js      # Base Axios instance with auth header
│   │   │   ├── resumeApi.js
│   │   │   └── analyzeApi.js
│   │   │
│   │   ├── components/
│   │   │   ├── ui/                 # shadcn/ui components (button, input, etc.)
│   │   │   ├── layout/
│   │   │   │   ├── Header.jsx
│   │   │   │   └── Sidebar.jsx
│   │   │   └── resume/
│   │   │       ├── ResumePreview.jsx   # Live preview panel
│   │   │       └── TemplateCard.jsx    # Template selection card
│   │   │
│   │   ├── pages/
│   │   │   ├── Landing.jsx         # Home / marketing page
│   │   │   ├── Dashboard.jsx       # List of user's resumes
│   │   │   ├── Builder.jsx         # Resume builder (form + preview)
│   │   │   └── Analyzer.jsx        # Upload + results page
│   │   │
│   │   ├── features/
│   │   │   ├── builder/
│   │   │   │   ├── BuilderForm.jsx      # Multi-step form shell
│   │   │   │   ├── steps/
│   │   │   │   │   ├── PersonalInfo.jsx  # Name, photo, links
│   │   │   │   │   ├── Education.jsx
│   │   │   │   │   ├── Experience.jsx
│   │   │   │   │   ├── Skills.jsx
│   │   │   │   │   ├── Projects.jsx
│   │   │   │   │   └── Summary.jsx       # AI-generated summary
│   │   │   │   └── TemplatePicker.jsx
│   │   │   │
│   │   │   └── analyzer/
│   │   │       ├── UploadZone.jsx        # Drag-and-drop PDF upload
│   │   │       ├── JobDescInput.jsx      # Paste job description
│   │   │       └── AnalysisReport.jsx    # Score + feedback display
│   │   │
│   │   ├── context/
│   │   │   └── ResumeContext.jsx    # Global resume state (replaces old Context)
│   │   │
│   │   └── hooks/
│   │       ├── useResume.js
│   │       └── useAnalysis.js
│   │
│   ├── package.json
│   └── .env.local                  # Never commit this
│
└── README.md
```

---

## Database Schema

### users
| column | type | notes |
|---|---|---|
| id | UUID PK | |
| clerk_id | VARCHAR UNIQUE | from Clerk JWT |
| email | VARCHAR | |
| created_at | TIMESTAMP | |

### resumes
| column | type | notes |
|---|---|---|
| id | UUID PK | |
| user_id | UUID FK → users | |
| title | VARCHAR | e.g. "Software Engineer Resume" |
| template | VARCHAR | e.g. "engineer", "teacher" |
| data | JSONB | all resume fields as JSON |
| photo_url | VARCHAR | Cloudinary URL |
| created_at | TIMESTAMP | |
| updated_at | TIMESTAMP | |

### analyses
| column | type | notes |
|---|---|---|
| id | UUID PK | |
| user_id | UUID FK → users | |
| resume_text | TEXT | extracted from uploaded PDF |
| job_description | TEXT | optional, pasted by user |
| score | INTEGER | 0-100 |
| feedback | JSONB | structured feedback from AI |
| created_at | TIMESTAMP | |

---

## API Routes

```
POST   /api/auth/verify              # Verify Clerk JWT, create user if new

GET    /api/resumes                  # List user's resumes
POST   /api/resumes                  # Create new resume
GET    /api/resumes/{id}             # Get single resume
PUT    /api/resumes/{id}             # Update resume data
DELETE /api/resumes/{id}             # Delete resume

POST   /api/resumes/{id}/generate    # AI generates bullets + summary from raw input
GET    /api/resumes/{id}/export      # Returns PDF binary (WeasyPrint)
GET    /api/templates                # List available templates

POST   /api/analyze                  # Upload PDF + optional job desc → returns analysis
GET    /api/analyze/{id}             # Get saved analysis result
```

---

## Environment Variables

### backend/.env
```
DATABASE_URL=postgresql+asyncpg://user:pass@localhost/ai_resume
GEMINI_API_KEY=your_gemini_key_here
CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
CLERK_SECRET_KEY=your_clerk_secret
CORS_ORIGINS=http://localhost:5173
```

### frontend/.env.local
```
VITE_API_BASE_URL=http://localhost:8000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_CLOUDINARY_CLOUD_NAME=your_cloud
```

---

## How the PDF Generation Works

This is the most important architectural decision. No external PDF service needed.

1. Resume data (JSON) is stored in PostgreSQL
2. User picks a template (e.g. "engineer")
3. Backend loads `templates/engineer/template.html`
4. Jinja2 fills the template variables with the user's data
5. WeasyPrint converts the rendered HTML+CSS to a PDF binary
6. FastAPI returns it as a streaming response with `Content-Type: application/pdf`
7. Frontend triggers a browser download

Each template is just a well-designed HTML file with CSS — you can design them to look exactly like professional resume templates. Jinja2 variables look like `{{ name }}`, `{% for job in experience %}`, etc.

---

## How the AI Service Works

### Builder (content generation)
The AI service in `services/ai_service.py` takes raw user input like:
```json
{
  "job_title": "Software Engineer",
  "company": "Acme Corp",
  "duration": "2022-2024",
  "description": "I built the login system and fixed lots of bugs"
}
```
And returns polished bullet points:
```json
{
  "bullets": [
    "Architected and implemented OAuth 2.0 authentication system serving 50,000+ users",
    "Reduced bug backlog by 40% through systematic debugging and test coverage improvements"
  ]
}
```

Prompt it to always return JSON, parse the response, and return structured data to the router.

### Analyzer (resume scoring)
1. `pdf_parser.py` uses pdfminer.six to extract raw text from the uploaded PDF
2. That text + optional job description go to `ai_service.py`
3. AI returns structured JSON:
```json
{
  "score": 72,
  "missing_keywords": ["TypeScript", "CI/CD", "Docker"],
  "weak_sections": ["summary is generic", "no measurable achievements in experience"],
  "rewrites": [
    {
      "original": "Responsible for building features",
      "improved": "Delivered 12 new product features across 3 quarters, reducing churn by 15%"
    }
  ],
  "overall_feedback": "Strong skills section but experience bullet points lack metrics."
}
```

---

## Build Order (Phase by Phase)

### Phase 1 — Backend foundation
1. Set up FastAPI project, install dependencies
2. Configure PostgreSQL + SQLAlchemy async
3. Create models (users, resumes, analyses)
4. Set up Clerk JWT middleware
5. Build resume CRUD routes

### Phase 2 — Builder AI + PDF
1. Build `ai_service.py` with Gemini API
2. Build `pdf_generator.py` with Jinja2 + WeasyPrint
3. Design the first HTML template (engineer)
4. Wire up `/generate` and `/export` routes

### Phase 3 — Frontend Builder
1. Scaffold React + Vite + Tailwind + Clerk
2. Build multi-step form (PersonalInfo → Education → Experience → Skills → Projects → Summary)
3. Build live preview panel (ResumePreview.jsx)
4. Build template picker
5. Wire up API calls

### Phase 4 — Analyzer
1. Build `pdf_parser.py`
2. Build analyze route with AI scoring
3. Build Analyzer page in React (upload + results)

### Phase 5 — Polish
1. Add more templates (teacher, designer, finance)
2. Cloudinary for photo uploads
3. Dashboard with resume cards
4. Error handling, loading states

---

## Key Decisions vs v1

| v1 | v2 | Why |
|---|---|---|
| Streamlit (Analyzer) | FastAPI | Unified backend, more control |
| Strapi CMS | FastAPI + PostgreSQL | Less overhead, you own the schema |
| pyresparser | pdfminer.six + LLM | pyresparser is unmaintained |
| Gemini direct in frontend | Gemini via backend only | API key stays server-side |
| MySQL | PostgreSQL | Better JSON support (JSONB), more standard |
| pafy (YouTube) | Removed | pafy is broken, not needed |
| Random course links | Specific AI feedback + rewrites | Actually useful in 2025 |

---

## Stitch UI Generation Prompt

Use this prompt in Stitch (or v0, Lovable, etc.) to generate the UI:

---

**STITCH PROMPT:**

```
Build a modern, professional AI Resume Builder and Analyzer web app UI.

Overall design language:
- Clean, minimal, professional — similar to Notion or Linear
- Light mode default, dark mode toggle
- Font: Inter or similar sans-serif
- Primary color: deep indigo (#4F46E5), accent: emerald green (#10B981)
- Card-based layout, subtle shadows, 8px border radius throughout

Pages to generate:

1. LANDING PAGE
- Hero section: headline "Build your perfect resume in minutes", subheadline about AI-powered content generation, two CTA buttons: "Build My Resume" and "Analyze My Resume"
- Features section: 3 cards — AI Content Generation, Professional Templates, ATS Analyzer
- How it works: 3 steps with icons (Fill form → AI generates → Download PDF)
- Clean footer

2. DASHBOARD
- Header with user avatar (Clerk) and "New Resume" button
- Grid of resume cards, each card showing: resume title, job type badge (Engineer / Teacher / etc.), last updated date, thumbnail preview area, and action buttons (Edit, Download PDF, Delete)
- Empty state with a plus icon when no resumes exist

3. RESUME BUILDER PAGE (most important)
- Split layout: left side is a multi-step form (60% width), right side is a live resume preview (40% width)
- Left form has a step progress indicator at the top showing: Personal Info → Education → Experience → Skills → Projects → Summary
- Personal Info step: fields for full name, job title, email, phone, location, LinkedIn URL, GitHub URL, portfolio URL, and a passport photo upload (circular preview)
- Experience step: card per job with title, company, dates, and a text area for description + "Generate with AI" button next to it
- Summary step: text area + "Generate AI Summary" button that shows 3 AI-generated options to choose from
- Right preview panel: shows a clean resume layout that updates live as user types. Include a template picker at the top of the preview (horizontal scroll of 4 template thumbnails: Engineer, Teacher, Designer, Finance)
- Bottom bar: Back / Next buttons, and a "Download PDF" button (visible from step 3 onwards)

4. ANALYZER PAGE
- Two-column layout
- Left: drag-and-drop PDF upload zone with dashed border, file name shown after upload, plus a textarea below for "Paste job description (optional)"
- A prominent "Analyze Resume" button
- Right: Analysis results panel (hidden until analysis runs)
  - Large score circle (0-100) in indigo color, labeled "ATS Score"
  - Three sections below: "Missing Keywords" (tag chips in red), "Weak Sections" (list with warning icons), "Suggested Rewrites" (before/after cards with the original text struck through and the improved version in green)

Component requirements:
- All form inputs use consistent styling with label above and subtle border
- Buttons: primary (filled indigo), secondary (outlined), destructive (red)
- Toast notifications for save/error states
- Loading spinners on all async actions
- Responsive: works on tablet width minimum (1024px+), not mobile-first

Tech context: React + Vite + TailwindCSS + shadcn/ui components. Output as JSX components.
```

---

## GPT Coding Prompts (Copy-Paste Ready)

### Starting a new conversation with GPT:

```
I'm rebuilding an AI Resume Builder and Analyzer app. Here's the full context:

Tech stack: FastAPI backend (Python), React + Vite frontend, PostgreSQL with SQLAlchemy async, Pydantic v2, WeasyPrint for PDF generation, Jinja2 for templates, Gemini API for AI, Clerk for auth, Cloudinary for file storage, TailwindCSS + shadcn/ui.

Project structure: [paste the folder structure from the brief]

Today I want to work on: [specific task]
```

### For each phase, add the relevant section from this brief as context.

---

## Dependencies

### backend/requirements.txt
```
fastapi
uvicorn[standard]
sqlalchemy[asyncio]
asyncpg
pydantic[email]
pydantic-settings
python-jose[cryptography]
python-multipart
httpx
pdfminer.six
weasyprint
jinja2
google-generativeai
cloudinary
alembic
python-dotenv
```

### frontend/package.json (key deps)
```json
{
  "dependencies": {
    "@clerk/clerk-react": "^5.x",
    "axios": "^1.x",
    "react": "^18.x",
    "react-router-dom": "^7.x",
    "react-dropzone": "^14.x",
    "sonner": "^1.x",
    "lucide-react": "latest",
    "uuid": "^11.x"
  }
}
```

Run: `npx shadcn@latest init` after creating the Vite project to set up shadcn/ui.
