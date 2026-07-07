import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";

function ProtectedLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar />
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}

export default ProtectedLayout;