import React from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  CheckCircle,
  TrendingUp,
  Sparkles,
  FileText,
  LayoutGrid,
  Cpu,
  ShieldCheck,
  Zap
} from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import logoIcon from "../assets/logo_icon.png";
import HeroMockup from "../components/layout/HeroMockup";

const GithubIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg viewBox="0 0 24 24" className={className} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

function Landing() {
  return (
    <div className="min-h-screen font-sans text-slate-100 relative overflow-hidden select-none bg-slate-950">

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 lg:px-12 py-3 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <img 
              src={logoIcon} 
              alt="ResumeIQ AI" 
              className="w-9 h-9 object-contain drop-shadow-[0_0_12px_rgba(6,182,212,0.4)]" 
            />
            <span className="text-base font-black tracking-tight text-white">
              ResumeIQ <span className="text-cyan-400">AI</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-400">
            <a href="#features" className="hover:text-cyan-300 transition">Features</a>
            <a href="#how-it-works" className="hover:text-cyan-300 transition">How It Works</a>
            <Link to="/ats-guide" className="hover:text-cyan-300 transition">ATS Secrets</Link>
            <Link to="/about" className="hover:text-cyan-300 transition">About</Link>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <SignedIn>
              <Link 
                to="/dashboard" 
                className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold py-2 px-4 rounded-xl text-xs sm:text-sm transition shadow-md shadow-purple-600/20 whitespace-nowrap"
              >
                Go to Dashboard
              </Link>
            </SignedIn>
            <SignedOut>
              <Link 
                to="/sign-in" 
                className="text-slate-300 hover:text-white font-semibold text-xs sm:text-sm transition px-2.5 py-2 whitespace-nowrap"
              >
                Sign In
              </Link>
              <Link 
                to="/sign-up" 
                className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold py-2 px-4 rounded-xl text-xs sm:text-sm transition shadow-md shadow-purple-600/20 whitespace-nowrap"
              >
                Get Started Free
              </Link>
            </SignedOut>
          </div>
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <section className="relative pt-24 lg:pt-32 min-h-screen flex flex-col lg:flex-row items-center justify-center overflow-hidden">
        {/* Background cyber ambient glow */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 right-5 w-[45vw] h-[45vw] bg-cyan-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-10 left-5 w-[40vw] h-[40vw] bg-purple-600/10 rounded-full blur-[120px]" />
        </div>

        {/* Left: Text content */}
        <div className="relative z-10 flex-1 max-w-xl px-6 lg:px-12 text-left space-y-7">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider shadow-xs">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>Powered by Gemini AI 2.0</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Build resumes that <br />
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              beat applicant filters
            </span><br />
            and land interviews.
          </h1>

          {/* Subtext */}
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            Build Ivy League & Harvard ATS-standard resumes with Google Gemini AI. 
            Real-time keyword matching, side-by-side suggestion approval, and single-click ATS exports.
          </p>

          {/* Checklist */}
          <ul className="space-y-2.5">
            {[
              "Harvard single-column template (99% ATS parseability)",
              "Side-by-side AI bullet rewriting with impact metrics",
              "Job description keyword & competency gap scanner",
              "Multi-format export: WeasyPrint PDF, plain text & JSON"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200 font-medium">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link 
              to="/dashboard" 
              className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold py-3.5 px-8 rounded-xl text-sm transition shadow-lg shadow-cyan-600/20 flex items-center gap-2 cursor-pointer"
            >
              <span>Start Building Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              to="/analyzer" 
              className="px-5 py-3.5 rounded-xl border border-slate-700/80 bg-slate-900/60 hover:bg-slate-850 text-slate-300 hover:text-white font-semibold text-sm flex items-center gap-2 transition"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Scan Existing Resume</span>
            </Link>
          </div>
        </div>

        {/* Right: Hero mockup component */}
        <div className="relative z-10 flex-1 flex items-center justify-center px-6 lg:pr-12 pt-12 lg:pt-0 max-w-xl lg:max-w-none">
          <HeroMockup />
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section id="features" className="bg-slate-950/60 py-20 px-6 lg:px-16 border-t border-b border-slate-800/80 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black text-white tracking-tight">
              Engineered for Serious Career Growth
            </h2>
            <p className="text-slate-400 mt-2 text-sm max-w-xl mx-auto">
              Everything you need to turn vague bullet points into quantifiable, high-impact achievements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Sparkles className="w-6 h-6 text-purple-400" />,
                border: "border-purple-500/20 hover:border-purple-500/50",
                glow: "bg-purple-500/10",
                title: "AI Diff Suggestion Review",
                desc: "Never blindly overwrite your content. Review original versus enhanced summaries with side-by-side accept or reject controls."
              },
              {
                icon: <ShieldCheck className="w-6 h-6 text-cyan-400" />,
                border: "border-cyan-500/20 hover:border-cyan-500/50",
                glow: "bg-cyan-500/10",
                title: "Harvard ATS Template",
                desc: "Ivy League single-column architecture tested against modern ATS parsers (Workday, Lever, Greenhouse) with 99% parse rate."
              },
              {
                icon: <TrendingUp className="w-6 h-6 text-emerald-400" />,
                border: "border-emerald-500/20 hover:border-emerald-500/50",
                glow: "bg-emerald-500/10",
                title: "Job Description Matcher",
                desc: "Paste any job description to uncover missing hard skills, soft skills, and keyword gaps before hitting submit."
              }
            ].map((feat, i) => (
              <div 
                key={i} 
                className={`bg-slate-900/50 rounded-2xl border ${feat.border} p-6 shadow-sm hover:shadow-lg transition-all text-left group`}
              >
                <div className={`inline-flex p-3 rounded-xl mb-4 ${feat.glow}`}>
                  {feat.icon}
                </div>
                <h3 className="font-bold text-white text-base mb-2">{feat.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-20 px-6 lg:px-16 bg-slate-950">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight">How It Works</h2>
            <p className="text-slate-400 mt-2 text-xs uppercase tracking-wider font-semibold">From draft to hired in 3 streamlined steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              { 
                step: "01", 
                title: "Input or Import", 
                desc: "Start fresh or upload an existing PDF resume. Choose your role category for targeted phrasing." 
              },
              { 
                step: "02", 
                title: "Optimize with AI", 
                desc: "Use Gemini AI to polish achievement bullets, scan target job descriptions, and reorder sections." 
              },
              { 
                step: "03", 
                title: "Export & Apply", 
                desc: "Download pixel-perfect WeasyPrint PDFs, copy portal-ready plain text, or back up via JSON." 
              }
            ].map((s, i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-2.5">
                <span className="text-3xl font-black text-cyan-400 font-mono">{s.step}</span>
                <h4 className="font-bold text-white text-sm">{s.title}</h4>
                <p className="text-slate-400 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-slate-950 to-purple-950/40 border border-cyan-500/30 text-center space-y-5 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-3xl sm:text-4xl font-black text-white">Ready to Land More Interviews?</h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            Try ResumeIQ AI today with 5 free AI generations and export your resume in seconds.
          </p>
          <div className="pt-2">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-extrabold py-3 px-8 rounded-xl text-sm shadow-xl hover:shadow-2xl transition"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-950 py-10 px-6 text-center border-t border-slate-800/80 space-y-4">
        <div className="flex items-center justify-center gap-2">
          <img src={logoIcon} alt="ResumeIQ AI" className="w-6 h-6 object-contain" />
          <span className="text-sm font-bold text-white">ResumeIQ AI</span>
        </div>
        <p className="text-slate-500 text-xs">
          Built with React, FastAPI, and Google Gemini AI.
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-xs font-medium text-slate-400">
          <Link to="/" className="hover:text-cyan-400 transition">Home</Link>
          <Link to="/about" className="hover:text-cyan-400 transition">About the Project</Link>
          <Link to="/ats-guide" className="hover:text-cyan-400 transition">ATS Secrets Guide</Link>
          <Link to="/analyzer" className="hover:text-cyan-400 transition">ATS Analyzer</Link>
          <a 
            href="https://github.com/AradwadTushar/AI-Based-Resume-Builder-and-Analyzer" 
            target="_blank" 
            rel="noreferrer"
            className="hover:text-cyan-400 transition inline-flex items-center gap-1"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
        </div>
        <p className="text-[11px] text-slate-600">
          Contact: <a href="mailto:aradwadt47@gmail.com" className="text-slate-400 hover:text-cyan-400 underline">aradwadt47@gmail.com</a>
        </p>
      </footer>
    </div>
  );
}

export default Landing;