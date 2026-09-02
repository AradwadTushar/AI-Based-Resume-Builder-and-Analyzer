import { useState, useEffect, useRef } from "react";
import PremiumLoader from "../ui/PremiumLoader";
import { Check, Copy, Plus, Sparkles, AlertCircle, Layers } from "lucide-react";

export default function JDMatchModal({
  isOpen,
  onClose,
  jobDescription,
  setJobDescription,
  handleJDMatch,
  jdLoading,
  jdAnalysis,
}) {
  const textareaRef = useRef(null);
  const [copiedKeyword, setCopiedKeyword] = useState(null);

  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();
    if (isOpen) {
      document.addEventListener("keydown", handleKey);
      setTimeout(() => textareaRef.current?.focus(), 50);
    }
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  const handleCopySkill = async (keyword) => {
    try {
      await navigator.clipboard.writeText(keyword);
      setCopiedKeyword(keyword);
      setTimeout(() => setCopiedKeyword(null), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  if (!isOpen) return null;

  const scoreColor =
    !jdAnalysis ? "text-gray-400" :
    jdAnalysis.match_score >= 75 ? "text-emerald-500" :
    jdAnalysis.match_score >= 50 ? "text-amber-500" : "text-rose-500";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden border border-gray-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
                Job Description Matcher
              </h2>
              <p className="text-xs text-gray-400 dark:text-slate-400">
                Identify missing hard/soft skills & ATS keyword gaps
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-slate-200 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">
          {/* Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
              Paste Target Job Description (JD)
            </label>
            <textarea
              ref={textareaRef}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={4}
              placeholder="Paste the requirements, qualifications, or full job posting here..."
              className="w-full border border-gray-200 dark:border-slate-800 rounded-xl p-3 text-sm text-gray-800 dark:text-slate-200 placeholder-gray-400 dark:placeholder-slate-500 bg-white dark:bg-slate-950 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          <button
            onClick={handleJDMatch}
            disabled={jdLoading || !jobDescription.trim()}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-200 dark:disabled:bg-slate-800 disabled:text-gray-400 dark:disabled:text-slate-600 text-white text-sm font-bold py-2.5 rounded-xl transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            {jdLoading ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Analyzing Compatibility...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Run JD Compatibility Scan
              </>
            )}
          </button>

          {jdLoading && (
            <PremiumLoader text="Extracting key competencies and matching with your resume..." />
          )}

          {/* Results */}
          {!jdLoading && jdAnalysis && (
            <div className="space-y-5 pt-2">
              {/* Scorecard */}
              <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200/60 dark:border-slate-800">
                <span className={`text-5xl font-black tabular-nums ${scoreColor}`}>
                  {jdAnalysis.match_score}%
                </span>
                <div>
                  <p className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                    ATS Match Score
                  </p>
                  <p className="text-xs text-gray-700 dark:text-slate-300 mt-0.5 font-medium">
                    {jdAnalysis.match_score >= 75
                      ? "High match — your skills align closely with this job posting!"
                      : jdAnalysis.match_score >= 50
                      ? "Moderate match — address the missing keywords below to boost visibility."
                      : "Low match — substantial skills gap detected for this position."}
                  </p>
                </div>
              </div>

              {/* Hard Skills */}
              {jdAnalysis.hard_skills?.length > 0 && (
                <SkillSection
                  title="Required Hard Skills & Technologies"
                  icon="⚡"
                  keywords={jdAnalysis.hard_skills}
                  chipClass="bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-900/40"
                  copiedKeyword={copiedKeyword}
                  onCopy={handleCopySkill}
                />
              )}

              {/* Soft Skills */}
              {jdAnalysis.soft_skills?.length > 0 && (
                <SkillSection
                  title="Soft Skills & Working Style"
                  icon="🤝"
                  keywords={jdAnalysis.soft_skills}
                  chipClass="bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-900/40"
                  copiedKeyword={copiedKeyword}
                  onCopy={handleCopySkill}
                />
              )}

              {/* Missing Keywords */}
              {jdAnalysis.missing_keywords?.length > 0 && (
                <SkillSection
                  title="Missing Keywords (Not found in your draft)"
                  icon="✗"
                  keywords={jdAnalysis.missing_keywords}
                  chipClass="bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-900/40 hover:bg-rose-100"
                  copiedKeyword={copiedKeyword}
                  onCopy={handleCopySkill}
                />
              )}

              {/* Matched Keywords */}
              {jdAnalysis.matched_keywords?.length > 0 && (
                <SkillSection
                  title="Matched Keywords (Present in your resume)"
                  icon="✓"
                  keywords={jdAnalysis.matched_keywords}
                  chipClass="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/40"
                  copiedKeyword={copiedKeyword}
                  onCopy={handleCopySkill}
                />
              )}

              {/* Recommendations */}
              {jdAnalysis.recommendations?.length > 0 && (
                <div className="space-y-2.5">
                  <h3 className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span>💡</span>
                    <span>Targeted Recommendations</span>
                  </h3>
                  <ul className="space-y-1.5">
                    {jdAnalysis.recommendations.map((rec, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-xs text-gray-700 dark:text-slate-300 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/80"
                      >
                        <span className="flex-shrink-0 w-4 h-4 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-[10px] flex items-center justify-center font-bold mt-0.5">
                          {i + 1}
                        </span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SkillSection({ title, icon, keywords, chipClass, copiedKeyword, onCopy }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-gray-600 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <span>{icon}</span>
          <span>{title}</span>
        </h3>
        <span className="text-[11px] text-gray-400 font-medium">
          {keywords.length} items (click to copy)
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {keywords.map((kw, i) => {
          const isCopied = copiedKeyword === kw;
          return (
            <button
              key={i}
              type="button"
              onClick={() => onCopy(kw)}
              className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg border transition-all cursor-pointer ${chipClass} ${
                isCopied ? "ring-2 ring-indigo-500 scale-105" : ""
              }`}
              title="Click to copy skill to clipboard"
            >
              <span>{kw}</span>
              {isCopied ? (
                <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <Copy className="w-2.5 h-2.5 opacity-60 hover:opacity-100" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}