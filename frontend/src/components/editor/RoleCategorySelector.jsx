import React from "react";

const ROLE_CATEGORIES = [
  { id: "software_engineering", label: "Software Engineering" },
  { id: "design", label: "UI/UX & Product Design" },
  { id: "education", label: "Education & Academic" },
  { id: "medical", label: "Healthcare & Clinical" },
  { id: "general", label: "General Professional & Corporate" }
];

function RoleCategorySelector({ selectedCategory, onChange }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-lg p-4 mb-6">
      <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
        Target Profession / Role Category
      </label>
      <select
        value={selectedCategory || "software_engineering"}
        onChange={(e) => onChange(e.target.value)}
        className="border border-slate-300 dark:border-slate-700 p-2.5 rounded bg-white dark:bg-slate-950 w-full text-sm font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
      >
        {ROLE_CATEGORIES.map((role) => (
          <option key={role.id} value={role.id} className="dark:bg-slate-950 dark:text-slate-200">
            {role.label}
          </option>
        ))}
      </select>
      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1.5">
        Choosing a category customizes your resume sections and terms for ATS optimization.
      </p>
    </div>
  );
}

export default RoleCategorySelector;
export { ROLE_CATEGORIES };
