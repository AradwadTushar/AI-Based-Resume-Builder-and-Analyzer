import React, { useEffect, useState } from "react";
import axios from "axios";
import { Server, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";

export default function BackendStatusBanner() {
  const [status, setStatus] = useState("checking"); // 'checking' | 'waking' | 'connected' | 'error'
  const [showToast, setShowToast] = useState(false);

  const checkHealth = async () => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "";
    if (!baseUrl) return;

    // Show warming notice only if it takes more than 2.5s (typical cold start)
    const warmingTimer = setTimeout(() => {
      setStatus("waking");
      setShowToast(true);
    }, 2500);

    try {
      await axios.get(`${baseUrl}/healthz`, { timeout: 45000 });
      clearTimeout(warmingTimer);
      setStatus("connected");
      setShowToast(true);

      // Automatically hide the connected badge after 2.5s
      setTimeout(() => {
        setShowToast(false);
      }, 2500);
    } catch (err) {
      clearTimeout(warmingTimer);
      setStatus("error");
      setShowToast(true);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  if (!showToast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 right-5 z-50 transition-all duration-300 transform translate-y-0"
    >
      {status === "waking" && (
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 text-amber-800 dark:text-amber-200 backdrop-blur-md shadow-lg text-xs font-medium animate-pulse">
          <Server className="w-4 h-4 animate-spin text-amber-600 dark:text-amber-400" />
          <span>Server is waking up (free tier cold-start ~15s)...</span>
        </div>
      )}

      {status === "connected" && (
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 text-emerald-800 dark:text-emerald-200 backdrop-blur-md shadow-lg text-xs font-medium transition-all">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Backend Connected</span>
        </div>
      )}

      {status === "error" && (
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-rose-500/10 dark:bg-rose-500/20 border border-rose-500/30 text-rose-800 dark:text-rose-200 backdrop-blur-md shadow-lg text-xs font-medium">
          <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
          <span>Backend unreachable</span>
          <button
            onClick={checkHealth}
            className="ml-1 p-1 hover:bg-rose-500/20 rounded-full transition"
            title="Retry connection"
          >
            <RefreshCw className="w-3 h-3 text-rose-600 dark:text-rose-400" />
          </button>
        </div>
      )}
    </div>
  );
}
