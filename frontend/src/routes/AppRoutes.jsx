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
import Builder from "../pages/Builder";
import Analyzer from "../pages/Analyzer";
import ResumeEditor from "../pages/ResumeEditor";

import ProtectedLayout from "../layouts/ProtectedLayout";

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
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SignIn />
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

        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/builder" element={<Builder />} />

          <Route path="/analyzer" element={<Analyzer />} />
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