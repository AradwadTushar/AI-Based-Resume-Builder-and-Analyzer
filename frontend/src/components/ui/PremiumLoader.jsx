import React from "react";
import { Sparkles } from "lucide-react";

function PremiumLoader({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4 select-none">
      <div className="relative w-16 h-16 flex items-center justify-center">
        {/* Glow rings */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-emerald-400 opacity-25 blur-md animate-pulse" />
        <div className="absolute inset-0.5 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-emerald-400 animate-spin" style={{ animationDuration: '3s' }} />
        {/* Inner core */}
        <div className="absolute inset-2 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center border border-slate-100 dark:border-slate-800 shadow-sm">
          <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400 animate-pulse" />
        </div>
      </div>
      {text && (
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
}

export default PremiumLoader;
