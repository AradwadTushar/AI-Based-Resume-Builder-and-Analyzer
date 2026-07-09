import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import logoIcon from "../assets/logo_icon.png";

function ProtectedLayout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Hide the mobile sidebar header when editing a resume to prevent double headers
  const isEditingResume = location.pathname.startsWith("/resume/");

  return (
    <div className="flex flex-col md:flex-row h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Mobile Top Header (hidden when editing a resume) */}
      {!isEditingResume && (
        <header className="flex md:hidden items-center justify-between px-4 py-3 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/80 shrink-0 z-40">
          <div className="flex items-center gap-2">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button className="p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                  <Menu className="w-5 h-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-[240px] border-r-0">
                <div className="h-full" onClick={() => setOpen(false)}>
                  <Sidebar isMobile={true} />
                </div>
              </SheetContent>
            </Sheet>
            <img src={logoIcon} alt="ResumeIQ" className="w-8 h-8 object-contain dark:brightness-110" />
            <span className="text-sm font-bold text-slate-850 dark:text-slate-100">ResumeIQ AI</span>
          </div>
        </header>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:flex shrink-0">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto min-w-0 h-full relative">
        <Outlet />
      </main>
    </div>
  );
}

export default ProtectedLayout;