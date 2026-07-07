# AI Resume Builder v2 — Phase 5 Documentation
## Premium UI Redesign & Onboarding, Custom Photos, and Features Extension (Phase 5 & 5.5)

---

## 📌 Phase Overview

Phase 5 represents the finalization of the user-facing workspaces of **ResumeIQ AI**, shifting the application from a functional engineering prototype into a polished, premium-grade SaaS platform.

This phase is structured into two main parts:
* **Phase 5 (Visual Polish & Onboarding)**: Redesigning the application's aesthetic foundation. This includes introducing glassmorphism panels, HSL-based dynamic color tokens, premium loading animations, responsive layouts, and an interactive tour for first-time users.
* **Phase 5.5 (Feature Extensions & Multi-Provider AI)**: Building high-impact functional features. This includes passport photo uploads, a fourth resume template (`photo_professional`), an interactive Analysis History archive (`/history`) with delete verification prompts, and a swappable LLM wrapper mapping calls to either Gemini or a local Ollama instance.

---

## 🏗️ Architecture Developed

### 1. Unified Front-to-Back Photo Processing
Handles passport photos as raw Base64 data strings seamlessly embedded into the document state and mapped directly into PDF templates:

```
User uploads photo (cropped to 1:1)
          ↓
React state encodes image to Base64 String
          ↓
Autosave persists Base64 in PostgreSQL JSONB
          ↓
Backend `template_context.py` normalizes `passportPhoto`
          ↓
Jinja2 renders image tag -> WeasyPrint compiles binary PDF
```

### 2. Swappable AI Engine Integration
Decouples application logic from specific LLM vendors using a factory pattern wrapper. This allows you to scale, test, or switch backends by modifying a single environment variable:

```
FastAPI Router requests AI (Summary, Bullet Rewrite, Analyzer)
                         │
                         ▼
           get_model() [ai_client.py]
                         │
        ┌────────────────┴────────────────┐
        ▼ (AI_PROVIDER=gemini)             ▼ (AI_PROVIDER=ollama)
Google Gemini API                         Ollama Client (Local Engine)
(Default Cloud Provider)                  (LLaMA3 / Gemma2 via REST)
```

---

## 🧠 Major Systems Built

### 1. Premium Visual Identity System (Phase 5)
* **HeroMockup Component**: An animated SVG-based infographic displaying rotating tech-orbs, pulsing nodes, and glowing layout panels.
* **Mesh Gradient Backgrounds**: Slow-moving backdrop radial gradients (`mesh-bg`) configured via CSS animations (`@keyframes mesh-drift`) to inject dynamic color depth to dark and light modes.
* **Premium Loader Widget**: Replaced generic loading spinners with custom-designed glassmorphism circles featuring gradient borders and spinning effects.
* **Glassmorphism Panels**: UI cards styled with `backdrop-filter: blur(14px)` and fine light borders, reflecting a modern dashboard aesthetic.

### 2. Interactive Onboarding Tour (Phase 5)
A first-time user guidance framework (`OnboardingTour.jsx`) using structured step overlays to guide users step-by-step through:
1. Setting up their profile and category.
2. Generating AI content.
3. Reviewing layout templates.
4. Scanning and scoring their PDF documents.

### 3. Native Passport Photo Processing (Phase 5.5)
* **Uploader Component**: A square uploader component mapping file attachments to compressed Base64 strings.
* **Database & Rendering Integration**: Updated the SQLAlchemy schema and context normalizer (`template_context.py`) to handle the `passportPhoto` string payload.

### 4. Fourth Layout Template: `photo_professional` (Phase 5.5)
Designed a premium two-column template layout tailored specifically to display a passport photo on the left sidebar:
* **Sidebar Columns**: Left-hand sidebar hosting contact details, a photo, and tags. Right-hand pane displaying experience and education bullet points.
* **Print-safe CSS styling**: Optimized margins and page-break configurations to ensure single or double page constraints compile perfectly.

### 5. Historical Analysis Archive (`/history`) (Phase 5.5)
* **Chronological Dashboard**: Displays past ATS resume runs showing score dials, timestamp tags, and scanned metadata cards.
* **Destructive Deletion Modal**: Added confirmation dialogs to prevent accidental loss when invoking delete requests.
* **FastAPI Router Endpoints**:
  ```http
  GET    /api/analyze/history         # List user records
  DELETE /api/analyze/history/{id}    # Delete single history node
  ```

---

## ⚙️ Key Architectural Decisions & Learnings

1. **Base64 Photo Storage vs. Cloud Storage**: For small profile pictures (less than 200KB), storing photos as Base64 strings directly inside the resume JSONB object eliminates external asset hosting dependencies, simplifying backup recovery processes.
2. **Provider Factory Decoupling**: Placing model setup logic inside a wrapper factory allows all service endpoints to access the LLM via `model = get_model()`, hiding details like endpoints, API keys, or timeout properties from backend routes.

---

## 🔥 Major Problems Faced & Solutions

### 1. Base64 String Bloating PDF Compilation
* **Problem**: Large high-resolution images converted to Base64 caused WeasyPrint to run out of memory or throw timeouts.
* **Solution**: Implemented frontend canvas pre-compression, forcing images down to a maximum of 300x300 pixels before encoding them to Base64.
* **Lesson**: Never send raw high-resolution media straight into PDF generation engines.

### 2. Clerk JWT Token Expiry in Long Sessions
* **Problem**: Long sessions caused Axios requests to throw 401 unauthorized warnings.
* **Solution**: Added Axios interceptors that retrieve refreshed Clerk JWT tokens dynamically on every outgoing request.
* **Lesson**: Secure stateless sessions require token refreshing hooks.

---

## 📚 Skills Learned During This Phase

### Frontend
* Custom CSS animation keyframes and ambient gradient mesh designs.
* Base64 file conversion and HTML5 canvas image resizing.
* Walkthrough overlays and step-by-step tutorial setups.
* Confirm-delete modal widgets.

### Backend
* Flexible AI factory provider setups.
* Multi-column template design and page-break configuration rules.
* HTTP delete routers and database record deletions.

---

## 🚀 Final Features Completed

* **Premium Theme**: Glassmorphism cards, mesh backgrounds, custom spinners, and dark mode styling overrides.
* **Onboarding Guide**: Step-by-step guide for new users.
* **Passport Photo**: Base64 photo uploader and two-column `photo_professional` template.
* **Scoring Log**: Historical analysis dashboard with delete options.
* **LLM Engine Wrapper**: Dynamic factory resolving calls to Gemini or Ollama.
