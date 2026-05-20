import { RESUME_TEMPLATES }
from "../config/templates"

export default function TemplateSelector({

    selectedTemplate,
    onSelect

}) {

    return (

        <div className="grid gap-4">

            {RESUME_TEMPLATES.map((template) => (

                <button
                    key={template.id}

                    onClick={() =>
                        onSelect(template.id)
                    }

                    className={`
                        border rounded-xl p-4
                        text-left transition

                        ${
                            selectedTemplate === template.id
                            ? "border-blue-500"
                            : "border-gray-300"
                        }
                    `}
                >

                    <h3 className="font-bold">
                        {template.name}
                    </h3>

                    <p className="text-sm text-gray-600">
                        {template.description}
                    </p>

                    <p className="text-xs mt-2">
                        ATS Score:
                        {template.atsScore}%
                    </p>

                </button>
            ))}

        </div>
    )
}