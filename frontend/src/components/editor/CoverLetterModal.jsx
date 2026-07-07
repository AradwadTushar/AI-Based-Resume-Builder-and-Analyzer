import React, { useState } from "react";
import { generateCoverLetter } from "../../api/aiApi";
import PremiumLoader from "../ui/PremiumLoader";
import { Sparkles, Copy, Check, FileText } from "lucide-react";
import { toast } from "sonner";

export default function CoverLetterModal({
  isOpen,
  onClose,
  formData,
  jobDescription,
  setJobDescription,
}) {
  const [loading, setLoading] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!jobDescription.trim()) {
      toast.error("Please paste a job description first.");
      return;
    }

    try {
      setLoading(true);
      const res = await generateCoverLetter({
        resume_data: formData,
        job_description: jobDescription,
      });
      setCoverLetter(res.cover_letter);
      toast.success("Cover letter generated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate cover letter.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(coverLetter);
    setCopied(true);
    toast.success("Cover letter copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backdropFilter: "blur(8px)", backgroundColor: "rgba(0,0,0,0.4)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-100 dark:border-slate-800"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">AI Cover Letter</h2>
              <p className="text-xs text-slate-400 dark:text-slate-500">Generate a tailored cover letter using Gemini</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-slate-650 dark:hover:text-slate-350 transition"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-4">
          {!coverLetter && !loading && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Target Job Description
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={6}
                  placeholder="Paste the job description of the role you're applying to..."
                  className="w-full border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm text-slate-700 dark:text-slate-200 placeholder-slate-300 dark:placeholder-slate-600 bg-white dark:bg-slate-950 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={!jobDescription.trim()}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:text-slate-400 text-white text-sm font-semibold py-2.5 rounded-xl transition flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Generate Cover Letter
              </button>
            </div>
          )}

          {loading && (
            <div className="py-12 flex items-center justify-center">
              <PremiumLoader text="Drafting cover letter with Gemini..." />
            </div>
          )}

          {coverLetter && !loading && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-indigo-500" />
                  Your Cover Letter
                </span>
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-455" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>

              <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-950/30 overflow-y-auto max-h-[350px]">
                <pre className="text-xs text-slate-750 dark:text-slate-300 font-sans whitespace-pre-wrap leading-relaxed">
                  {coverLetter}
                </pre>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setCoverLetter("")}
                  className="flex-1 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-semibold py-2 rounded-xl transition"
                >
                  Edit Input
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-2 rounded-xl transition"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
