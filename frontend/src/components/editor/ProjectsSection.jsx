import React from "react";

function ProjectsSection({ formData, addProject, updateProject, removeProject }) {
  return (
    <div className="space-y-4 mt-6 pt-6 border-t">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-xl">Projects</h3>
        <button
          onClick={addProject}
          className="border px-4 py-1 rounded bg-gray-50 hover:bg-gray-100 transition text-sm"
        >
          Add Project
        </button>
      </div>

      {(formData?.projects || []).map((proj, index) => (
        <div key={index} className="border rounded p-4 space-y-2 bg-white relative shadow-sm">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Project #{index + 1}
            </span>
            <button
              onClick={() => removeProject(index)}
              className="text-red-500 hover:text-red-700 text-sm font-medium"
            >
              Remove
            </button>
          </div>

          <input
            value={proj.name || ""}
            onChange={(e) => updateProject(index, "name", e.target.value)}
            placeholder="Project Name"
            className="border p-2 rounded w-full text-sm"
          />

          <input
            value={proj.techStack || ""}
            onChange={(e) => updateProject(index, "techStack", e.target.value)}
            placeholder="Tech Stack (e.g., React, Node.js, FastAPI)"
            className="border p-2 rounded w-full text-sm"
          />

          <input
            value={proj.githubLink || ""}
            onChange={(e) => updateProject(index, "githubLink", e.target.value)}
            placeholder="GitHub Repository URL"
            className="border p-2 rounded w-full text-sm"
          />

          <input
            value={proj.demoLink || ""}
            onChange={(e) => updateProject(index, "demoLink", e.target.value)}
            placeholder="Live Demo URL"
            className="border p-2 rounded w-full text-sm"
          />

          <textarea
            value={proj.description || ""}
            onChange={(e) => updateProject(index, "description", e.target.value)}
            placeholder="Project Description"
            className="border p-2 rounded w-full text-sm h-24"
          />
        </div>
      ))}
    </div>
  );
}

export default ProjectsSection;