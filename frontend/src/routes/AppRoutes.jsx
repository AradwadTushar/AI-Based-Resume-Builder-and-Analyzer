import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import {
  SignedIn,
  SignedOut,
  SignIn,
} from "@clerk/clerk-react";

import Landing from "../pages/Landing";
import Dashboard from "../pages/Dashboard";
import AtsGuide from "../pages/AtsGuide";
import Analyzer from "../pages/Analyzer";
import ResumeEditor from "../pages/ResumeEditor";
import History from "../pages/History";
import About from "../pages/About";

import ProtectedLayout from "../layouts/ProtectedLayout";

const clerkAppearance = {
  variables: {
    colorPrimary: "#4f46e5",
    colorBackground: "#ffffff",
    colorText: "#1e293b",
    colorTextSecondary: "#64748b",
    borderRadius: "12px",
    fontFamily: "Geist Variable, sans-serif",
  },
  elements: {
    card: "shadow-2xl border border-slate-200",
    headerTitle: "font-bold text-slate-800 text-xl tracking-tight",
    headerSubtitle: "text-slate-500 text-sm",
    socialButtonsBlockButton: "border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition",
    formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition",
    formFieldInput: "border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500",
  }
};

function ProtectedRoutes() {
  return (
    <SignedIn>
      <ProtectedLayout />
    </SignedIn>
  );
}

function PublicRoutes() {
  return (
    <SignedOut>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #f0f4ff 0%, #fafafa 50%, #f0fdf4 100%)",
          padding: "2rem",
          gap: "1.5rem"
        }}
      >
        <img 
          src="/src/assets/full_logo.png" 
          alt="ResumeIQ AI" 
          style={{ height: "90px", marginTop: "-20px", marginBottom: "-20px", objectFit: "contain", transform: "scale(1.2)" }} 
        />
        <SignIn appearance={clerkAppearance} />
      </div>
    </SignedOut>
  );
}

function AppRoutes() {
  return (
    <>
      <PublicRoutes />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/ats-guide" element={<AtsGuide />} />

          <Route path="/analyzer" element={<Analyzer />} />
          <Route path="/history" element={<History />} />
          <Route path="/resume/:id" element={<ResumeEditor />} />
        </Route>

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </>
  );
}

export default AppRoutes;