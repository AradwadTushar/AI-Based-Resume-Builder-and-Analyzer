# AI Resume Builder v2 — Phase 4 Documentation
## Rendering Platform, Dynamic Templates & Analyzer Pipeline (Parts 1, 2 & 3)

---

## 📌 Phase Overview

Phase 4 represents a major technological leap for **ResumeIQ AI**, transforming it from a static form-based CRUD editor into a comprehensive, industry-aware **shared rendering platform** and introducing a **standalone PDF uploading & semantic ATS scoring analyzer**. 

This phase is structured into three main parts:
* **Part 1 (Rendering & Core Architecture)**: Designing a dynamic, scalable preview/export registry ensuring identical HTML outputs between React live-preview and WeasyPrint PDF compilation.
* **Part 2 (Intelligent Composition)**: Making resumes profession-aware. Inputs, labels, layout structures, and PDF headers dynamically adapt based on selected role categories (e.g., Software Engineering, Design, Medical, Education).
* **Part 3 (PDF Resume Analyzer Pipeline)**: Creating a local PDF parsing engine (`pdfminer.six`) paired with structured AI prompts to provide instant ATS scoring, keyword gap checks, and diff-based bullet point rewrite suggestions.

---

## 🏗️ Architecture Developed

### 1. Hybrid Rendering & Data Lifecycle Flow
If frontend preview and backend export are built independently, vertical alignment, typography, and spacing drifts occur. This hybrid architecture solves the **React Preview Drift Problem** by utilizing a decoupled state model:

```
Resume Editor (React Form State)
       │
       ▼ (Debounced Autosave Timeout)
PostgreSQL (JSONB Storage / CRUD)
       │
       ├─────────────────────────────────────────┐
       ▼ (Dynamic Registry Selection)             ▼ (API Request)
Jinja2 HTML Compiler                      React Live Preview
       │                                  (Centralized Editor Grid)
       ▼
WeasyPrint PDF Transpiler
       │
       ▼
Styled PDF Export
```

### 2. Intelligent Composition Flow
Allows professional schemas, inputs, and section layouts to adapt instantly to different careers:

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

### 3. PDF Analyzer Pipeline
A standalone pipeline that parses raw documents and evaluates structural readiness against specific Job Descriptions (JD):

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

### 1. Dynamic Section & Preview Registries (Parts 1 & 2)
* **Frontend Template Registry**: Consolidates templates under a scalable layout mapper:
  ```javascript
  const TEMPLATE_COMPONENTS = {
    engineer: EngineerPreview,
    modern: ModernPreview,
    creative: CreativePreview,
    photo_professional: PhotoProfessionalPreview
  };
  ```
* **Role Categories Configured**:
  - `software_engineering`: Standard sections, code links, and project cards.
  - `design`: Renames "Projects" to "Portfolio & Design Projects".
  - `education`: Renames "Experience" to "Teaching Experience" and hides Projects.
  - `medical`: Renames "Experience" to "Clinical Experience", hides Projects, and renames "Certifications" to "Licenses & Certifications".
  - `general`: Default generic settings.
* **Jinja HTML Compilation**: Conditionals inject context-aware labels directly into templates:
  ```html
  <h2 class="section-title">
    {% if roleCategory == 'medical' %}Clinical Experience
    {% elif roleCategory == 'education' %}Teaching Experience
    {% else %}Professional Experience{% endif %}
  </h2>
  ```

### 2. Export Preview Validation System (Part 1)
Implemented a validation step via an **Export Preview Modal** utilizing an iframe pointing to a backend HTML rendering route. Instead of directly triggering file downloads, it checks compiling health first:
```
Download Request ──► Backend HTML Preview ──► Rendering Validation ──► WeasyPrint PDF Compilation
```
This isolates and fixes spacing anomalies, font collisions, and compilation errors before generating binary PDF streams.

### 3. PDF Parsing Service (Part 3)
Avoids slow, rate-limited third-party parser endpoints by using a local `pdfminer.six` utility inside the FastAPI Python environment:
```python
# backend/services/pdf_parser.py
import io
from pdfminer.high_level import extract_text

def parse_pdf(pdf_bytes: bytes) -> str:
    fp = io.BytesIO(pdf_bytes)
    return extract_text(fp).strip()
```

### 4. AI-Driven Raw Resume Scoring (Part 3)
Exposes an `analyze_raw_resume(resume_text, job_description)` method using the Google Gemini model. It scores resumes against a strict 0-100 rubric, identifies missing industry keywords, finds structure gaps, and drafts before-and-after rewrite suggestions.

