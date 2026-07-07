import React from "react";
import { Plus, Trash2 } from "lucide-react";

function ProjectsSection({ formData, addProject, updateProject, removeProject, title = "Projects" }) {
  return (
    <div className="space-y-4 mt-6 pt-6 border-t border-slate-100">
      <div className="ef-section-header" style={{ borderBottom: "none", marginBottom: 0, paddingBottom: 0 }}>
        <span className="ef-section-title">{title}</span>
        <button onClick={addProject} className="ef-add-btn" type="button">
          <Plus className="w-3.5 h-3.5" />
          Add Project
        </button>
      </div>

      <div className="space-y-3">
        {(formData?.projects || []).map((proj, index) => (
          <div key={index} className="ef-section-card">
            <div className="flex justify-between items-center mb-3">
              <span className="ef-entry-label">Project #{index + 1}</span>
              <button type="button" onClick={() => removeProject(index)} className="ef-remove-btn" title="Remove">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="ef-label">Project Name</label>
                  <input
                    value={proj.name || ""}
                    onChange={(e) => updateProject(index, "name", e.target.value)}
                    placeholder="e.g. ResumeIQ AI"
                    className="ef-input"
                  />
                </div>
                <div>
                  <label className="ef-label">Tech Stack</label>
                  <input
                    value={proj.techStack || ""}
                    onChange={(e) => updateProject(index, "techStack", e.target.value)}
                    placeholder="React, FastAPI, PostgreSQL"
                    className="ef-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="ef-label">GitHub Repository</label>
                  <input
                    value={proj.githubLink || ""}
                    onChange={(e) => updateProject(index, "githubLink", e.target.value)}
                    placeholder="github.com/you/project"
                    className="ef-input"
                  />
                </div>
                <div>
                  <label className="ef-label">Live Demo URL</label>
                  <input
                    value={proj.demoLink || ""}
                    onChange={(e) => updateProject(index, "demoLink", e.target.value)}
                    placeholder="https://yourproject.dev"
                    className="ef-input"
                  />
                </div>
              </div>

              <div>
                <label className="ef-label">Description</label>
                <textarea
                  value={proj.description || ""}
                  onChange={(e) => updateProject(index, "description", e.target.value)}
                  placeholder="What did it do, what problem did it solve, what was your impact?"
                  className="ef-textarea"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectsSection;