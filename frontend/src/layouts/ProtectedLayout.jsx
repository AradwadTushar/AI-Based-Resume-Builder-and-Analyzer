import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import AppHeader from "../components/layout/AppHeader";

function ProtectedLayout() {
  const location = useLocation();
  const isEditingResume = location.pathname.startsWith("/resume/");

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Top Header Navbar with Pages & PFP (hidden only when inside fullscreen resume editor) */}
      {!isEditingResume && <AppHeader />}

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto min-w-0 h-full relative">
        <Outlet />
      </main>
    </div>
  );
}

export default ProtectedLayout;