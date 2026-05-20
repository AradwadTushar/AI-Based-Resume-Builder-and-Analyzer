from pathlib import Path
from jinja2 import Environment, FileSystemLoader
from weasyprint import HTML

# Removed unused imports that cause name conflicts:
# - 'from tempfile import template' overrides your local template variable
# - 'from matplotlib.style import context' overrides your local context variable

BASE_DIR = Path(__file__).resolve().parent.parent
TEMPLATES_DIR = BASE_DIR / "templates"

def generate_resume_pdf(resume_data, template_name="engineer"):
    template_path = TEMPLATES_DIR / template_name

    env = Environment(
        loader=FileSystemLoader(template_path)
    )

    template = env.get_template("template.html")

    # Kept the local import inside the function as originally designed
    from services.template_context import build_template_context
    
    context = build_template_context(resume_data)

    # Indented these lines so they belong to the function
    rendered_html = template.render(**context)

    pdf = HTML(
        string=rendered_html,
        base_url=str(template_path)  # Converted to string to prevent WeasyPrint path resolution quirks
    ).write_pdf()

    return pdf