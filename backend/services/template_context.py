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
    Filters out hard wraps (newlines) if explicit bullet points are present.
    """
    if not description:
        return []

    # Clean leading/trailing spaces
    description = description.strip()
    
    # Identify if there are explicit bullet indicators in the text
    bullet_symbols = ["•", "■", "▪", "* ", "- "]
    has_explicit_bullets = any(sym in description for sym in bullet_symbols)
    
    if has_explicit_bullets:
        # Standardize bullet symbols to a unique delimiter
        text = description
        for sym in bullet_symbols:
            text = text.replace(sym, "||BULLET||")
            
        # Split by the delimiter
        raw_parts = text.split("||BULLET||")
        
        bullets = []
        for part in raw_parts:
            # Replace raw internal newlines with spaces to fix copy-paste hard wraps
            part_clean = part.replace("\n", " ").strip()
            # Collapse duplicate spaces
            part_clean = " ".join(part_clean.split())
            if part_clean:
                bullets.append(part_clean)
        return bullets
    else:
        # No explicit bullet characters. We split on newlines ONLY if it looks like a clean list
        # (i.e. each line represents a separate thought/sentence)
        raw_lines = description.split("\n")
        bullets = []
        for line in raw_lines:
            line_clean = line.strip()
            if not line_clean:
                continue
            
            # Strip potential leading list markers like single dashes or stars
            if line_clean.startswith("*") or line_clean.startswith("-"):
                line_clean = line_clean[1:].strip()
                
            if line_clean:
                bullets.append(line_clean)
                
        # If we got multiple distinct lines, treat them as bullets. Otherwise, fallback to single paragraph.
        if len(bullets) > 1:
            return bullets
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