import React from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  CheckCircle,
  TrendingUp,
  Sparkles,
  FileText,
  LayoutGrid,
  Cpu
} from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import fullLogo from "../assets/full_logo.png";
import HeroMockup from "../components/layout/HeroMockup";

function Landing() {
  return (
    <div className="min-h-screen font-sans text-slate-800 dark:text-slate-100 relative overflow-hidden select-none bg-white dark:bg-slate-950">

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm border-b border-slate-100 dark:border-slate-900 px-6 lg:px-12 py-3 flex items-center justify-between">
        <img src={fullLogo} alt="ResumeIQ AI" className="h-16 lg:h-20 -my-4 object-contain scale-125 origin-left" />
        <div className="flex items-center gap-3">
          <SignedIn>
            <Link 
              to="/dashboard" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-5 rounded-xl text-sm transition shadow-md"
            >
              Go to Dashboard
            </Link>
          </SignedIn>
          <SignedOut>
            <Link 
              to="/dashboard" 
              className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold text-sm transition px-3 py-2"
            >
              Sign In
            </Link>
            <Link 
              to="/dashboard" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-5 rounded-xl text-sm transition shadow-md"
            >
              Get Started Free
            </Link>
          </SignedOut>
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <section className="relative pt-24 lg:pt-32 min-h-screen flex flex-col lg:flex-row items-center justify-center overflow-hidden">
        {/* Background gradient blobs */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-gradient-to-bl from-indigo-100/50 via-violet-50/30 to-transparent dark:from-indigo-950/20 dark:via-violet-950/10 rounded-full opacity-60 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-gradient-to-tr from-emerald-100/40 via-teal-50/20 to-transparent dark:from-emerald-950/15 dark:via-teal-950/10 rounded-full opacity-50 blur-3xl" />
        </div>

        {/* Left: Text content */}
        <div className="relative z-10 flex-1 max-w-xl px-8 lg:px-16 text-left space-y-7">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            Powered by Gemini AI
          </div>

          {/* Headline */}
          <h1 className="text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
            The smartest<br />
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-emerald-500 bg-clip-text text-transparent">
              AI-powered
            </span><br />
            resume builder.
          </h1>

          {/* Subtext */}
          <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed font-medium">
            Build ATS-optimized resumes with Gemini AI. Get instant scores, 
            detect missing keywords, and download print-ready PDFs in seconds.
          </p>

          {/* Checklist */}
          <ul className="space-y-2">
            {[
              "Profession-aware sections & section titles",
              "AI bullet rewriting with impact metrics",
              "PDF scanner & ATS score analyzer"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200 font-semibold">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link 
              to="/dashboard" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-7 rounded-xl text-base transition shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              Start Building Free <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              to="/dashboard" 
              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-bold text-base flex items-center gap-1.5 transition"
            >
              <FileText className="w-4 h-4" />
              Scan your PDF
            </Link>
          </div>
        </div>

        {/* Right: Hero mockup component */}
        <div className="relative z-10 flex-1 flex items-center justify-center px-8 lg:pr-16 pt-12 lg:pt-0 max-w-xl lg:max-w-none">
          <HeroMockup />
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section className="bg-slate-50 dark:bg-slate-900/30 py-20 px-6 lg:px-16 border-t border-b border-slate-100 dark:border-slate-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Everything you need to land interviews faster
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-3 text-base">
              ResumeIQ AI combines smart formatting, AI writing, and ATS science in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Sparkles className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
                bg: "bg-indigo-50 border-indigo-100 dark:bg-indigo-950/20 dark:border-indigo-900/50",
                title: "AI Summary & Bullet Writer",
                desc: "Gemini transforms generic job lists into achievement-focused, metrics-driven bullet points tailored to your role."
              },
              {
                icon: <LayoutGrid className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
                bg: "bg-emerald-50 border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/50",
                title: "Profession-Aware Sections",
                desc: "From Software Engineer to Clinical Nurse — your form sections, titles, and PDF layout dynamically adapt to your career."
              },
              {
                icon: <TrendingUp className="w-6 h-6 text-violet-600 dark:text-violet-400" />,
                bg: "bg-violet-50 border-violet-100 dark:bg-violet-950/20 dark:border-violet-900/50",
                title: "Semantic ATS Scoring",
                desc: "Upload any existing PDF resume for an instant keyword gap analysis, ATS score, and phrasing rewrites."
              }
            ].map((feat, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition group">
                <div className={`inline-flex p-2.5 rounded-lg border mb-4 ${feat.bg}`}>
                  {feat.icon}
                </div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">{feat.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 px-6 lg:px-16 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto text-center space-y-12">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">How It Works</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">From blank to hired in 3 steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Choose your profession", desc: "Inputs, sections, and PDF headers automatically adapt to your career." },
              { step: "02", title: "Write with Gemini AI", desc: "Generate summaries and rewrite bullets into strong, measurable achievements." },
              { step: "03", title: "Download ATS-safe PDF", desc: "Get a clean, parser-friendly PDF — no columns or graphics that break ATS." }
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center space-y-3">
                <span className="text-4xl font-black bg-gradient-to-br from-indigo-200 to-violet-300 dark:from-indigo-700 dark:to-violet-600 bg-clip-text text-transparent">{s.step}</span>
                <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">{s.title}</h4>
                <p className="text-slate-500 dark:text-slate-400 text-xs max-w-[180px] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-16 px-6 bg-gradient-to-br from-indigo-600 to-violet-600">
        <div className="max-w-2xl mx-auto text-center space-y-5">
          <h2 className="text-3xl font-extrabold text-white">Ready to build your best resume?</h2>
          <p className="text-indigo-200 text-base">Free to use. No credit card required.</p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 bg-white text-indigo-600 font-extrabold py-3 px-8 rounded-xl text-base shadow-xl hover:shadow-2xl transition"
          >
            Get Started Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-900 dark:bg-slate-950 py-8 px-6 text-center border-t border-slate-800/40 dark:border-slate-900 space-y-2">
        <img src={fullLogo} alt="ResumeIQ AI" className="h-16 mx-auto -my-3 object-contain opacity-70 invert dark:opacity-40 scale-125" />
        <p className="text-slate-500 dark:text-slate-600 text-xs">© 2026 ResumeIQ AI. Built for the modern job search.</p>
        <div className="flex justify-center gap-4 text-xs font-semibold text-slate-450 dark:text-slate-550">
          <Link to="/about" className="hover:text-indigo-400 dark:hover:text-indigo-400 transition">About the Project</Link>
        </div>
      </footer>
    </div>
  );
}

export default Landing;