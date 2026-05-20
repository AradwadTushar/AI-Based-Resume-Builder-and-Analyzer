import {

  RESUME_TEMPLATES

} from "@/config/templates";


function TemplateSelector({

  selectedTemplate,
  onSelect

}) {

  return (

    <div className="mb-6">

      <h3
        className="
          text-sm font-semibold
          text-gray-700 mb-3
        "
      >
        Choose Template
      </h3>

      <div className="grid gap-3">

        {RESUME_TEMPLATES.map((template) => (

          <button
            key={template.id}

            onClick={() =>
              onSelect(template.id)
            }

            className={`
              border rounded-xl p-4
              text-left transition-all

              ${
                selectedTemplate === template.id

                ? "border-blue-500 bg-blue-50"

                : "border-gray-200 bg-white"
              }
            `}
          >

            <div
              className="
                flex justify-between
                items-center
              "
            >

              <h4
                className="
                  font-semibold text-gray-900
                "
              >
                {template.name}
              </h4>

              <span
                className="
                  text-xs px-2 py-1 rounded-full
                  bg-gray-100 text-gray-600
                "
              >
                ATS {template.atsScore}%
              </span>

            </div>

            <p
              className="
                text-sm text-gray-500 mt-1
              "
            >
              {template.description}
            </p>

          </button>
        ))}

      </div>

    </div>
  );
}

export default TemplateSelector;