import React from "react";
import { Plus, Trash2 } from "lucide-react";

function EducationSection({ formData, addEducation, updateEducation, removeEducation }) {
  return (
    <div className="space-y-4 mt-6 pt-6 border-t border-slate-100">
      <div className="ef-section-header" style={{ borderBottom: "none", marginBottom: 0, paddingBottom: 0 }}>
        <span className="ef-section-title">Education</span>
        <button onClick={addEducation} className="ef-add-btn" type="button">
          <Plus className="w-3.5 h-3.5" />
          Add Entry
        </button>
      </div>

      <div className="space-y-3">
        {(formData?.education || []).map((edu, index) => (
          <div key={index} className="ef-section-card">
            <div className="flex justify-between items-center mb-3">
              <span className="ef-entry-label">Education #{index + 1}</span>
              <button type="button" onClick={() => removeEducation(index)} className="ef-remove-btn" title="Remove">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              <div>
                <label className="ef-label">Institution / School</label>
                <input
                  value={edu.institution || ""}
                  onChange={(e) => updateEducation(index, "institution", e.target.value)}
                  placeholder="e.g. MIT, Stanford University"
                  className="ef-input"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="ef-label">Degree / Field of Study</label>
                  <input
                    value={edu.degree || ""}
                    onChange={(e) => updateEducation(index, "degree", e.target.value)}
                    placeholder="e.g. B.Sc. Computer Science"
                    className="ef-input"
                  />
                </div>
                <div>
                  <label className="ef-label">Duration</label>
                  <input
                    value={edu.duration || ""}
                    onChange={(e) => updateEducation(index, "duration", e.target.value)}
                    placeholder="e.g. 2018 – 2022"
                    className="ef-input"
                  />
                </div>
              </div>

              <div>
                <label className="ef-label">Notes / Achievements</label>
                <textarea
                  value={edu.description || ""}
                  onChange={(e) => updateEducation(index, "description", e.target.value)}
                  placeholder="GPA, honours, thesis title, notable coursework..."
                  className="ef-textarea"
                  style={{ minHeight: "72px" }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EducationSection;