import React, { useEffect, useState } from "react";
import { listAnalyses, deleteAnalysis } from "../api/analyzeApi";
import ATSAnalysisModal from "../components/editor/ATSAnalysisModal";
import PremiumLoader from "../components/ui/PremiumLoader";
import { Trash2, FileText, Calendar, Compass, ShieldAlert, CheckSquare } from "lucide-react";
import { toast } from "sonner";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const data = await listAnalyses();
      setHistory(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load analysis history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDelete = async (id, e) => {
    e.stopPropagation(); // Avoid triggering open modal
    if (!window.confirm("Are you sure you want to delete this analysis record?")) return;

    try {
      await deleteAnalysis(id);
      setHistory(history.filter((item) => item.id !== id));
      toast.success("Analysis record deleted successfully.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete record.");
    }
  };

  const handleOpenModal = (item) => {
    // Map suggestions to recommendations for ATSAnalysisModal
    setSelectedAnalysis({
      score: item.score,
      weak_sections: item.feedback.weak_sections || [],
      missing_keywords: item.feedback.missing_keywords || [],
      recommendations: item.feedback.suggestions || [],
    });
    setModalOpen(true);
  };

  const getScoreColorClass = (score) => {
    if (score >= 75) return "text-emerald-500 border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/20";
    if (score >= 50) return "text-amber-500 border-amber-500/20 bg-amber-50/50 dark:bg-amber-950/20";
    return "text-rose-500 border-rose-500/20 bg-rose-50/50 dark:bg-rose-950/20";
  };

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto space-y-6 font-sans min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800/80 pb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">
            Analysis History
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Review all previously parsed resumes and ATS scorecards.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <PremiumLoader text="Loading history..." />
        </div>
      ) : history.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl shadow-xs">
          <FileText className="w-16 h-16 text-slate-350 dark:text-slate-600 mb-4" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No History Found</h3>
          <p className="text-sm text-slate-400 dark:text-slate-500 mt-1 max-w-md">
            You haven't analyzed any resumes yet. Head over to the ATS Analyzer page to parse your first PDF!
          </p>
        </div>
      ) : (
        /* Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenModal(item)}
              className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl p-5 hover:shadow-md hover:border-slate-350 dark:hover:border-slate-700 transition cursor-pointer relative overflow-hidden flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/45 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                      <FileText className="w-4 h-4" />
                    </span>
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      ATS SCAN
                    </span>
                  </div>
                  {/* Score badge */}
                  <span className={`text-sm font-extrabold px-2.5 py-1 rounded-lg border tabular-nums ${getScoreColorClass(item.score)}`}>
                    {item.score}% Match
                  </span>
                </div>

                {/* Job Description details */}
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 line-clamp-2 min-h-[2.8rem]" title={item.job_description || "General Analysis"}>
                    {item.job_description 
                      ? `Role: ${item.job_description}`
                      : "General Resume Analysis"}
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(item.created_at).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</span>
                  </div>
                </div>
              </div>

              {/* Stats overview footer */}
              <div className="border-t border-slate-100 dark:border-slate-800 mt-4 pt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-450">
                <div className="flex gap-3">
                  <span className="flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
                    {item.feedback?.missing_keywords?.length || 0} missing
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckSquare className="w-3.5 h-3.5 text-indigo-500" />
                    {item.feedback?.weak_sections?.length || 0} formatting
                  </span>
                </div>

                <button
                  onClick={(e) => handleDelete(item.id, e)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-650 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition"
                  title="Delete analysis record"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Report Modal */}
      {selectedAnalysis && (
        <ATSAnalysisModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedAnalysis(null);
          }}
          atsData={selectedAnalysis}
          loading={false}
          onRefresh={() => {}}
        />
      )}
    </div>
  );
}

export default History;
