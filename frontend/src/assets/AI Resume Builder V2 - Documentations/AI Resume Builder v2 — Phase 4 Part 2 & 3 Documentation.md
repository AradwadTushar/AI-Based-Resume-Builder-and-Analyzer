# AI Resume Builder v2 — Phase 4 Part 2 & 3 Documentation
## Intelligent Resume Composition & PDF Analyzer Pipeline

---

## 📌 Phase Overview
This documentation covers the development notes, architectural decisions, errors faced, and learnings gained during **Phase 4 Part 2 (Intelligent Resume Composition System)** and **Phase 4 Part 3 (PDF Resume Analyzer Pipeline)**.

These milestones transition the project from a static form editor into an **industry-aware dynamic editor** and introduce a **standalone PDF uploading & ATS scoring parser**.

---

## 🏗️ Architecture Developed

### Phase 4 Part 2: Intelligent Composition Flow
```
User selects Category (dropdown)
          ↓
Editor adjusts Form & Title Labels
          ↓
Autosave persists `roleCategory` in JSONB
          ↓
Live Preview adapts Header Titles dynamically
          ↓
PDF Download sends `roleCategory` to Backend
          ↓
Jinja2 Normalizes Titles → WeasyPrint Compiles PDF
```

### Phase 4 Part 3: PDF Analyzer Pipeline
```
User uploads Resume PDF + pastes optional JD
          ↓
Axios sends Multipart Form-Data to Backend
          ↓
`pdfminer.six` extracts plain text from PDF
          ↓
Gemini prompt engineered for Score, Keywords, & Rewrites
          ↓
Structured JSON results returned and saved in DB
          ↓
Frontend renders animated circular Score ring & diff comparison cards
```

---

## 🧠 Major Systems Built

### 1. Dynamic Section Registry (Part 2)
To make resumes category-aware, we introduced a profession registry.
* **Role Categories Configured**:
  - `software_engineering`: Standard sections, code links, and project cards.
  - `design`: Renames "Projects" to "Portfolio & Design Projects".
  - `education`: Renames "Experience" to "Teaching Experience" and hides Projects.
  - `medical`: Renames "Experience" to "Clinical Experience", hides Projects, and renames "Certifications" to "Licenses & Certifications".
  - `general`: Default generic settings.
* **Frontend Adaptations**: Updated `PersonalInfoSection.jsx`, `ExperienceSection.jsx`, `ProjectsSection.jsx`, and `CertificationsSection.jsx` to accept dynamic `title` props from the orchestrating container (`ResumeEditor.jsx`).

### 2. Role-Aware Rendering (Part 2)
* **Frontend Preview Registry**: Updated `EngineerPreview.jsx`, `ModernPreview.jsx`, and `CreativePreview.jsx` templates with React conditional states to re-label section headers on-the-fly when `formData.roleCategory` changes.
* **Backend Jinja Templates**: Injected conditional logic directly into our HTML source layouts (`backend/templates/*/template.html`):
  ```html
  <h2 class="section-title">
    {% if roleCategory == 'medical' %}Clinical Experience
    {% elif roleCategory == 'education' %}Teaching Experience
    {% else %}Professional Experience{% endif %}
  </h2>
  ```

### 3. PDF Parsing Service (Part 3)
* **Technology**: Integrated `pdfminer.six` directly in the Python environment, avoiding slow third-party parser endpoints.
* **Implementation** (`backend/services/pdf_parser.py`):
  ```python
  import io
  from pdfminer.high_level import extract_text

  def parse_pdf(pdf_bytes: bytes) -> str:
      fp = io.BytesIO(pdf_bytes)
      return extract_text(fp).strip()
  ```

### 4. AI-Driven Raw Resume Scoring (Part 3)
* **AI Service method** (`backend/services/ai_service.py`): Created `analyze_raw_resume(resume_text, job_description)`.
* **Prompt constraints**: Instructs Gemini 1.5 Flash to score the candidate (0-100), extract missing keywords from the JD/domain, identify layout gaps, and suggest specific phrasing rewrites as a structured JSON object.

### 5. Multi-column Analyzer Screen (Part 3)
* **Upload Zone**: Built a lightweight custom React drag-and-drop file uploader (`onDragOver`, `onDrop`) to handle PDF files without pulling in heavy third-party libraries like `react-dropzone`.
* **Visual Scorecard**: Uses an animated SVG progress circle ring, color-coded tags for missing keywords (red chips), and side-by-side phrasing comparison cards (structured original vs. optimized cards).

---

## ⚙️ Key Architectural Decisions & Learnings

### 1. Form-Data Demands `python-multipart`
FastAPI parses standard JSON endpoints naturally. However, file uploads are transmitted via `multipart/form-data`. FastAPI requires `python-multipart` as an underlying dependency to handle form/file extraction. If it's missing, the API router crashes during startup.

### 2. Context Normalization Synchronization
To ensure local browser downloads and WeasyPrint PDF exports render identical text titles, the database serialization step must be decoupled. The backend `template_context.py` acts as the single source of truth for normalizing fields and mapping the selected `roleCategory` before HTML compilation.

---

## 🔥 Major Errors Faced & Lessons Learned

### 1. Pydantic Environment Lookup Failures
* **Error**: `ValidationError: 3 validation errors for Settings: DATABASE_URL, etc.` during database diagnostics.
* **Cause**: Running terminal commands from the workspace root directory instead of the `backend/` directory prevented Pydantic from loading the local `.env` variables.
* **Lesson**: Always run environment-dependent Python scripts inside their parent subdirectory to ensure paths to `.env` files resolve correctly.

### 2. Multipart Form Router Boot Crash
* **Error**: `RuntimeError: Form data requires "python-multipart" to be installed.`
* **Cause**: FastAPI requires python-multipart to handle `UploadFile` parameters.
* **Solution**: Installed `python-multipart` in the `.venv` and updated the dependencies requirements.

### 3. Container Reloader Interrupts
* **Error**: Development container reloads occasionally terminated active terminal tasks running `npm` and `uvicorn`.
* **Lesson**: Background server tasks are temporary in containerized dev-boxes. Ensure servers are restarted and checked using task managers if connection drops occur.

---

## 🚀 Future Focuses & Upgrades

### 1. Cloudinary Passport Photo Uploads
- Integrate Cloudinary to support passport photo uploads inside `PersonalInfoSection.jsx` and render them in the headers of all resume templates.

### 2. Add Standalone Analyzer Logs History
- Create an analysis history page so users can look back at past uploaded resumes, scores, and missing keywords lists over time.

### 3. PDF Parsing Fallbacks
- Add OCR fallbacks (like `pytesseract`) if the uploaded PDF contains images instead of selectable text.
