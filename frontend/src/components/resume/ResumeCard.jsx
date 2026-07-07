import React from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Trash2, FileText } from "lucide-react";

function ResumeCard({ id, title, updatedAt, onDelete }) {
  const navigate = useNavigate();

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div
      onClick={() => navigate(`/resume/${id}`)}
      className="glass-card rounded-xl border border-slate-200 dark:border-slate-800 p-5 cursor-pointer flex flex-col justify-between min-h-[140px] relative group bg-white dark:bg-slate-900/50"
    >
      <div className="space-y-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <FileText className="text-indigo-500 w-5 h-5" />
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition truncate max-w-[180px]">
              {title || "Untitled Resume"}
            </h3>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-1.5 rounded-lg text-slate-400 dark:text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition opacity-0 group-hover:opacity-100"
            title="Delete Resume"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
          <Clock className="w-3.5 h-3.5" />
          <span>Updated {formatDate(updatedAt)}</span>
        </div>
      </div>
      
      <div className="mt-4 text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
        Edit Resume &rarr;
      </div>
    </div>
  );
}

export default ResumeCard;