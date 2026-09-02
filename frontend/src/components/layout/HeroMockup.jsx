import React, { useEffect, useState } from "react";
import { Check, Star, Zap, Sparkles } from "lucide-react";

const keywords = [
  { label: "React", status: "found" },
  { label: "AWS", status: "found" },
  { label: "Kubernetes", status: "missing" },
  { label: "GraphQL", status: "missing" },
];

const TARGET_SCORE = 92;
const RADIUS = 40;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function HeroMockup() {
  const [score, setScore] = useState(0);
  const [visibleKeywords, setVisibleKeywords] = useState(0);
  const [dots, setDots] = useState(1);

  // Animate the ATS score counting up on mount
  useEffect(() => {
    let frame;
    let start;
    const duration = 1400;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setScore(Math.round(eased * TARGET_SCORE));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Reveal keyword rows one at a time
  useEffect(() => {
    const timers = keywords.map((_, i) =>
      setTimeout(() => setVisibleKeywords((v) => v + 1), 900 + i * 350)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // Animate "Rewriting bullet with Gemini..." dots
  useEffect(() => {
    const id = setInterval(() => setDots((d) => (d % 3) + 1), 450);
    return () => clearInterval(id);
  }, []);

  const offset = CIRCUMFERENCE - (score / 100) * CIRCUMFERENCE;

  return (
    <div className="relative w-full flex items-center justify-center py-12 px-4" style={{ perspective: "1800px" }}>
      <style>{`
        @keyframes heroBob {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes heroScan {
          0% { transform: translateY(-20px); opacity: 0; }
          12% { opacity: 1; }
          88% { opacity: 1; }
          100% { transform: translateY(360px); opacity: 0; }
        }
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroBlink {
          0%, 45% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .hero-float { animation: heroBob 5s ease-in-out infinite; }
        .hero-fade-in { animation: heroFadeUp 0.4s ease forwards; }
        .hero-cursor { animation: heroBlink 1s step-start infinite; }
        .hero-scan { animation: heroScan 4s ease-in-out infinite; }
      `}</style>

      {/* Ambient glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          top: "-60px",
          right: "-60px",
          width: 440,
          height: 440,
          background:
            "radial-gradient(circle, rgba(99,91,219,0.22) 0%, rgba(99,91,219,0) 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Floating Card - Top Left */}
      <div
        className="hero-float absolute z-20 hidden sm:flex items-center gap-2 rounded-xl border bg-white/90 dark:bg-slate-900/85 border-white dark:border-indigo-400/30 px-3.5 py-2.5 text-xs font-semibold text-slate-800 dark:text-slate-100 backdrop-blur-md"
        style={{
          top: "4%",
          left: "-6%",
          boxShadow: "0 20px 40px -12px rgba(30,27,75,0.25)",
        }}
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white">
          <Check className="w-3 h-3 text-white" />
        </span>
        Impact metric added: +34% output
      </div>

      {/* Floating Card - Top Right */}
      <div
        className="hero-float absolute z-20 hidden sm:flex items-center gap-2 rounded-xl border bg-white/90 dark:bg-slate-900/85 border-white dark:border-indigo-400/30 px-3.5 py-2.5 text-xs font-semibold text-slate-800 dark:text-slate-100 backdrop-blur-md"
        style={{
          top: "14%",
          right: "-8%",
          animationDelay: "0.8s",
          boxShadow: "0 20px 40px -12px rgba(30,27,75,0.25)",
        }}
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-white">
          <Star className="w-3 h-3 text-white fill-white" />
        </span>
        Missing keyword AWS found
      </div>

      {/* Floating Card - Bottom Left */}
      <div
        className="hero-float absolute z-20 hidden sm:flex items-center gap-2 rounded-xl border bg-white/90 dark:bg-slate-900/85 border-white dark:border-indigo-400/30 px-3.5 py-2.5 text-xs font-semibold text-slate-800 dark:text-slate-100 backdrop-blur-md"
        style={{
          bottom: "6%",
          left: "-10%",
          animationDelay: "2.2s",
          boxShadow: "0 20px 40px -12px rgba(30,27,75,0.25)",
        }}
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500 text-white">
          <Zap className="w-3 h-3 text-white fill-white" />
        </span>
        ATS Optimization: Complete
      </div>

      {/* Main editor window */}
      <div
        className="relative z-10 w-full max-w-lg rounded-2xl overflow-hidden border border-white/60 dark:border-indigo-400/25 bg-white dark:bg-slate-900"
        style={{
          transform: "rotateY(-9deg) rotateX(4deg) rotateZ(-1deg)",
          transformStyle: "preserve-3d",
          boxShadow:
            "0 2px 4px rgba(30,27,75,0.05), 0 12px 24px rgba(30,27,75,0.10), 0 40px 80px -20px rgba(48,41,130,0.35)",
        }}
      >
        {/* Titlebar */}
        <div className="flex items-center gap-1.5 h-10 px-4 bg-slate-50 dark:bg-slate-850 border-b border-slate-100 dark:border-slate-800">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <span className="ml-2.5 text-[11px] font-semibold text-slate-400 dark:text-slate-500 select-none">
            resumeiq.ai/editor
          </span>
        </div>

        <div className="grid grid-cols-[1.3fr_1fr] relative">
          {/* Scanning beam */}
          <div
            className="hero-scan pointer-events-none absolute left-0 top-0 h-16"
            style={{
              width: "60%",
              background:
                "linear-gradient(to bottom, rgba(99,91,219,0), rgba(99,91,219,0.25), rgba(99,91,219,0))",
            }}
          />

          {/* Left panel: Resume sheet */}
          <div className="p-6 border-r border-slate-100 dark:border-slate-800">
            <p className="text-xl font-bold text-slate-900 dark:text-white mb-0.5 tracking-tight">
              Tushar Aradwad
            </p>
            <p className="text-[12px] font-semibold text-indigo-600 dark:text-indigo-400 mb-4 uppercase tracking-wide">
              Full Stack Engineer
            </p>

            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-4 mb-2">
              Experience
            </p>
            <div className="flex gap-2 text-[12px] text-slate-700 dark:text-slate-300 leading-relaxed mb-2.5">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <span>
                Led migration to{" "}
                <span className="bg-indigo-55 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-semibold px-1 rounded">
                  microservices
                </span>
                , cutting deploy time{" "}
                <b className="text-slate-900 dark:text-white font-bold">62%</b>
              </span>
            </div>
            <div className="flex gap-2 text-[12px] text-slate-700 dark:text-slate-300 leading-relaxed mb-2.5">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <span>
                Owned{" "}
                <span className="bg-indigo-55 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-semibold px-1 rounded">
                  React
                </span>{" "}
                + Node platform serving{" "}
                <b className="text-slate-900 dark:text-white font-bold">2.1M</b> users
              </span>
            </div>
            <div className="flex gap-2 text-[12px] text-slate-700 dark:text-slate-300 leading-relaxed mb-2.5">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <span>
                Mentored 4 engineers; raised sprint velocity{" "}
                <b className="text-slate-900 dark:text-white font-bold">28%</b>
              </span>
            </div>

            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-4 mb-2">
              Skills
            </p>
            <div className="text-[12px] text-slate-700 dark:text-slate-300 flex items-center gap-1 font-medium">
              TypeScript · React · Node.js · AWS · PostgreSQL
              <span className="inline-block w-[2px] h-3.5 bg-indigo-500 hero-cursor ml-0.5" />
            </div>
          </div>

          {/* Right panel: ATS score side */}
          <div className="p-6 bg-slate-50/50 dark:bg-slate-800/40">
            <div className="flex flex-col items-center pb-4 mb-4 border-b border-slate-100 dark:border-slate-850">
              <div className="relative w-[92px] h-[92px]">
                <svg width="92" height="92" style={{ transform: "rotate(-90deg)" }}>
                  <circle
                    cx="46"
                    cy="46"
                    r={RADIUS}
                    strokeWidth="7"
                    fill="none"
                    className="stroke-slate-200 dark:stroke-slate-700"
                  />
                  <circle
                    cx="46"
                    cy="46"
                    r={RADIUS}
                    strokeWidth="7"
                    fill="none"
                    strokeLinecap="round"
                    className="stroke-emerald-500 dark:stroke-emerald-400"
                    style={{
                      strokeDasharray: CIRCUMFERENCE,
                      strokeDashoffset: offset,
                      transition: "stroke-dashoffset 0.1s linear",
                    }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-2xl font-extrabold text-slate-900 dark:text-white">
                  {score}
                </div>
              </div>
              <span className="mt-2 text-[10px] font-bold tracking-wider text-slate-450 dark:text-slate-500 uppercase">
                ATS Match Score
              </span>
            </div>

            <p className="text-[10px] font-extrabold tracking-wider text-slate-400 dark:text-slate-550 mb-2.5 uppercase">
              Keyword Analysis
            </p>
            {keywords.map((k, i) => (
              <div
                key={k.label}
                className="flex items-center justify-between text-[11px] font-semibold text-slate-700 dark:text-slate-350 mb-2"
                style={{ opacity: i < visibleKeywords ? undefined : 0 }}
              >
                <span className={i < visibleKeywords ? "hero-fade-in" : ""}>{k.label}</span>
                <span
                  className={
                    "text-[9px] font-bold px-2 py-0.5 rounded-full " +
                    (i < visibleKeywords ? "hero-fade-in " : "") +
                    (k.status === "found"
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
                      : "bg-orange-50 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300")
                  }
                >
                  {k.status === "found" ? "Found" : "Missing"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Card - Bottom Right */}
      <div
        className="hero-float absolute z-20 hidden sm:flex items-center gap-2 rounded-xl border bg-white/90 dark:bg-slate-900/85 border-white dark:border-indigo-400/30 px-3.5 py-2.5 text-xs font-semibold text-slate-800 dark:text-slate-100 backdrop-blur-md"
        style={{
          bottom: "12%",
          right: "-6%",
          animationDelay: "1.4s",
          boxShadow: "0 20px 40px -12px rgba(30,27,75,0.25)",
        }}
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-white">
          <Sparkles className="w-3 h-3 text-white" />
        </span>
        Rewriting bullet with Gemini{".".repeat(dots)}
      </div>
    </div>
  );
}

export default HeroMockup;
