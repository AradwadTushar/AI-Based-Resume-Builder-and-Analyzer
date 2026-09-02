import React, { useState, useEffect } from "react";
import { Sparkles, Check, X, ArrowRight, Edit3, Copy } from "lucide-react";

export default function DiffSuggestionModal({
  isOpen,
  onClose,
  title = "AI Suggestion Review",
  originalText = "",
  suggestedText = "",
  onAccept,
}) {
  const [editedSuggestion, setEditedSuggestion] = useState(suggestedText);
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setEditedSuggestion(suggestedText);
    setIsEditing(false);
  }, [suggestedText, isOpen]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(editedSuggestion);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApply = () => {
    onAccept(editedSuggestion);
    onClose();
  };

  const wordCount = (str) =>
    str ? str.trim().split(/\s+/).filter(Boolean).length : 0;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                {title}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Compare your original content with the AI-optimized version before applying.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Side-by-Side Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 overflow-y-auto flex-1 bg-slate-50 dark:bg-slate-950/50">
          {/* Left: Original */}
          <div className="flex flex-col bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-2xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Original (Current)
                </span>
              </div>
              <span className="text-[11px] text-slate-400">
                {wordCount(originalText)} words
              </span>
            </div>

            <div className="flex-1 text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans whitespace-pre-wrap p-2 rounded-lg bg-slate-50 dark:bg-slate-950/40 min-h-[160px]">
              {originalText ? (
                originalText
              ) : (
                <span className="text-slate-400 italic">
                  (Field was previously empty)
                </span>
              )}
            </div>
          </div>

          {/* Right: AI Suggestion */}
          <div className="flex flex-col bg-white dark:bg-slate-900 rounded-xl p-4 border border-indigo-200 dark:border-indigo-900/50 shadow-2xs relative ring-1 ring-indigo-500/20">
            <div className="flex items-center justify-between pb-2 border-b border-indigo-100 dark:border-indigo-950 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
                  AI Enhanced
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-400">
                  {wordCount(editedSuggestion)} words
                </span>
                <button
                  type="button"
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-medium"
                >
                  <Edit3 className="w-3 h-3" />
                  {isEditing ? "Done" : "Tweak"}
                </button>
              </div>
            </div>

            <div className="flex-1 min-h-[160px]">
              {isEditing ? (
                <textarea
                  value={editedSuggestion}
                  onChange={(e) => setEditedSuggestion(e.target.value)}
                  className="w-full h-full min-h-[160px] p-2 text-sm text-slate-800 dark:text-slate-200 bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-300 dark:border-indigo-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  rows={6}
                />
              ) : (
                <div className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-sans whitespace-pre-wrap p-2 rounded-lg bg-indigo-50/30 dark:bg-indigo-950/20 min-h-[160px]">
                  {editedSuggestion}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-500 font-medium">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy AI text</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              Keep Original
            </button>

            <button
              type="button"
              onClick={handleApply}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 transition"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Accept & Apply</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
