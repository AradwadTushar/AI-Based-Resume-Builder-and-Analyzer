import { Outlet } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";

import Sidebar from "../components/layout/Sidebar";

function ProtectedLayout() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <div style={{ flex: 1 }}>
        <header
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: "1rem",
            borderBottom: "1px solid #ddd",
          }}
        >
          <UserButton />
        </header>

        <main style={{ padding: "1.5rem" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default ProtectedLayout;