import React, { useState, useEffect } from "react";
import { 
  ArrowUp, 
  ArrowDown, 
  RotateCcw, 
  Check, 
  X, 
  Layers,
  FileText,
  Briefcase,
  FolderGit2,
  GraduationCap,
  Cpu,
  Award
} from "lucide-react";

export const DEFAULT_SECTION_ORDER = [
  "summary",
  "experience",
  "projects",
  "education",
  "skills",
  "certifications",
];

export const SECTION_METADATA = {
  summary: { label: "Professional Summary", icon: FileText },
  experience: { label: "Work Experience", icon: Briefcase },
  projects: { label: "Projects & Portfolio", icon: FolderGit2 },
  education: { label: "Education & Degrees", icon: GraduationCap },
  skills: { label: "Skills & Proficiencies", icon: Cpu },
  certifications: { label: "Licenses & Certifications", icon: Award },
};

export default function SectionOrderModal({
  isOpen,
  onClose,
  currentOrder = DEFAULT_SECTION_ORDER,
  onSave,
}) {
  const [order, setOrder] = useState(DEFAULT_SECTION_ORDER);

  useEffect(() => {
    if (currentOrder && currentOrder.length > 0) {
      // Ensure all sections are present in order
      const merged = [
        ...currentOrder.filter((key) => DEFAULT_SECTION_ORDER.includes(key)),
        ...DEFAULT_SECTION_ORDER.filter((key) => !currentOrder.includes(key)),
      ];
      setOrder(merged);
    } else {
      setOrder(DEFAULT_SECTION_ORDER);
    }
  }, [currentOrder, isOpen]);

  if (!isOpen) return null;

  const moveItem = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= order.length) return;

    const newOrder = [...order];
    const [moved] = newOrder.splice(index, 1);
    newOrder.splice(targetIndex, 0, moved);
    setOrder(newOrder);
  };

  const handleReset = () => {
    setOrder(DEFAULT_SECTION_ORDER);
  };

  const handleApply = () => {
    onSave(order);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Reorder Resume Sections
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
            Adjust the vertical sequence of sections on your resume. Contact information will always stay at the top.
          </p>

          <div className="space-y-2">
            {order.map((key, index) => {
              const meta = SECTION_METADATA[key] || { label: key, icon: FileText };
              const IconComponent = meta.icon;
              return (
                <div
                  key={key}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40 hover:border-cyan-500/40 dark:hover:border-cyan-500/40 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center justify-center">
                      {index + 1}
                    </span>
                    <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {meta.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => moveItem(index, -1)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-200 dark:hover:bg-slate-800 disabled:opacity-30 transition"
                      title="Move up"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={index === order.length - 1}
                      onClick={() => moveItem(index, 1)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-200 dark:hover:bg-slate-800 disabled:opacity-30 transition"
                      title="Move down"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Default</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition shadow-md shadow-indigo-600/20"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Apply Order</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
