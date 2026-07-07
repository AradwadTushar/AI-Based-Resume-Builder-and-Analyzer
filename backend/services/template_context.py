def normalize_list(value):
    if value is None:
        return []
    if isinstance(value, list):
        return value
    return []


def parse_description_to_bullets(description):
    """
    Parses a single description string containing bullet characters (•, ■, ▪, *, -)
    or newlines into a list of separate bullet strings for rendering.
    """
    if not description:
        return []

    # Standardize bullet symbols by converting them to newlines
    text = description.replace("•", "\n").replace("■", "\n").replace("▪", "\n")
    
    # Also handle markdown style bullet items starting with '*' or '-' followed by space
    lines = []
    for line in text.split("\n"):
        line = line.strip()
        if not line:
            continue
        # Strip leading bullet/dash indicators if they exist
        if line.startswith("* ") or line.startswith("- "):
            line = line[2:].strip()
        elif line.startswith("*") or line.startswith("-"):
            line = line[1:].strip()
        
        if line:
            lines.append(line)

    # Only treat as bullets if there are multiple lines/points extracted
    if len(lines) > 1:
        return lines
    return []


def normalize_personal_info(data):
    data = data or {}
    return {
        "fullName": data.get("fullName", ""),
        "title": data.get("title", ""),
        "email": data.get("email", ""),
        "phone": data.get("phone", ""),
        "location": data.get("location", ""),
        "linkedin": data.get("linkedin", ""),
        "github": data.get("github", ""),
        "portfolio": data.get("portfolio", ""),
        "passportPhoto": data.get("passportPhoto", ""),
    }


def normalize_experience(experience_list):
    normalized = []
    for job in normalize_list(experience_list):
        desc = job.get("description", "")
        bullets = normalize_list(job.get("bullets"))
        
        # If bullets list is empty, try parsing the description text
        if not bullets and desc:
            bullets = parse_description_to_bullets(desc)
            
        normalized.append({
            "title": job.get("title", ""),
            "company": job.get("company", ""),
            "location": job.get("location", ""),
            "startDate": job.get("startDate", ""),
            "endDate": job.get("endDate") or "Present",
            "description": desc,
            "bullets": bullets,
        })
    return normalized


def normalize_projects(projects_list):
    normalized = []
    for project in normalize_list(projects_list):
        desc = project.get("description", "")
        bullets = normalize_list(project.get("bullets"))
        
        # Parse description into separate bullets if empty
        if not bullets and desc:
            bullets = parse_description_to_bullets(desc)
            
        normalized.append({
            "name": project.get("name", ""),
            "url": project.get("url", ""),
            "techStack": project.get("techStack", ""),
            "date": project.get("date", ""),
            "description": desc,
            "bullets": bullets,
        })
    return normalized


def build_template_context(resume_data):
    resume_data = resume_data or {}
    return {
        "roleCategory": resume_data.get("roleCategory", "software_engineering"),
        "personalInfo": normalize_personal_info(resume_data.get("personalInfo")),
        "summary": resume_data.get("summary", ""),
        "skills": normalize_list(resume_data.get("skills")),
        "experience": normalize_experience(resume_data.get("experience")),
        "projects": normalize_projects(resume_data.get("projects")),
        "education": normalize_list(resume_data.get("education")),
        "certifications": normalize_list(resume_data.get("certifications")),
    }