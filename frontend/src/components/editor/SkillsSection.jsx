import { useState } from "react";

function SkillsSection({ formData, addSkill, removeSkill }) {
  const [skillInput, setSkillInput] = useState("");

  const handleAddClick = () => {
    if (!skillInput.trim()) return;
    addSkill(skillInput);
    setSkillInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddClick();
    }
  };

  return (
    <div className="space-y-2 mt-6 pt-6 border-t">
      <h3 className="font-semibold text-lg">Skills</h3>

      <div className="flex gap-2">
        <input
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add skill"
          className="border p-2 rounded w-full"
        />

        <button 
          onClick={handleAddClick} 
          className="border px-4 rounded bg-gray-50 hover:bg-gray-100 transition"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        {(formData?.skills || []).map((skill, index) => (
          <div
            key={index}
            className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
          >
            <span>{skill}</span>
            <button 
              onClick={() => removeSkill(index)}
              className="hover:text-red-500 font-bold"
              aria-label={`Remove ${skill}`}
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