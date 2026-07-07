import json
from config import settings
from .ai_client import get_model

model = get_model()


def _clean_json_response(text: str) -> str:
    """Strip markdown fences Gemini sometimes wraps around JSON output."""
    cleaned = text.strip()
    if cleaned.startswith("```"):
        # Remove opening fence (```json or ```)
        cleaned = cleaned.split("```", 2)[1]
        if cleaned.startswith("json"):
            cleaned = cleaned[4:]
    # Remove closing fence if present
    if cleaned.endswith("```"):
        cleaned = cleaned[:-3]
    return cleaned.strip()


def _infer_role_context(data: dict) -> str:
    """
    Returns a role context string for the prompt.
    Uses explicit target_role if provided, otherwise infers
    from skills/experience, falling back to 'Professional'.
    """
    if data.get("target_role"):
        return data["target_role"]

    # Try to infer from skills
    skills = [s.lower() for s in data.get("skills", [])]
    experience = data.get("experience", [])
    roles = [e.get("role", "").lower() for e in experience]
    combined = " ".join(skills + roles)

    tech_keywords = {"react", "python", "node", "java", "docker", "aws", "sql", "javascript", "typescript"}
    ml_keywords = {"pytorch", "tensorflow", "scikit", "nlp", "ml", "ai", "deep learning", "pandas"}
    design_keywords = {"figma", "ui", "ux", "sketch", "adobe", "photoshop", "illustrator"}
    data_keywords = {"tableau", "power bi", "excel", "etl", "warehouse", "analytics", "databricks"}
    education_keywords = {"teacher", "educator", "curriculum", "classroom", "instructor", "tutor"}
    marketing_keywords = {"seo", "campaign", "marketing", "social media", "content", "brand"}

    if any(k in combined for k in ml_keywords):
        return "Machine Learning / AI Engineer"
    if any(k in combined for k in tech_keywords):
        return "Software Engineer"
    if any(k in combined for k in design_keywords):
        return "UI/UX Designer"
    if any(k in combined for k in data_keywords):
        return "Data Analyst"
    if any(k in combined for k in education_keywords):
        return "Teacher / Educator"
    if any(k in combined for k in marketing_keywords):
        return "Marketing Professional"

    return "Professional"  # Safe generic fallback


async def generate_summary(data: dict) -> str:
    role_context = _infer_role_context(data)

    prompt = f"""
You are a professional resume writing assistant specializing in {role_context} roles.

Generate a concise professional resume summary for a {role_context}.

Skills:
{data.get("skills", [])}

Experience:
{data.get("experience", [])}

Education:
{data.get("education", [])}

Rules:
- Keep it 3-4 lines
- Professional tone
- ATS-friendly for {role_context} positions
- No markdown
- No bullet points
- Return ONLY the final summary text
- Do not include headings
- Do not include quotation marks
- Maximum 80 words
"""

    response = model.generate_content(prompt)
    return response.text.strip()


async def rewrite_experience(data: dict) -> str:
    prompt = f"""
You are an expert ATS-friendly resume writing assistant.

Rewrite the following resume experience into a strong professional description.

Role: {data.get("role")}
Company: {data.get("company")}
Original Description: {data.get("description")}

Rules:
- ATS-friendly
- Professional tone
- Focus on achievements and measurable impact
- Use strong action verbs
- Maximum 2 sentences
- No markdown
- No bullet symbols
- No numbering
- No headers
- Return ONLY the rewritten text
"""

    response = model.generate_content(prompt)
    return response.text.strip()


async def analyze_resume(data: dict):
    role_context = _infer_role_context(data)

    prompt = f"""
You are an expert ATS resume analyzer for {role_context} positions.

Analyze the following resume strictly in the context of {role_context} roles.

Resume Data:
{data}

Scoring Rubric:
- 0 to 20: Empty or near-empty resume with almost no content
- 21 to 40: Very weak resume, missing most sections or all content is vague
- 41 to 60: Average resume with some content but lacks metrics, depth, or specificity
- 61 to 75: Good resume with real experience but missing quantified achievements or key tools
- 76 to 90: Strong resume with quantified achievements, multiple roles, strong projects
- 91 to 100: Exceptional resume — senior level, fully quantified, complete and detailed sections

Rules:
- Score must reflect the rubric above honestly
- missing_keywords must ONLY include keywords relevant to {role_context} positions
- Do NOT suggest unrelated technologies or skills (e.g., do not suggest Docker for a Teacher)
- weak_sections should describe WHY the section is weak, not just name it
- suggestions must be specific and actionable, not generic advice
- Return ONLY valid JSON, no markdown, no explanation outside JSON

Required JSON format:
{{
  "score": integer between 0 and 100,
  "missing_keywords": [
    "keyword relevant to {role_context}"
  ],
  "weak_sections": [
    "specific weakness description"
  ],
  "suggestions": [
    "specific actionable suggestion"
  ]
}}
"""

    response = model.generate_content(prompt)
    cleaned = _clean_json_response(response.text)

    try:
        return json.loads(cleaned)
    except json.JSONDecodeError as e:
        # Log the raw response for debugging and raise cleanly
        print(f"[analyze_resume] JSON parse failed: {e}")
        print(f"[analyze_resume] Raw response: {response.text}")
        raise ValueError("AI returned malformed JSON. Please try again.") from e
    
    
