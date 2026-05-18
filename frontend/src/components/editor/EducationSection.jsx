import React from "react";

function EducationSection({ formData, addEducation, updateEducation, removeEducation }) {
  return (
    <div className="space-y-4 mt-6 pt-6 border-t">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-xl">Education</h3>
        <button
          onClick={addEducation}
          className="border px-4 py-1 rounded bg-gray-50 hover:bg-gray-100 transition text-sm"
        >
          Add Education
        </button>
      </div>

      {(formData?.education || []).map((edu, index) => (
        <div key={index} className="border rounded p-4 space-y-2 bg-white relative shadow-sm">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Education #{index + 1}
            </span>
            <button
              onClick={() => removeEducation(index)}
              className="text-red-500 hover:text-red-700 text-sm font-medium"
            >
              Remove
            </button>
          </div>

          <input
            value={edu.institution || ""}
            onChange={(e) => updateEducation(index, "institution", e.target.value)}
            placeholder="Institution / School"
            className="border p-2 rounded w-full text-sm"
          />

          <input
            value={edu.degree || ""}
            onChange={(e) => updateEducation(index, "degree", e.target.value)}
            placeholder="Degree / Field of Study"
            className="border p-2 rounded w-full text-sm"
          />

          <input
            value={edu.duration || ""}
            onChange={(e) => updateEducation(index, "duration", e.target.value)}
            placeholder="Duration (e.g., 2018 - 2022)"
            className="border p-2 rounded w-full text-sm"
          />

          <textarea
            value={edu.description || ""}
            onChange={(e) => updateEducation(index, "description", e.target.value)}
            placeholder="Description or notable achievements"
            className="border p-2 rounded w-full text-sm h-24"
          />
        </div>
      ))}
    </div>
  );
}

export default EducationSection;