### 5. Multi-column Analyzer Screen (Part 3)
* **Upload Zone**: A lightweight custom React drag-and-drop file uploader using native browser listeners (`onDragOver`, `onDrop`) to eliminate heavy dependencies.
* **Visual Scorecard**: Employs an animated SVG progress circle, color-coded tag chips (red for gaps), and side-by-side phrasing comparison tables.

---

## ⚙️ Key Architectural Decisions & Learnings

1. **Form-Data Demands `python-multipart`**: Standard FastAPI endpoints expect JSON requests. Because PDF files are sent via `multipart/form-data`, `python-multipart` is required. If omitted, routers crash at boot time.
2. **Context Normalization Synchronization**: To guarantee browser previews and PDF exports have matching titles, the serialization step is decoupled. The backend `template_context.py` maps database fields and standardizes the selected `roleCategory` structure before feeding data into the WeasyPrint engine.
3. **Decoupled Shared Rendering Service**: Created a reusable `render_resume_template()` service which isolates HTML rendering from PDF translation, allowing previews, downloads, and future email engines to use the same code.

---

## 🔥 Major Problems Faced & Solutions

### 1. Massive Accidental File Deletion (Part 1)
* **Problem**: While clean-deleting an experimental template, the entire frontend `src/` folder was accidentally permanently deleted from VS Code.
* **Solution**: Recovered everything immediately using the Git index: `git restore frontend/src`.
* **Lesson**: Commit work frequently and treat Git as your primary safety net.

### 2. Frontend & Backend Architecture Collision (Part 1)
* **Problem**: Two rendering models (old static preview vs. new dynamic registry) existed simultaneously, causing double rendering and template drift.
* **Solution**: Rewrote the entire frontend to fetch templates dynamically from a single centralized registry mapping.

### 3. React Hook Order Error (Part 1)
* **Problem**: Re-rendering threw `Rendered more hooks than during previous render`.
* **Cause**: A conditional statement (`if (!isOpen) return null;`) was placed before a `useState()` hook.
* **Solution**: Re-positioned all hooks to the top of the component file, ensuring they execute in the same order on every render.

### 4. Template Persistence Bug (Part 1)
* **Problem**: Frontend templates switched correctly in the preview, but exports always printed the fallback layout.
* **Cause**: Autosave updated `formData.template` but did not persist it inside the parent database column.
* **Solution**: Updated update schemas and autosave hooks to explicitly save `template: formData.template`.

### 5. CSS Disconnection in WeasyPrint (Part 1)
* **Problem**: Browser rendering worked perfectly, but WeasyPrint PDF output was completely unstyled.
* **Cause**: WeasyPrint runs in an isolated container environment and cannot resolve absolute CSS link hrefs.
* **Solution**: Injected styles directly using WeasyPrint's `CSS(filename=css_path)` method during compilation.

### 6. Broken Vertical Text Layout (Part 1)
* **Problem**: Descriptions printed vertically stacked characters (e.g. `W\no\nr\nk\ne\nd`).
* **Cause**: The Jinja template expected arrays (`{% for desc in project.description %}`) but data was stored as a single flat string, causing Jinja to iterate over each character.
* **Solution**: Unified schema contracts so descriptions are processed consistently.

### 7. Pydantic Environment Lookup Failures (Part 3)
* **Problem**: Threw `ValidationError` for missing settings variables on startup.
* **Cause**: Running diagnostic commands from the workspace root folder instead of the `backend/` directory prevented Pydantic from resolving the path to `.env`.
* **Solution**: Always activate virtual environments and run scripts from their local directory.

---

## 📚 Skills Learned During This Phase

### Frontend
* Advanced React state orchestration and unidirectional data bindings.
* Drag-and-drop native browser APIs (`onDragOver`, `onDrop`).
* React Hook execution rules and life-cycle debugging.
* Iframe embedding, rendering validation flows, and preview modals.

### Backend
* Jinja2 compiler design and local CSS injections.
* PDF compilation engine setup using WeasyPrint.
* Asymmetric request parsing (`multipart/form-data`) in FastAPI.
* High-speed text extraction from files using `pdfminer.six`.

### Architecture
* Decoupled hybrid rendering pipeline configuration.
* Strict schema validation and ORM JSONB serialization.
* Dynamic category-based strategy registries.

---

## 🚀 Final Features Completed

* **Dynamic Registries**: Swappable theme registry (`engineer`, `modern`, `creative`) and dynamic profession registry (`software_engineering`, `design`, `education`, `medical`, `general`).
* **Intelligent Composition**: Fully adaptive form inputs, field titles, live preview headers, and Jinja2 PDF layouts.
* **Autosave persistence**: Debounced autosave matching database model schemas.
* **ATS Scoring Engine**: Standalone drag-and-drop PDF parser, 0-100 scoring metric, missing keyword tagging, and AI bullet rewrites.
