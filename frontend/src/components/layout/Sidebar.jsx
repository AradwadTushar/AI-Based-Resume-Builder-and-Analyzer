import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import { 
  LayoutDashboard, 
  TrendingUp, 
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  History as HistoryIcon,
  Info
} from "lucide-react";
import fullLogo from "../../assets/full_logo.png";
import logoIcon from "../../assets/logo_icon.png";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`
      ${collapsed ? "w-[72px]" : "w-[220px]"} 
      h-screen flex flex-col justify-between 
      bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800/80
      transition-all duration-300 ease-in-out shrink-0 z-10 relative
    `}>

      {/* Logo Section */}
      <div>
        <div className="flex items-center justify-between px-4 py-4 border-b border-slate-100 dark:border-slate-800/80">
          {collapsed ? (
            <img src={logoIcon} alt="ResumeIQ" className="w-14 h-14 -m-3 object-contain dark:brightness-110 scale-125" />
          ) : (
            <img src={fullLogo} alt="ResumeIQ AI" className="h-16 -my-4 -mx-2 object-contain dark:brightness-110 scale-125 origin-left" />
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-md text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-1 px-2 pt-4">
          <NavLink 
            to="/dashboard" 
            title="Dashboard"
            className={({ isActive }) => 
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition
               ${isActive 
                ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400" 
                : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50"
              }`
            }
          >
            <LayoutDashboard className="w-4 h-4 shrink-0" />
            {!collapsed && <span>Dashboard</span>}
          </NavLink>

          <NavLink 
            to="/analyzer" 
            title="ATS Analyzer"
            className={({ isActive }) => 
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition
               ${isActive 
                ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400" 
                : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50"
              }`
            }
          >
            <TrendingUp className="w-4 h-4 shrink-0" />
            {!collapsed && <span>ATS Analyzer</span>}
          </NavLink>

          <NavLink 
            to="/ats-guide" 
            title="ATS Secrets"
            className={({ isActive }) => 
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition
               ${isActive 
                ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400" 
                : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50"
              }`
            }
          >
            <HelpCircle className="w-4 h-4 shrink-0" />
            {!collapsed && <span>ATS Secrets</span>}
          </NavLink>

          <NavLink 
            to="/history" 
            title="History"
            className={({ isActive }) => 
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition
               ${isActive 
                ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400" 
                : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50"
              }`
            }
          >
            <HistoryIcon className="w-4 h-4 shrink-0" />
            {!collapsed && <span>History</span>}
          </NavLink>

          <NavLink 
            to="/about" 
            title="About Project"
            className={({ isActive }) => 
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition
               ${isActive 
                ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400" 
                : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50"
              }`
            }
          >
            <Info className="w-4 h-4 shrink-0" />
            {!collapsed && <span>About</span>}
          </NavLink>
        </nav>
      </div>

      {/* User Account at bottom */}
      <div className="border-t border-slate-100 dark:border-slate-800/80 px-3 py-4">
        <div className="flex items-center gap-3 px-2">
          <UserButton showName={false} />
          {!collapsed && (
            <div className="text-left min-w-0">
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">My Account</p>
              <p className="text-[10px] text-slate-400 dark:text-slate-500">Manage settings</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;