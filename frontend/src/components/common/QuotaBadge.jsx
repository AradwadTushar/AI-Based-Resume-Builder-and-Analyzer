import React, { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";
import { Crown, Zap, AlertCircle } from "lucide-react";

export default function QuotaBadge({ onQuotaExceeded }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchQuota = async () => {
    try {
      const res = await axiosClient.get("/auth/me");
      setUserData(res.data);
      if (!res.data.is_admin && res.data.ai_requests_used >= 5) {
        if (onQuotaExceeded) onQuotaExceeded();
      }
    } catch (err) {
      console.error("Failed to fetch user quota:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuota();
    // Listen to custom event when AI action completes to refresh quota
    window.addEventListener("ai-quota-consumed", fetchQuota);
    return () => window.removeEventListener("ai-quota-consumed", fetchQuota);
  }, []);

  if (loading || !userData) return null;

  if (userData.is_admin) {
    return (
      <div
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-purple-500/15 text-purple-300 border border-purple-500/30 shadow-xs backdrop-blur-xs select-none"
        title="Admin account: unlimited AI generation requests"
      >
        <Crown className="w-3 h-3 text-purple-400 animate-pulse" />
        <span>Admin Unlimited</span>
      </div>
    );
  }

  const remaining = Math.max(0, 5 - (userData.ai_requests_used || 0));
  const isExhausted = remaining === 0;

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border backdrop-blur-xs select-none transition-all ${
        isExhausted
          ? "bg-rose-500/15 text-rose-300 border-rose-500/30"
          : "bg-cyan-500/15 text-cyan-300 border-cyan-500/30"
      }`}
      title={
        isExhausted
          ? "Free limit reached (5/5 requests used)"
          : `${remaining} free AI requests remaining`
      }
    >
      {isExhausted ? (
        <AlertCircle className="w-3 h-3 text-rose-400" />
      ) : (
        <Zap className="w-3 h-3 text-cyan-400" />
      )}
      <span>{remaining}/5 Credits</span>
    </div>
  );
}
