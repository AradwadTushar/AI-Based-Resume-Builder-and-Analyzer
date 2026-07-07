import { Sparkles } from "lucide-react";

export default function SummarySection({ summary, onChange, onGenerate, loading }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="ef-section-title">Professional Summary</p>
          <p className="text-[11px] text-slate-400 mt-0.5">2–4 impactful sentences tailored to your target role.</p>
        </div>
        <button
          onClick={onGenerate}
          disabled={loading}
          className="ef-ai-btn"
          type="button"
        >
          <Sparkles className="w-3.5 h-3.5" />
          {loading ? "Generating..." : "AI Generate"}
        </button>
      </div>

      <textarea
        value={summary}
        onChange={(e) => onChange(e.target.value)}
        placeholder="A results-driven software engineer with 5+ years building scalable distributed systems at high-growth startups…"
        rows={5}
        className="ef-textarea"
        style={{ minHeight: "120px" }}
      />
    </div>
  );
}