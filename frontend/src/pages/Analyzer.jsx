import React, { useState, useRef } from "react";
import { 
  UploadCloud, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  CheckCircle2,
  Lightbulb,
  ArrowRight, 
  Sparkles, 
  RefreshCw 
} from "lucide-react";
import PremiumLoader from "../components/ui/PremiumLoader";
import { analyzeResume } from "@/api/analyzeApi";
import { toast } from "sonner";

function Analyzer() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const fileInputRef = useRef(null);

  // Custom Drag and Drop Handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile);
      } else {
        toast.error("Please upload a PDF file only.");
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
      } else {
        toast.error("Please upload a PDF file only.");
      }
    }
  };

  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please upload a resume PDF first.");
      return;
    }

    try {
      setLoading(true);
      setResult(null);
      const data = await analyzeResume(file, jobDescription);
      setResult(data);
      toast.success("Resume analysis complete!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.detail || "Failed to analyze resume.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setJobDescription("");
    setResult(null);
  };

  // Color helper for Score Ring
  const getScoreColor = (score) => {
    if (score >= 75) return "stroke-emerald-500 text-emerald-500";
    if (score >= 50) return "stroke-amber-500 text-amber-500";
    return "stroke-rose-500 text-rose-500";
  };

  const getScoreBgColor = (score) => {
    if (score >= 75) return "bg-emerald-50 text-emerald-800 border-emerald-200";
    if (score >= 50) return "bg-amber-50 text-amber-800 border-amber-200";
    return "bg-rose-50 text-rose-800 border-rose-200";
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 font-sans select-none">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="text-indigo-600 w-8 h-8" />
          ATS Resume Analyzer
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-base">
          Upload any existing resume PDF to get an instant ATS optimization score, keyword check, and recommended rewrites.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: UPLOAD & INPUT */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800/80 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Resume & Target Role</h2>

          <form onSubmit={handleAnalyze} className="space-y-6">
            {/* Custom Drag Drop Zone */}
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={!file ? onButtonClick : undefined}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
                dragActive 
                  ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30" 
                  : "border-slate-300 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 bg-slate-50/50 dark:bg-slate-950/20"
              } ${file ? "cursor-default" : ""}`}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="application/pdf"
                onChange={handleFileChange}
              />

              {!file ? (
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm text-slate-400">
                    <UploadCloud className="w-6 h-6 text-indigo-500 dark:text-indigo-450" />
                  </div>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-350">Drag and drop your resume PDF here</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">or click to browse files (PDF only)</p>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-3 shadow-xs">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-rose-500" />
                    <div className="text-left">
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[200px]">
                        {file.name}
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                    }}
                    className="text-xs font-semibold text-rose-500 hover:text-rose-700 transition"
                  >
                    Change
                  </button>
                </div>
              )}
            </div>

            {/* Job Description Form Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Job Description (Optional)
              </label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the target job description here to compare keywords, match requirements, and get customized recommendations..."
                className="border border-slate-300 dark:border-slate-800 p-3 rounded-lg bg-white dark:bg-slate-950 w-full text-sm font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-500 focus:border-blue-500 dark:focus:border-indigo-500 transition shadow-sm h-36 resize-none"
              />
            </div>

            <div className="flex gap-3">
              {result && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 border border-slate-300 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold py-2.5 px-4 rounded-lg text-sm transition"
                >
                  Clear
                </button>
              )}
              <button
                type="submit"
                disabled={loading || !file}
                className="flex-3 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-lg text-sm transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <RefreshCw className="animate-spin w-4 h-4" />
                    Parsing & Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Analyze Resume
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN: RESULTS PANEL */}
        <div className="lg:col-span-7 space-y-6">
          {/* Skeleton loading state */}
          {loading && (
            <div className="bg-white dark:bg-slate-900 p-12 rounded-xl border border-slate-200 dark:border-slate-800/80 shadow-sm flex items-center justify-center min-h-[300px]">
              <PremiumLoader text="Scanning and analyzing resume..." />
            </div>
          )}

          {/* Initial empty state */}
          {!loading && !result && (
            <div className="bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 border-dashed rounded-xl p-12 text-center flex flex-col items-center justify-center space-y-3 min-h-[400px]">
              <FileText className="w-12 h-12 text-slate-400 dark:text-slate-500" />
              <h3 className="font-bold text-slate-700 dark:text-slate-200 text-lg">Awaiting Resume Upload</h3>
              <p className="text-slate-400 dark:text-slate-500 text-sm max-w-sm">
                Once you select your resume and click analyze, a complete ATS scorecard and list of missing skills will populate here.
              </p>
            </div>
          )}

          {/* Rendered Results */}
          {!loading && result && (
            <div className="space-y-6">
              {/* Score & Badge Card */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800/80 shadow-sm flex flex-col sm:flex-row items-center gap-6">
                {/* SVG Progress Circle */}
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      className="stroke-slate-100 dark:stroke-slate-800 fill-none"
                      strokeWidth="10"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      className={`fill-none transition-all duration-1000 ${getScoreColor(result.score)}`}
                      strokeWidth="10"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - result.score / 100)}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-2xl font-black text-slate-800 dark:text-white">
                    {result.score}
                  </span>
                </div>

                <div className="text-center sm:text-left space-y-1.5 flex-1">
                  <div className="flex items-center flex-wrap justify-center sm:justify-start gap-2">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Overall ATS Score</h3>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${getScoreBgColor(result.score)}`}>
                      {result.score >= 75 ? "Excellent" : result.score >= 50 ? "Needs Improvement" : "Weak"}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    This score is based on formatting consistency, expected keywords, experience phrasing, and overall professional layout.
                  </p>
                </div>
              </div>

              {/* Missing Keywords */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800/80 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-md flex items-center gap-2">
                  <AlertTriangle className="text-rose-500 w-5 h-5" />
                  Missing Critical Keywords & Skills
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  ATS parsers filter candidates heavily based on these skills. Consider adding them to your skills or experience descriptions:
                </p>
                {result.feedback.missing_keywords?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {result.feedback.missing_keywords.map((kw, i) => (
                      <span
                        key={i}
                        className="bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-450 border border-rose-100 dark:border-rose-900/30 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        + {kw}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4" />
                    No missing keywords detected! Your resume aligns very well.
                  </p>
                )}
              </div>

              {/* Suggested Rewrites */}
              {result.feedback.rewrites?.length > 0 && (
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800/80 shadow-sm space-y-4">
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 text-md flex items-center gap-2">
                    <Sparkles className="text-indigo-500 w-5 h-5" />
                    Suggested Phrasing & Rewrites
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Replace generic phrasing with metrics-driven accomplishments. This significantly improves scoring inside modern ATS platforms:
                  </p>

                  <div className="space-y-4">
                    {result.feedback.rewrites.map((rw, i) => (
                      <div key={i} className="border border-slate-200 dark:border-slate-800 rounded-lg p-4 bg-slate-50/50 dark:bg-slate-950/30 space-y-3">
                        <div>
                          <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider block mb-1">
                            Before (Original Phrasing)
                          </span>
                          <p className="text-sm text-slate-600 dark:text-slate-400 line-through bg-rose-50/30 dark:bg-rose-950/20 p-2 rounded border border-rose-100/50 dark:border-rose-900/30">
                            {rw.original}
                          </p>
                        </div>
                        <div className="flex justify-center text-slate-400 dark:text-slate-600">
                          <ArrowRight className="w-4 h-4 transform rotate-90 sm:rotate-0" />
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider block mb-1">
                            After (ATS-Optimized Phrasing)
                          </span>
                          <p className="text-sm text-slate-800 dark:text-slate-200 font-medium bg-emerald-50/30 dark:bg-emerald-950/20 p-2 rounded border border-emerald-100/50 dark:border-emerald-900/30">
                            {rw.improved}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Weak Sections & Suggestions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Weak Sections */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800/80 shadow-sm space-y-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Formatting & Section Gaps</h4>
                  </div>
                  {result.feedback.weak_sections?.length > 0 ? (
                    <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-350">
                      {result.feedback.weak_sections.map((ws, i) => (
                        <li key={i} className="flex gap-2 items-start">
                          <span className="text-rose-500 font-bold">•</span>
                          <span>{ws}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">No layout or formatting gaps found.</p>
                  )}
                </div>

                {/* Suggestions */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800/80 shadow-sm space-y-3">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-purple-400" />
                    <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Actionable Suggestions</h4>
                  </div>
                  {result.feedback.suggestions?.length > 0 ? (
                    <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-350">
                      {result.feedback.suggestions.map((sug, i) => (
                        <li key={i} className="flex gap-2 items-start">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                          <span>{sug}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Your resume is fully optimized.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Analyzer;