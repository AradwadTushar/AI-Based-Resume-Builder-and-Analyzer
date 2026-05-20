import os

from jinja2 import (
    Environment,
    FileSystemLoader
)

from weasyprint import (
    HTML,
    CSS
)

from services.template_context import (
    build_template_context
)


BASE_DIR = os.path.dirname(
    os.path.dirname(__file__)
)

TEMPLATES_DIR = os.path.join(
    BASE_DIR,
    "templates"
)


env = Environment(
    loader=FileSystemLoader(
        TEMPLATES_DIR
    )
)


def render_resume_template(
    resume_data,
    template_name="engineer"
):

    context = build_template_context(
        resume_data
    )

    template = env.get_template(
        f"{template_name}/template.html"
    )

    rendered_html = template.render(

        template_name=template_name,

        **context
    )

    return rendered_html


def generate_resume_pdf(

    resume_data,

    template_name="engineer"
):

    rendered_html = render_resume_template(

        resume_data=resume_data,

        template_name=template_name
    )


    css_path = os.path.join(

        TEMPLATES_DIR,

        template_name,

        "style.css"
    )


    pdf = HTML(

        string=rendered_html,

        base_url=BASE_DIR

    ).write_pdf(

        stylesheets=[
            CSS(filename=css_path)
        ]
    )

    return pdf