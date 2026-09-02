import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import { 
  LayoutDashboard, 
  TrendingUp, 
  HelpCircle, 
  History as HistoryIcon, 
  Info,
  Menu,
  X
} from "lucide-react";
import fullLogo from "../../assets/full_logo.png";
import logoIcon from "../../assets/logo_icon.png";
import QuotaBadge from "../common/QuotaBadge";

const NAV_LINKS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/analyzer", label: "ATS Analyzer", icon: TrendingUp },
  { to: "/ats-guide", label: "ATS Guide", icon: HelpCircle },
  { to: "/history", label: "History", icon: HistoryIcon },
  { to: "/about", label: "About", icon: Info },
];

export default function AppHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="flex items-center gap-2">
            <img 
              src={logoIcon} 
              alt="ResumeIQ AI" 
              className="w-9 h-9 object-contain dark:brightness-110 drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]" 
            />
            <span className="text-base font-black tracking-tight text-white hidden sm:inline bg-gradient-to-r from-white via-slate-200 to-cyan-300 bg-clip-text text-transparent">
              ResumeIQ <span className="text-cyan-400">AI</span>
            </span>
          </Link>
        </div>

        {/* Center: Desktop Navigation Bar */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800/60">
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-xs"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent"
                  }`
                }
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Right: AI Quota & Profile Picture */}
        <div className="flex items-center gap-3">
          {/* AI Usage Quota pill */}
          <QuotaBadge />

          {/* Clerk Profile Picture & Menu */}
          <div className="p-0.5 rounded-full border border-slate-700/80 bg-slate-900 shadow-sm flex items-center justify-center">
            <UserButton 
              afterSignOutUrl="/" 
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                }
              }}
            />
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 transition"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden pt-3 pb-2 border-t border-slate-800/80 mt-2.5 space-y-1 animate-in slide-in-from-top-2 duration-150">
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition ${
                    isActive
                      ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </div>
      )}
    </header>
  );
}
