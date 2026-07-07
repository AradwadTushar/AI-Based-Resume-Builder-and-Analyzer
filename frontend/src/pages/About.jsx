import React, { useEffect, useState } from "react";
import { Globe, Cpu, Code2, Layers, Heart, Sparkles, ArrowLeft } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import devAvatar from "../assets/dev_avatar.png";

// Inline SVG brand icons
const GithubIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" className={className} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" className={className} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Custom animated SVG illustration — floating tech orbs + code lines
function TechOrbsIllustration() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 60);
    return () => clearInterval(interval);
  }, []);

  const t = tick * 0.03;

  const orbs = [
    { label: "React", color: "#61dafb", cx: 120 + Math.sin(t * 0.7) * 8, cy: 90 + Math.cos(t * 0.5) * 6 },
    { label: "Python", color: "#ffd43b", cx: 240 + Math.sin(t * 0.4 + 1) * 10, cy: 70 + Math.cos(t * 0.6 + 1) * 8 },
    { label: "Gemini", color: "#a78bfa", cx: 340 + Math.sin(t * 0.6 + 2) * 7, cy: 110 + Math.cos(t * 0.4 + 2) * 9 },
    { label: "FastAPI", color: "#00b894", cx: 180 + Math.sin(t * 0.5 + 3) * 9, cy: 190 + Math.cos(t * 0.7 + 3) * 7 },
    { label: "PostgreSQL", color: "#336791", cx: 310 + Math.sin(t * 0.8 + 4) * 8, cy: 175 + Math.cos(t * 0.5 + 4) * 6 },
    { label: "Vite", color: "#f7931e", cx: 80 + Math.sin(t * 0.6 + 5) * 6, cy: 160 + Math.cos(t * 0.8 + 5) * 8 },
  ];

  const codeLines = [
    { text: "const resume = await gemini.analyze(pdf);", x: 20, y: 240, opacity: 0.55 + Math.sin(t * 0.4) * 0.2 },
    { text: "@router.post('/api/ai/cover-letter')", x: 20, y: 258, opacity: 0.45 + Math.cos(t * 0.5) * 0.2 },
    { text: "export const HeroMockup = () => {", x: 20, y: 276, opacity: 0.5 + Math.sin(t * 0.35) * 0.2 },
    { text: "  return <ATSScore value={92} />;", x: 20, y: 294, opacity: 0.4 + Math.cos(t * 0.45) * 0.2 },
  ];

  return (
    <svg
      viewBox="0 0 440 330"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="bg-grad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#1e1b4b" />
          <stop offset="100%" stopColor="#0f172a" />
        </radialGradient>
        {orbs.map((o) => (
          <radialGradient key={`grad-${o.label}`} id={`grad-${o.label}`} cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor={o.color} stopOpacity="0.9" />
            <stop offset="100%" stopColor={o.color} stopOpacity="0.3" />
          </radialGradient>
        ))}
        <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="soft-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
          </feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect width="440" height="330" rx="16" fill="url(#bg-grad)" />

      {/* Grid lines */}
      {[60, 120, 180, 240, 300].map(y => (
        <line key={`hy-${y}`} x1="0" y1={y} x2="440" y2={y} stroke="#334155" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.35" />
      ))}
      {[80, 160, 240, 320, 400].map(x => (
        <line key={`vx-${x}`} x1={x} y1="0" x2={x} y2="330" stroke="#334155" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.35" />
      ))}

      {/* Orbital rings connecting orbs */}
      {orbs.map((a, i) => {
        const b = orbs[(i + 2) % orbs.length];
        return (
          <line
            key={`conn-${i}`}
            x1={a.cx} y1={a.cy}
            x2={b.cx} y2={b.cy}
            stroke={a.color}
            strokeWidth="0.8"
            opacity={0.15 + Math.sin(t + i) * 0.08}
            strokeDasharray="4 6"
          />
        );
      })}

      {/* Orb glow blobs */}
      {orbs.map(o => (
        <circle
          key={`glow-${o.label}`}
          cx={o.cx}
          cy={o.cy}
          r={32}
          fill={o.color}
          opacity={0.06 + Math.sin(t + o.cx) * 0.02}
        />
      ))}

      {/* Orbs */}
      {orbs.map(o => (
        <g key={`orb-${o.label}`} filter="url(#glow)">
          <circle cx={o.cx} cy={o.cy} r={20} fill={`url(#grad-${o.label})`} opacity="0.9" />
          <circle cx={o.cx - 6} cy={o.cy - 6} r={4} fill="white" opacity="0.25" />
          <text
            x={o.cx}
            y={o.cy + 33}
            textAnchor="middle"
            fill={o.color}
            fontSize="8"
            fontFamily="monospace"
            fontWeight="700"
            opacity="0.85"
          >
            {o.label}
          </text>
        </g>
      ))}

      {/* Gemini sparkle icon in center */}
      <g transform="translate(200, 125)">
        <circle cx="20" cy="20" r="18" fill="#4f46e5" opacity="0.2" />
        <circle cx="20" cy="20" r="12" fill="#4f46e5" opacity="0.5" />
        <text x="20" y="26" textAnchor="middle" fontSize="14" fill="#c4b5fd">✦</text>
      </g>

      {/* Code block panel */}
      <rect x="14" y="228" width="412" height="88" rx="8" fill="#0f172a" opacity="0.7" />
      <rect x="14" y="228" width="412" height="3" rx="2" fill="#4f46e5" opacity="0.8" />

      {/* Code lines */}
      {codeLines.map((line, i) => (
        <text
          key={i}
          x={line.x}
          y={line.y}
          fill="#a5b4fc"
          fontSize="9"
          fontFamily="monospace"
          opacity={line.opacity}
        >
          {i === 0 && <tspan fill="#7dd3fc">const </tspan>}
          {i === 1 && <tspan fill="#f9a8d4">@router</tspan>}
          {i === 2 && <tspan fill="#7dd3fc">export const </tspan>}
          {i === 3 && <tspan fill="#86efac">  return </tspan>}
          <tspan>{line.text.replace(/^(const |@router|export const |  return )/, '')}</tspan>
        </text>
      ))}

      {/* Cursor blink */}
      <rect
        x={20}
        y={306}
        width={6}
        height={10}
        fill="#a78bfa"
        rx="1"
        opacity={Math.sin(t * 2.5) > 0 ? 0.9 : 0}
      />

      {/* Top right corner badges */}
      <rect x="360" y="12" width="64" height="18" rx="4" fill="#065f46" opacity="0.8" />
      <text x="392" y="24" textAnchor="middle" fill="#34d399" fontSize="8" fontFamily="monospace" fontWeight="700">● LIVE</text>

      <rect x="290" y="12" width="62" height="18" rx="4" fill="#1e1b4b" opacity="0.8" />
      <text x="321" y="24" textAnchor="middle" fill="#a78bfa" fontSize="8" fontFamily="monospace" fontWeight="700">AI v2.0</text>
    </svg>
  );
}

