import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import {
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";

import Landing from "../pages/Landing";
import Dashboard from "../pages/Dashboard";
import AtsGuide from "../pages/AtsGuide";
import Analyzer from "../pages/Analyzer";
import ResumeEditor from "../pages/ResumeEditor";
import History from "../pages/History";
import About from "../pages/About";
import AuthPage from "../pages/AuthPage";

import ProtectedLayout from "../layouts/ProtectedLayout";

function ProtectedRoutes() {
  return (
    <>
      <SignedIn>
        <ProtectedLayout />
      </SignedIn>
      <SignedOut>
        <Navigate to="/sign-in" replace />
      </SignedOut>
    </>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Landing />} />
      <Route path="/about" element={<About />} />

      {/* Auth Pages (Public but only signed out) */}
      <Route 
        path="/sign-in/*" 
        element={
          <>
            <SignedIn>
              <Navigate to="/dashboard" replace />
            </SignedIn>
            <SignedOut>
              <AuthPage mode="sign-in" />
            </SignedOut>
          </>
        } 
      />
      <Route 
        path="/sign-up/*" 
        element={
          <>
            <SignedIn>
              <Navigate to="/dashboard" replace />
            </SignedIn>
            <SignedOut>
              <AuthPage mode="sign-up" />
            </SignedOut>
          </>
        } 
      />

      {/* Protected Routes */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ats-guide" element={<AtsGuide />} />
        <Route path="/analyzer" element={<Analyzer />} />
        <Route path="/history" element={<History />} />
        <Route path="/resume/:id" element={<ResumeEditor />} />
      </Route>

      {/* Fallback */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}

export default AppRoutes;