async def match_job_description(data: dict):
    prompt = f"""
You are an ATS optimization expert.

Compare this resume against the target job description.

Resume:
{data.get("resume_data")}

Job Description:
{data.get("job_description")}

Return ONLY valid JSON.

Required JSON format:
{{
  "match_score": integer between 0 and 100,
  "matched_keywords": [
    "keyword"
  ],
  "missing_keywords": [
    "keyword"
  ],
  "recommendations": [
    "specific actionable recommendation"
  ]
}}

Rules:
- Focus ONLY on relevance to the job description
- Recommendations should be actionable
- Missing keywords must come from the JD
- Do not hallucinate unrelated technologies
- No markdown
- No explanations outside JSON
"""

    response = model.generate_content(prompt)

    cleaned = _clean_json_response(
        response.text
    )

    return json.loads(cleaned)


async def analyze_raw_resume(resume_text: str, job_description: str | None = None) -> dict:
    """Analyzes raw resume text, optionally against a job description, and returns structured feedback."""
    if job_description:
        prompt = f"""
You are an expert ATS optimization assistant.
Analyze the following resume text against the target job description.

Resume Text:
{resume_text}

Job Description:
{job_description}

Rules:
- Score must represent how well the resume matches the job description (0 to 100).
- missing_keywords must include keywords and skills mentioned in the job description that are absent or weak in the resume.
- weak_sections should specify which parts of the resume fail to align with the job description.
- suggestions must provide specific guidance on how to customize the resume for this position.
- rewrites must provide 1-3 specific before-and-after improvements adapting the resume's text to match the JD's requirements.
- Return ONLY valid JSON matching the format below. Do not include markdown fences or any explanation outside the JSON.

Required JSON format:
{{
  "score": integer,
  "missing_keywords": ["keyword"],
  "weak_sections": ["weakness description"],
  "suggestions": ["suggestion"],
  "rewrites": [
    {{
      "original": "original text to improve",
      "improved": "improved text tailored to the JD"
    }}
  ]
}}
"""
    else:
        prompt = f"""
You are an expert ATS resume analyzer.
Analyze the following resume text.

Resume Text:
{resume_text}

Rules:
- Score the resume's overall quality and ATS readiness (0 to 100).
- missing_keywords must list standard professional keywords/skills that are expected for the candidate's career level but missing.
- weak_sections should describe specific parts of the resume that lack detail, metrics, or proper formatting.
- suggestions must provide clear, actionable steps to improve the resume.
- rewrites must provide 1-3 before-and-after examples improving generic lines in the resume text into strong, metrics-driven bullets.
- Return ONLY valid JSON matching the format below. Do not include markdown fences or any explanation outside the JSON.

Required JSON format:
{{
  "score": integer,
  "missing_keywords": ["keyword"],
  "weak_sections": ["weakness description"],
  "suggestions": ["suggestion"],
  "rewrites": [
    {{
      "original": "original text to improve",
      "improved": "improved text with metrics/achievements"
    }}
  ]
}}
"""

    response = model.generate_content(prompt)
    cleaned = _clean_json_response(response.text)
    return json.loads(cleaned)


async def generate_cover_letter_service(data: dict) -> str:
    resume_data = data.get("resume_data", {})
    job_description = data.get("job_description", "")

    prompt = f"""
You are a professional career coach and expert resume/cover letter writer.
Write a highly compelling, tailored, and modern Cover Letter based on the applicant's resume details and the target Job Description.

Resume Details:
{json.dumps(resume_data, indent=2)}

Job Description:
{job_description}

Rules:
1. Make it professional, polite, and persuasive.
2. Align the candidate's achievements directly to the job description key requirements.
3. Structure it correctly:
   - Date / Professional Header (with placeholders or using contact details from resume if present)
   - Salutation (Dear Hiring Manager, or specific name if inferable)
   - Introduction (capturing interest and stating role)
   - Body Paragraphs (highlighting specific skills and outcomes)
   - Closing (expressing enthusiasm and call-to-action)
   - Sign-off (Sincerely, candidate's name)
4. Do not make up facts not supported by the resume data, but present existing details in the best possible light.
5. Return ONLY the plain text of the cover letter. Do not include any HTML tags, conversational introductions, or markdown fences.
"""
    response = model.generate_content(prompt)
    return response.text.strip()