import React, { useState } from "react";
import { RESUME_TEMPLATES } from "@/config/templates";
import { ChevronDown, Check } from "lucide-react";

function TemplateSelector({ selectedTemplate, onSelect }) {
  const [open, setOpen] = useState(false);
  const current = RESUME_TEMPLATES.find(t => t.id === selectedTemplate) || RESUME_TEMPLATES[0];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-200 transition shadow-xs w-44 justify-between"
      >
        <span className="truncate">{current.name}</span>
        <span className="flex items-center gap-1 text-slate-400 dark:text-slate-500 shrink-0">
          <span className="text-emerald-600 dark:text-emerald-450 font-bold">{current.atsScore}%</span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
        </span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute top-full mt-1 left-0 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-xl shadow-xl z-40 py-1 overflow-hidden">
            {RESUME_TEMPLATES.map((template) => (
              <button
                key={template.id}
                onClick={() => { onSelect(template.id); setOpen(false); }}
                className={`
                  w-full px-4 py-3 text-left flex items-start justify-between gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition
                  ${selectedTemplate === template.id ? "bg-indigo-50 dark:bg-indigo-950/20" : ""}
                `}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{template.name}</p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 truncate">{template.description}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    template.atsScore >= 95 
                      ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400" 
                      : template.atsScore >= 90 
                      ? "bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400" 
                      : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                  }`}>
                    {template.atsScore}%
                  </span>
                  {selectedTemplate === template.id && <Check className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />}
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default TemplateSelector;