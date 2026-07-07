import React from "react";
import { Sparkles, Plus, Trash2 } from "lucide-react";

function ExperienceSection({ 
  formData, 
  addExperience, 
  updateExperience, 
  removeExperience,
  handleRewriteExperience, 
  aiLoadingIndex,
  title = "Experience"
}) {
  return (
    <div className="space-y-4 mt-6 pt-6 border-t border-slate-100">
      <div className="ef-section-header" style={{ borderBottom: "none", marginBottom: 0, paddingBottom: 0 }}>
        <span className="ef-section-title">{title}</span>
        <button type="button" onClick={addExperience} className="ef-add-btn">
          <Plus className="w-3.5 h-3.5" />
          Add Entry
        </button>
      </div>

      <div className="space-y-3">
        {(formData?.experience || []).map((exp, index) => (
          <div key={index} className="ef-section-card">
            <div className="flex justify-between items-center mb-3">
              <span className="ef-entry-label">Entry #{index + 1}</span>
              <button type="button" onClick={() => removeExperience(index)} className="ef-remove-btn" title="Remove">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="ef-label">Company</label>
                  <input
                    value={exp.company || ""}
                    onChange={(e) => updateExperience(index, "company", e.target.value)}
                    placeholder="e.g. Google"
                    className="ef-input"
                  />
                </div>
                <div>
                  <label className="ef-label">Role / Title</label>
                  <input
                    value={exp.role || ""}
                    onChange={(e) => updateExperience(index, "role", e.target.value)}
                    placeholder="e.g. Senior Software Engineer"
                    className="ef-input"
                  />
                </div>
              </div>

              <div>
                <label className="ef-label">Duration</label>
                <input
                  value={exp.duration || ""}
                  onChange={(e) => updateExperience(index, "duration", e.target.value)}
                  placeholder="e.g. Jan 2022 – Present"
                  className="ef-input"
                />
              </div>

              <div>
                <label className="ef-label">Description / Bullet Points</label>
                <textarea
                  value={exp.description || ""}
                  onChange={(e) => updateExperience(index, "description", e.target.value)}
                  placeholder="Describe your key achievements and contributions. Use numbers where possible (e.g. increased performance by 40%)."
                  className="ef-textarea"
                />
              </div>

              <button
                type="button"
                onClick={() => handleRewriteExperience(index)}
                disabled={aiLoadingIndex === index}
                className="ef-ai-btn"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {aiLoadingIndex === index ? "Improving with AI..." : "Improve with AI"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExperienceSection;