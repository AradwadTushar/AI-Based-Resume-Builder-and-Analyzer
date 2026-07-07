import React from "react";
import { Link } from "react-router-dom";
import { SignIn, SignUp } from "@clerk/clerk-react";
import { ArrowLeft, Sparkles, Cpu, ShieldCheck, Zap } from "lucide-react";
import fullLogo from "../assets/full_logo.png";

const clerkAppearance = {
  variables: {
    colorPrimary: "#6366f1", // Indigo-500
    colorBackground: "#0f172a", // Slate-900
    colorText: "#f8fafc", // Slate-50
    colorTextSecondary: "#94a3b8", // Slate-400
    colorDanger: "#ef4444",
    borderRadius: "16px",
    fontFamily: "Outfit, Inter, sans-serif",
  },
  elements: {
    card: "shadow-[0_0_50px_-12px_rgba(99,102,241,0.25)] border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl",
    headerTitle: "font-extrabold text-slate-50 text-2xl tracking-tight bg-gradient-to-r from-indigo-200 to-slate-200 bg-clip-text text-transparent",
    headerSubtitle: "text-slate-400 text-sm",
    socialButtonsBlockButton: "border border-slate-800 bg-slate-950/60 hover:bg-slate-900/80 text-slate-200 hover:text-white transition-all duration-300 rounded-xl",
    formButtonPrimary: "bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 rounded-xl py-2.5",
    formFieldInput: "border border-slate-800/80 rounded-xl bg-slate-950/80 text-slate-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all",
    footerActionText: "text-slate-400",
    footerActionLink: "text-indigo-400 hover:text-indigo-300 font-semibold transition-all",
    identityPreviewText: "text-slate-200",
    formFieldLabel: "text-slate-300 font-semibold text-xs uppercase tracking-wider",
    dividerLine: "bg-slate-800",
    dividerText: "text-slate-500 text-xs font-semibold uppercase tracking-wider"
  }
};

function AuthPage({ mode = "sign-in" }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row relative overflow-hidden font-sans select-none">
      
      {/* ── BACKGROUND ANIMATED GRADIENT BLOBS ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-900/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-violet-900/20 rounded-full blur-[120px] animate-pulse-slow-delay" />
        <div className="absolute top-[30%] right-[20%] w-[35vw] h-[35vw] bg-emerald-950/10 rounded-full blur-[100px] animate-pulse-medium" />
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
      </div>

      {/* ── LEFT SIDE: HERO INFOGRAPHIC (DESKTOP ONLY) ── */}
      <div className="hidden lg:flex flex-col justify-between items-start w-1/2 p-16 relative z-10 border-r border-slate-900 bg-slate-950/40 backdrop-blur-md">
        
        {/* Back Link & Logo */}
        <div className="space-y-8 w-full">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm font-semibold transition group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <img src={fullLogo} alt="ResumeIQ AI" className="h-16 object-contain scale-110 origin-left" />
          </div>
        </div>

        {/* Visual Showcase (Animated SVG Mockup) */}
        <div className="w-full flex justify-center py-6">
          <svg className="w-full max-w-[400px] aspect-square" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Dynamic rings */}
            <circle cx="200" cy="200" r="160" stroke="#1e293b" strokeWidth="2" strokeDasharray="6 6" />
            <circle cx="200" cy="200" r="120" stroke="#334155" strokeWidth="1" />
            
            {/* Outer animated ring */}
            <circle 
              cx="200" 
              cy="200" 
              r="140" 
              stroke="url(#gradient-primary)" 
              strokeWidth="2.5" 
              strokeDasharray="40 180"
              className="animate-spin-slow"
              style={{ transformOrigin: 'center' }}
            />

            {/* Central Node (AI Engine) */}
            <g className="animate-float">
              <rect x="150" y="150" width="100" height="100" rx="20" fill="#0f172a" stroke="#4f46e5" strokeWidth="2" className="shadow-lg" />
              <rect x="155" y="155" width="90" height="90" rx="16" fill="url(#gradient-card)" opacity="0.8" />
              
              {/* Microchips & circuits */}
              <line x1="200" y1="120" x2="200" y2="150" stroke="#6366f1" strokeWidth="2" strokeDasharray="3 3" />
              <line x1="200" y1="250" x2="200" y2="280" stroke="#6366f1" strokeWidth="2" strokeDasharray="3 3" />
              <line x1="120" y1="200" x2="150" y2="200" stroke="#6366f1" strokeWidth="2" strokeDasharray="3 3" />
              <line x1="250" y1="200" x2="280" y2="200" stroke="#6366f1" strokeWidth="2" strokeDasharray="3 3" />

              <circle cx="200" cy="200" r="16" fill="#6366f1" fillOpacity="0.2" />
              <circle cx="200" cy="200" r="6" fill="#6366f1" />
            </g>

            {/* Orbiting Feature Icons */}
            <g className="animate-float-delayed">
              {/* Score / Metrics Node */}
              <circle cx="90" cy="140" r="24" fill="#020617" stroke="#10b981" strokeWidth="1.5" />
              <path d="M83 140l5 5 9-9" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <text x="90" y="178" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">ATS OK</text>
            </g>

            <g className="animate-float">
              {/* Sparkles / Rewrite Node */}
              <circle cx="310" cy="140" r="24" fill="#020617" stroke="#a855f7" strokeWidth="1.5" />
              <path d="M305 133l2.5 4.5 4.5 2.5-4.5 2.5-2.5 4.5-2.5-4.5-4.5-2.5 4.5-2.5z" fill="#a855f7" />
              <text x="310" y="178" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">AI REWRITE</text>
            </g>

            <g className="animate-float-delayed">
              {/* PDF Document Node */}
              <circle cx="200" cy="310" r="24" fill="#020617" stroke="#6366f1" strokeWidth="1.5" />
              <rect x="193" y="299" width="14" height="20" rx="2" fill="none" stroke="#6366f1" strokeWidth="1.5" />
              <line x1="197" y1="304" x2="203" y2="304" stroke="#6366f1" strokeWidth="1.5" />
              <line x1="197" y1="309" x2="203" y2="309" stroke="#6366f1" strokeWidth="1.5" />
              <line x1="197" y1="314" x2="201" y2="314" stroke="#6366f1" strokeWidth="1.5" />
              <text x="200" y="348" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">EXPORT PDF</text>
            </g>

            {/* Defs */}
            <defs>
              <linearGradient id="gradient-primary" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
              <linearGradient id="gradient-card" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1e1b4b" />
                <stop offset="100%" stopColor="#020617" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Informative list */}
        <div className="space-y-4 w-full">
          <h3 className="text-xl font-bold text-slate-100">Elevate Your Career with ResumeIQ AI</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex gap-2 items-start text-xs text-slate-400 leading-relaxed">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span><strong>Instant Optimization</strong>: Re-align resume skills dynamically to target roles.</span>
            </div>
            <div className="flex gap-2 items-start text-xs text-slate-400 leading-relaxed">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span><strong>ATS Guard</strong>: Validate formatting against modern parser requirements.</span>
            </div>
          </div>
        </div>

      </div>

      {/* ── RIGHT SIDE: CLERK AUTH CARD ── */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 relative z-10 bg-slate-950/20 backdrop-blur-sm lg:w-1/2">
        {/* Mobile Header */}
        <div className="lg:hidden flex flex-col items-center gap-4 mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-xs font-semibold transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Link>
          <img src={fullLogo} alt="ResumeIQ AI" className="h-12 object-contain" />
        </div>

        {/* Clerk Components Wrapper */}
        <div className="w-full max-w-md flex justify-center animate-fade-in">
          {mode === "sign-in" ? (
            <SignIn 
              appearance={clerkAppearance} 
              routing="path" 
              path="/sign-in"
              signUpUrl="/sign-up"
              forceRedirectUrl="/dashboard"
            />
          ) : (
            <SignUp 
              appearance={clerkAppearance} 
              routing="path" 
              path="/sign-up"
              signInUrl="/sign-in"
              forceRedirectUrl="/dashboard"
            />
          )}
        </div>
      </div>
      
    </div>
  );
}

export default AuthPage;
