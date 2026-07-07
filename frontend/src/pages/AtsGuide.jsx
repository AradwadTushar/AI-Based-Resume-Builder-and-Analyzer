import React from "react";
import { 
  FileText, 
  HelpCircle, 
  ListChecks, 
  TrendingUp, 
  Sparkles,
  ArrowRight
} from "lucide-react";

function AtsGuide() {
  const formattingRules = [
    { rule: "Use Single-Column Layouts", desc: "Multi-column layouts confuse older ATS parsers, which often merge text from left and right columns incorrectly." },
    { rule: "Avoid Text Inside Images & Graphics", desc: "ATS algorithms cannot read text within graphics, charts, or icons. Keep all credentials in clean text." },
    { rule: "Use Standard Section Headings", desc: "Label sections clearly: 'Experience', 'Education', 'Skills'. Unorthodox headers like 'My Journey' get ignored." },
    { rule: "Save as Plain PDF or DOCX", desc: "Always export to PDF (with selectable text) or standard word formats. Avoid scanning paper resumes into image-PDFs." }
  ];

  const powerVerbs = [
    { weak: "Helped build a web app features", strong: "Engineered responsive frontend modules using React, improving page load speeds by 25%." },
    { weak: "Responsible for fixing database issues", strong: "Optimized SQL index queries, reducing backend database load latency by 40%." },
    { weak: "Worked on customer support tickets", strong: "Resolved 50+ weekly client technical requests, achieving a 98% satisfaction rating." },
    { weak: "Wrote the team documentation pages", strong: "Authored centralized developer onboarding wikis, reducing setup time for new hires by 3 days." }
  ];

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 font-sans select-none">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <TrendingUp className="text-indigo-600 w-8 h-8" />
          ATS Secrets & Optimization Guide
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-base">
          Learn how Applicant Tracking Systems parse your documents, and use these formatting rules and power verbs to beat the filter.
        </p>
      </div>

      <div className="space-y-8">
        {/* SECTION 1: FORMATTING RULES */}
        <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <ListChecks className="text-indigo-600 w-5 h-5" />
            The Golden Rules of ATS Formatting
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formattingRules.map((item, idx) => (
              <div key={idx} className="border border-slate-100 dark:border-slate-800/80 p-4 rounded-lg bg-slate-50/50 dark:bg-slate-950/30 hover:bg-white dark:hover:bg-slate-900 transition hover:shadow-xs">
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm mb-1">{item.rule}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: PHRASING COMPARISONS */}
        <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Sparkles className="text-emerald-500 w-5 h-5 animate-pulse" />
            Impact Phrasing & Power Verbs
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            ATS scoring models award higher relevance scores to resumes that focus on quantified accomplishments instead of general duties. Compare the examples below:
          </p>

          <div className="space-y-3">
            {powerVerbs.map((item, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center border-b border-slate-100 dark:border-slate-800/60 pb-3 last:border-0 last:pb-0">
                <div className="md:col-span-5">
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase block mb-0.5">Passive / Duty-Focused Phrasing</span>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-through bg-rose-50/40 dark:bg-rose-950/20 p-2 rounded border border-rose-100/50 dark:border-rose-900/30">
                    {item.weak}
                  </p>
                </div>
                <div className="md:col-span-2 flex justify-center text-slate-300 dark:text-slate-700">
                  <ArrowRight className="w-4 h-4 transform rotate-90 md:rotate-0" />
                </div>
                <div className="md:col-span-5">
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase block mb-0.5">Active / Accomplishment-Focused (ATS Win)</span>
                  <p className="text-xs text-slate-800 dark:text-slate-200 font-medium bg-emerald-50/40 dark:bg-emerald-950/20 p-2 rounded border border-emerald-100/50 dark:border-emerald-900/30">
                    {item.strong}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: FAQ */}
        <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <HelpCircle className="text-slate-500 w-5 h-5" />
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
            <div className="space-y-1">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Q: Does having a colorful resume layout lower my ATS score?</h4>
              <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                A: Usually, no. Color is ignored by the parser. However, having background graphics, side-column callout blocks, or non-standard fonts *does* affect parsing success, as they break the standard reading grid.
              </p>
            </div>
            
            <div className="space-y-1">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Q: Why did my resume score low on keyword matching?</h4>
              <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                A: Keywords need to match the job description's specific technologies and terminology. Our AI scanner detects these missing concepts so you can integrate them naturally before applying.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AtsGuide;