function About() {
  const { isSignedIn } = useUser();

  const techStack = [
    { name: "React 19 & Vite", category: "Frontend", desc: "Sleek SPA interface powered by Fast Refresh", icon: Code2 },
    { name: "Tailwind CSS v4", category: "Styling", desc: "Modern utility-first styling with dark mode", icon: Layers },
    { name: "FastAPI & Python", category: "Backend", desc: "High-performance async REST API pipeline", icon: Cpu },
    { name: "Gemini AI SDK", category: "Intelligence", desc: "ATS scoring and intelligent phrasing rewrites", icon: Sparkles }
  ];

  const mainContent = (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto space-y-10 font-sans relative overflow-hidden flex-1">
      {/* Mesh Glow Background */}
      <div
        className="absolute rounded-full pointer-events-none opacity-20"
        style={{
          top: "10%", right: "-10%", width: 500, height: 500,
          background: "radial-gradient(circle, rgba(99,91,219,0.3) 0%, rgba(99,91,219,0) 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800/80 pb-6 text-left">
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">
            About the Project
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Inside ResumeIQ AI — architecture, developer profile, and product overview.
          </p>
        </div>
        {!isSignedIn && (
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 text-slate-700 dark:text-slate-250 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column */}
        <div className="lg:col-span-6 space-y-6 text-left">
          {/* Project Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">🚀 Project Overview</h2>
            <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
              <strong>ResumeIQ AI</strong> is a modern AI-powered resume builder and ATS analyzer. It extracts text from PDF resumes, matches them against job descriptions using <strong>Gemini AI</strong>, flags missing keywords, and generates phrasing rewrites. Users edit, preview, and download A4-ready PDFs instantly.
            </p>
            <a
              href="https://github.com/AradwadTushar/AI-Based-Resume-Builder-and-Analyzer"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition"
            >
              <GithubIcon className="w-4 h-4" />
              View Repository
            </a>
          </div>

          {/* Dev Card — with real owl avatar */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm bg-indigo-50 dark:bg-slate-800 shrink-0">
                <img
                  src={devAvatar}
                  alt="Tushar Aradwad"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-800 dark:text-white">Tushar Aradwad</h3>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold uppercase tracking-wider mt-0.5">
                  Lead Full Stack Developer
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
              Hey! I'm Tushar — a Full Stack Developer passionate about AI integrations, SaaS products, and crafting premium user experiences from frontend to backend.
            </p>

            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href="https://www.linkedin.com/in/tushar-aradwad-536570307/"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                title="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/AradwadTushar"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-500 hover:text-slate-800 dark:hover:text-white transition"
                title="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://dev-tushar-aradwad-portfolio.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
                title="Portfolio Website"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column — Custom animated SVG + tech grid */}
        <div className="lg:col-span-6 space-y-5">
          {/* Animated Tech Orbs Illustration */}
          <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm" style={{ aspectRatio: "440/330" }}>
            <TechOrbsIllustration />
          </div>

          {/* Tech Stack Grid */}
          <div className="grid grid-cols-2 gap-3">
            {techStack.map((tech) => {
              const Icon = tech.icon;
              return (
                <div
                  key={tech.name}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl p-4 text-left space-y-1.5"
                >
                  <div className="flex items-center gap-1.5">
                    <Icon className="w-4 h-4 text-indigo-500" />
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                      {tech.category}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-100 text-xs">{tech.name}</h4>
                  <p className="text-[10.5px] text-slate-500 dark:text-slate-450 leading-normal">{tech.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-center gap-1 text-xs text-slate-400 dark:text-slate-600 pt-8 border-t border-slate-100 dark:border-slate-800">
        <span>Made with</span>
        <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
        <span>by Tushar Aradwad © 2026</span>
      </div>
    </div>
  );

  if (isSignedIn) {
    return (
      <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
        <Sidebar />
        <div className="flex-1 overflow-hidden">
          {mainContent}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {mainContent}
    </div>
  );
}

export default About;
