import { useState } from "react";
import { Plus } from "lucide-react";

function SkillsSection({ formData, addSkill, removeSkill }) {
  const [skillInput, setSkillInput] = useState("");

  const handleAddClick = () => {
    if (!skillInput.trim()) return;
    addSkill(skillInput.trim());
    setSkillInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddClick();
    }
  };

  return (
    <div className="space-y-3.5 mt-6 pt-6 border-t border-slate-100">
      <div className="ef-section-header" style={{ borderBottom: "none", marginBottom: 0, paddingBottom: 0 }}>
        <span className="ef-section-title">Skills</span>
      </div>

      <div className="flex gap-2">
        <input
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a skill and press Enter…"
          className="ef-input flex-1"
        />
        <button
          onClick={handleAddClick}
          className="ef-add-btn shrink-0"
          type="button"
        >
          <Plus className="w-3.5 h-3.5" />
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mt-1 min-h-[28px]">
        {(formData?.skills || []).length === 0 && (
          <p className="text-xs text-slate-400 italic">No skills added yet.</p>
        )}
        {(formData?.skills || []).map((skill, index) => (
          <div key={index} className="ef-skill-chip">
            <span>{skill}</span>
            <button
              onClick={() => removeSkill(index)}
              aria-label={`Remove ${skill}`}
              title="Remove"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsSection;