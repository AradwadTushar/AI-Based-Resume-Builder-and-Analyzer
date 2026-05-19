import React from "react";

// 1. Added handleRewriteExperience and aiLoadingIndex to the props destructured below
function ExperienceSection({ 
  formData, 
  addExperience, 
  updateExperience, 
  removeExperience,
  handleRewriteExperience, 
  aiLoadingIndex 
}) {
  return (
    <div className="space-y-4 mt-6 pt-6 border-t">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-xl">Experience</h3>

        <button
          type="button"
          onClick={addExperience}
          className="border px-4 py-1 rounded bg-gray-50 hover:bg-gray-100 transition text-sm"
        >
          Add Experience
        </button>
      </div>

      {(formData?.experience || []).map((exp, index) => (
        <div key={index} className="border rounded p-4 space-y-2 bg-white relative shadow-sm">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Entry #{index + 1}
            </span>
            <button
              type="button"
              onClick={() => removeExperience(index)}
              className="text-red-500 hover:text-red-700 text-sm font-medium"
            >
              Remove
            </button>
          </div>

          <input
            value={exp.company || ""}
            onChange={(e) => updateExperience(index, "company", e.target.value)}
            placeholder="Company"
            className="border p-2 rounded w-full text-sm"
          />

          <input
            value={exp.role || ""}
            onChange={(e) => updateExperience(index, "role", e.target.value)}
            placeholder="Role"
            className="border p-2 rounded w-full text-sm"
          />

          <input
            value={exp.duration || ""}
            onChange={(e) => updateExperience(index, "duration", e.target.value)}
            placeholder="Duration"
            className="border p-2 rounded w-full text-sm"
          />

          <textarea
            value={exp.description || ""}
            onChange={(e) => updateExperience(index, "description", e.target.value)}
            placeholder="Description"
            className="border p-2 rounded w-full text-sm h-24"
          />
          
          <button
            type="button"
            onClick={() => handleRewriteExperience(index)}
            disabled={aiLoadingIndex === index}
            className="text-sm bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 disabled:opacity-50"
          >
            {aiLoadingIndex === index ? "Improving..." : "Improve with AI"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default ExperienceSection;