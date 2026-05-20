import React from "react";

import EngineerPreview from "@/templates/EngineerPreview";
import ModernPreview from "@/templates/ModernPreview";
import CreativePreview from "@/templates/CreativePreview";


// Dynamic template registry

const TEMPLATE_COMPONENTS = {

  engineer: EngineerPreview,

  modern: ModernPreview,

  creative: CreativePreview,
};


function ResumePreview({

  formData,
  resume

}) {

  const selectedTemplate =

    formData?.template ||
    resume?.template ||
    "engineer";


  const PreviewComponent =

    TEMPLATE_COMPONENTS[
      selectedTemplate
    ] || EngineerPreview;


  return (

    <div
      className="
        w-full bg-white shadow-xl
        rounded-lg border border-gray-200
        print:shadow-none print:border-none
      "
    >

      <PreviewComponent
        formData={formData}
        resume={resume}
      />

    </div>
  );
}

export default ResumePreview;