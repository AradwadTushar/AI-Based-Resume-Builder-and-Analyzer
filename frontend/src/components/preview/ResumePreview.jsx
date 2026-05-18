import React from "react";
import BasicTemplate from "./BasicTemplate";

// Registry layout configuration map for effortless scaling
const TEMPLATE_REGISTRY = {
  default: BasicTemplate,
  basic: BasicTemplate,
  // Future templates register here:
  // tech: TechTemplate,
  // academic: AcademicTemplate,
};

function ResumePreview({ formData, resume }) {
  // Gracefully fallback to the base theme if the configuration doesn't exist
  const SelectedTemplate = TEMPLATE_REGISTRY[resume?.template?.toLowerCase()] || BasicTemplate;

  return (
    <div className="w-full bg-white shadow-xl rounded-lg border border-gray-200 print:shadow-none print:border-none">
      <SelectedTemplate formData={formData} />
    </div>
  );
}

export default ResumePreview;