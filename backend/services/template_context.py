def normalize_list(value):

    if value is None:
        return []

    if isinstance(value, list):
        return value

    return []


def normalize_personal_info(data):

    data = data or {}

    return {
        "fullName":
            data.get("fullName", ""),

        "title":
            data.get("title", ""),

        "email":
            data.get("email", ""),

        "phone":
            data.get("phone", ""),

        "location":
            data.get("location", ""),

        "linkedin":
            data.get("linkedin", ""),

        "github":
            data.get("github", ""),

        "portfolio":
            data.get("portfolio", ""),
    }


def normalize_experience(experience_list):

    normalized = []

    for job in normalize_list(experience_list):

        normalized.append({

            "title":
                job.get("title", ""),

            "company":
                job.get("company", ""),

            "location":
                job.get("location", ""),

            "startDate":
                job.get("startDate", ""),

            "endDate":
                job.get("endDate") or "Present",

            "description":
                job.get("description", ""),

            "bullets":
                normalize_list(
                    job.get("bullets")
                ),
        })

    return normalized


def build_template_context(resume_data):

    resume_data = resume_data or {}

    return {

        "personalInfo":
            normalize_personal_info(
                resume_data.get("personalInfo")
            ),

        "summary":
            resume_data.get("summary", ""),

        "skills":
            normalize_list(
                resume_data.get("skills")
            ),

        "experience":
            normalize_experience(
                resume_data.get("experience")
            ),

        "projects":
            normalize_list(
                resume_data.get("projects")
            ),

        "education":
            normalize_list(
                resume_data.get("education")
            ),

        "certifications":
            normalize_list(
                resume_data.get("certifications")
            ),
    }