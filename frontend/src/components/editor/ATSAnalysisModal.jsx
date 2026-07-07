import { useEffect, useRef } from "react";
import PremiumLoader from "../ui/PremiumLoader";

export default function ATSAnalysisModal({ isOpen, onClose, atsData, loading, onRefresh }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const scoreColor =
    !atsData ? "text-gray-400" :
    atsData.score >= 75 ? "text-emerald-500" :
    atsData.score >= 50 ? "text-amber-500" : "text-red-500";

  const scoreBg =
    !atsData ? "bg-gray-100 dark:bg-slate-800" :
    atsData.score >= 75 ? "bg-emerald-50 dark:bg-emerald-950/20" :
    atsData.score >= 50 ? "bg-amber-50 dark:bg-amber-950/20" : "bg-red-50 dark:bg-red-950/20";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backdropFilter: "blur(8px)", backgroundColor: "rgba(0,0,0,0.4)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={modalRef}
        className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col overflow-hidden border border-gray-100 dark:border-slate-800"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gray-900 dark:bg-slate-950 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 4h12M2 8h8M2 12h10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">ATS Analysis</h2>
              <p className="text-xs text-gray-400 dark:text-slate-500">Applicant Tracking Score</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onRefresh}
              disabled={loading}
              className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition disabled:opacity-50"
            >
              Refresh
            </button>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 flex items-center justify-center text-gray-400 hover:text-gray-650 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">
          {loading ? (
            <PremiumLoader text="Analyzing your resume..." />
          ) : atsData ? (
            <>
              {/* Score */}
              <div className={`rounded-xl p-4 ${scoreBg} flex items-center gap-4`}>
                <span className={`text-5xl font-bold tabular-nums ${scoreColor}`}>
                  {atsData.score}
                </span>
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">ATS Score</p>
                  <p className="text-sm text-gray-600 dark:text-slate-300 mt-0.5">
                    {atsData.score >= 75 ? "Strong match — well optimized" :
                     atsData.score >= 50 ? "Moderate — some improvements needed" :
                     "Needs work — significant gaps found"}
                  </p>
                  <div className="w-full bg-gray-100 dark:bg-slate-800 rounded-full h-2 mt-3 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        atsData.score >= 75
                          ? "bg-emerald-500"
                          : atsData.score >= 50
                          ? "bg-amber-500"
                          : "bg-red-500"
                      }`}
                      style={{
                        width: `${atsData.score}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Weak Sections */}
              {atsData.weak_sections?.length > 0 && (
                <Section title="Weak Sections" icon="⚠️">
                  <ul className="space-y-1.5">
                    {atsData.weak_sections.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-650 dark:text-slate-300">
                        <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </Section>
              )}

              {/* Missing Keywords */}
              {atsData.missing_keywords?.length > 0 && (
                <Section title="Missing Keywords" icon="🔍">
                  <div className="flex flex-wrap gap-1.5">
                    {atsData.missing_keywords.map((kw, i) => (
                      <span key={i} className="px-2.5 py-1 text-xs font-semibold bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 rounded-md border border-red-100 dark:border-red-900/30">
                        {kw}
                      </span>
                    ))}
                  </div>
                </Section>
              )}

              {/* Recommendations */}
              {atsData.recommendations?.length > 0 && (
                <Section title="Recommendations" icon="💡">
                  <ul className="space-y-2">
                    {atsData.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-gray-655 dark:text-slate-300">
                        <span className="flex-shrink-0 w-4 h-4 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400 text-[10px] flex items-center justify-center font-bold mt-0.5">
                          {i + 1}
                        </span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </Section>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
              <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-slate-855 flex items-center justify-center text-2xl">📄</div>
              <p className="text-sm text-gray-500 dark:text-slate-400">No analysis yet. Click the button to start.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Section({ title, icon, children }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-sm">{icon}</span>
        <h3 className="text-xs font-semibold text-gray-500 dark:text-slate-450 uppercase tracking-wider">{title}</h3>
      </div>
      {children}
    </div>
  );
}