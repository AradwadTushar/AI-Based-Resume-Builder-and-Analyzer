import { useEffect, useRef } from "react";
import PremiumLoader from "../ui/PremiumLoader";

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

  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();
    if (isOpen) {
      document.addEventListener("keydown", handleKey);
      setTimeout(() => textareaRef.current?.focus(), 50);
    }
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const scoreColor =
    !jdAnalysis ? "text-gray-400" :
    jdAnalysis.match_score >= 75 ? "text-emerald-500" :
    jdAnalysis.match_score >= 50 ? "text-amber-500" : "text-red-500";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backdropFilter: "blur(8px)", backgroundColor: "rgba(0,0,0,0.4)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden border border-gray-100 dark:border-slate-800"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gray-900 dark:bg-slate-950 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="2" width="5" height="5" rx="1" stroke="white" strokeWidth="1.5"/>
                <rect x="9" y="2" width="5" height="5" rx="1" stroke="white" strokeWidth="1.5"/>
                <rect x="2" y="9" width="5" height="5" rx="1" stroke="white" strokeWidth="1.5"/>
                <path d="M9 11.5h5M11.5 9v5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">JD Match</h2>
              <p className="text-xs text-gray-400 dark:text-slate-500">Job Description Compatibility</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 flex items-center justify-center text-gray-400 dark:text-slate-550 hover:text-gray-600 dark:hover:text-slate-350 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">
          {/* Input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
              Job Description
            </label>
            <textarea
              ref={textareaRef}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={5}
              placeholder="Paste the job description here..."
              className="w-full border border-gray-200 dark:border-slate-800 rounded-xl p-3 text-sm text-gray-700 dark:text-slate-200 placeholder-gray-300 dark:placeholder-slate-650 bg-white dark:bg-slate-950 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
            />
          </div>

          <button
            onClick={handleJDMatch}
            disabled={jdLoading || !jobDescription.trim()}
            className="w-full bg-gray-900 dark:bg-indigo-650 hover:bg-gray-800 dark:hover:bg-indigo-700 disabled:bg-gray-200 dark:disabled:bg-slate-800 disabled:text-gray-400 dark:disabled:text-slate-600 text-white text-sm font-medium py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {jdLoading ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M10 10l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Analyze Match
              </>
            )}
          </button>

          {jdLoading && (
            <PremiumLoader text="Matching with job description..." />
          )}

          {/* Results */}
          {!jdLoading && jdAnalysis && (
            <div className="space-y-5 pt-1">
              <div className="h-px bg-gray-100 dark:bg-slate-800" />

              {/* Score */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-slate-950/40 rounded-xl">
                <span className={`text-5xl font-bold tabular-nums ${scoreColor}`}>
                  {jdAnalysis.match_score}%
                </span>
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Match Score</p>
                  <p className="text-sm text-gray-650 dark:text-slate-300 mt-0.5">
                    {jdAnalysis.match_score >= 75 ? "Excellent fit for this role" :
                     jdAnalysis.match_score >= 50 ? "Partial match — gaps to address" :
                     "Low match — significant gaps"}
                  </p>
                </div>
              </div>

              {/* Matched Keywords */}
              {jdAnalysis.matched_keywords?.length > 0 && (
                <KeywordSection
                  title="Matched Keywords"
                  icon="✓"
                  keywords={jdAnalysis.matched_keywords}
                  chipClass="bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-405 border-emerald-100 dark:border-emerald-900/30"
                />
              )}

              {/* Missing Keywords */}
              {jdAnalysis.missing_keywords?.length > 0 && (
                <KeywordSection
                  title="Missing Keywords"
                  icon="✗"
                  keywords={jdAnalysis.missing_keywords}
                  chipClass="bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border-red-100 dark:border-red-900/30"
                />
              )}

              {/* Recommendations */}
              {jdAnalysis.recommendations?.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">💡</span>
                    <h3 className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Recommendations</h3>
                  </div>
                  <ul className="space-y-2">
                    {jdAnalysis.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-gray-650 dark:text-slate-300">
                        <span className="flex-shrink-0 w-4 h-4 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400 text-[10px] flex items-center justify-center font-bold mt-0.5">
                          {i + 1}
                        </span>
                        {rec}
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

function KeywordSection({ title, icon, keywords, chipClass }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold">{icon}</span>
        <h3 className="text-xs font-semibold text-gray-500 dark:text-slate-450 uppercase tracking-wider">{title}</h3>
        <span className="text-xs text-gray-400 dark:text-slate-550 ml-auto">{keywords.length}</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {keywords.map((kw, i) => (
          <span key={i} className={`px-2.5 py-1 text-xs font-medium rounded-md border ${chipClass}`}>
            {kw}
          </span>
        ))}
      </div>
    </div>
  );
}