import React from "react";
import { FolderPlus } from "lucide-react";

function EmptyState({ onCreate }) {
  return (
    <div
      className="
        border border-dashed border-slate-300 dark:border-slate-800
        rounded-xl
        p-12
        flex
        flex-col
        items-center
        justify-center
        text-center
        bg-white/50 dark:bg-slate-900/40 backdrop-blur-xs
        min-h-[250px]
        space-y-4
      "
    >
      <div className="p-3.5 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/50 rounded-full text-indigo-500 dark:text-indigo-400 shadow-sm">
        <FolderPlus className="w-6 h-6 animate-pulse" />
      </div>

      <div className="space-y-1">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">No Resumes Yet</h3>
        <p className="text-slate-500 dark:text-slate-400 text-xs max-w-xs leading-relaxed">
          Get started by creating your first profession-adaptive, AI-optimized resume.
        </p>
      </div>

      <button
        onClick={onCreate}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-5 rounded-lg text-xs transition shadow-sm hover:shadow-md"
      >
        Create Resume
      </button>
    </div>
  );
}

export default EmptyState;