import { useEffect, useRef } from "react";
import PremiumLoader from "../ui/PremiumLoader";
import { 
  AlertTriangle, 
  Search, 
  Lightbulb, 
  FileText, 
  Sparkles, 
  X,
  RefreshCw 
} from "lucide-react";

export default function ATSAnalysisModal({ isOpen, onClose, atsData, loading, onRefresh }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const scoreColor =
    !atsData ? "text-slate-400" :
    atsData.score >= 75 ? "text-emerald-500" :
    atsData.score >= 50 ? "text-amber-500" : "text-rose-500";

  const scoreBg =
    !atsData ? "bg-slate-100 dark:bg-slate-800" :
    atsData.score >= 75 ? "bg-emerald-500/10 border-emerald-500/30" :
    atsData.score >= 50 ? "bg-amber-500/10 border-amber-500/30" : "bg-rose-500/10 border-rose-500/30";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={modalRef}
        className="bg-white dark:bg-slate-950 rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">ATS Analysis</h2>
              <p className="text-xs text-slate-400">Applicant Tracking System Compatibility</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onRefresh}
              disabled={loading}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">
          {loading ? (
            <PremiumLoader text="Analyzing ATS compatibility and section weighting..." />
          ) : atsData ? (
            <>
              {/* Score */}
              <div className={`rounded-xl p-4 border ${scoreBg} flex items-center gap-4`}>
                <span className={`text-5xl font-black tabular-nums ${scoreColor}`}>
                  {atsData.score}
                </span>
                <div className="flex-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">ATS Readiness Score</p>
                  <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5 font-medium">
                    {atsData.score >= 75 ? "Strong match — well optimized for recruiting filters" :
                     atsData.score >= 50 ? "Moderate — some improvements needed to pass screeners" :
                     "Needs work — significant formatting and keyword gaps found"}
                  </p>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 mt-3 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        atsData.score >= 75
                          ? "bg-emerald-500"
                          : atsData.score >= 50
                          ? "bg-amber-500"
                          : "bg-rose-500"
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
                <Section 
                  title="Weak Sections" 
                  icon={<AlertTriangle className="w-4 h-4 text-amber-400" />}
                >
                  <ul className="space-y-1.5">
                    {atsData.weak_sections.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </Section>
              )}

              {/* Missing Keywords */}
              {atsData.missing_keywords?.length > 0 && (
                <Section 
                  title="Missing Keywords" 
                  icon={<Search className="w-4 h-4 text-cyan-400" />}
                >
                  <div className="flex flex-wrap gap-1.5">
                    {atsData.missing_keywords.map((kw, i) => (
                      <span key={i} className="px-2.5 py-1 text-xs font-semibold bg-rose-500/10 text-rose-300 rounded-md border border-rose-500/30">
                        {kw}
                      </span>
                    ))}
                  </div>
                </Section>
              )}

              {/* Recommendations */}
              {atsData.recommendations?.length > 0 && (
                <Section 
                  title="Recommendations" 
                  icon={<Lightbulb className="w-4 h-4 text-purple-400" />}
                >
                  <ul className="space-y-2">
                    {atsData.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                        <span className="shrink-0 w-4 h-4 rounded-full bg-purple-500/20 text-purple-300 text-[10px] flex items-center justify-center font-bold mt-0.5">
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
              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400">
                <FileText className="w-6 h-6" />
              </div>
              <p className="text-xs text-slate-400">No analysis yet. Click Refresh to start.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Section({ title, icon, children }) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center gap-2">
        <span>{icon}</span>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</h3>
      </div>
      {children}
    </div>
  );
}