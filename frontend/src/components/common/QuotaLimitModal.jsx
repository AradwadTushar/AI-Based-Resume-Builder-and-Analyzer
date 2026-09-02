import React, { useState } from "react";
import { Lock, Mail, Check, X, Sparkles, Crown } from "lucide-react";

export default function QuotaLimitModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const adminEmail = "aradwadtushar72@gmail.com";

  if (!isOpen) return null;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(adminEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-950 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-cyan-500/30 ring-1 ring-purple-500/20 animate-in fade-in zoom-in-95 duration-200">
        {/* Glow Header */}
        <div className="relative p-6 text-center bg-gradient-to-b from-purple-950/40 via-slate-950 to-slate-950 border-b border-slate-800">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-0.5 shadow-lg shadow-purple-500/25">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-cyan-400">
              <Lock className="w-6 h-6" />
            </div>
          </div>

          <h3 className="text-lg font-bold text-white tracking-tight">
            Free AI Quota Reached
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
            You have used all <span className="text-cyan-400 font-bold">5 free requests</span> included in your standard plan.
          </p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 text-xs text-slate-300 leading-relaxed">
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-purple-300 font-semibold">
              <Crown className="w-4 h-4 text-purple-400" />
              <span>Unlock Unlimited Access</span>
            </div>
            <p className="text-slate-400 text-[11px]">
              Admin accounts have unlimited AI generation, deep resume rewriting, and priority ATS scanning. Contact the project owner to upgrade your account tier.
            </p>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-cyan-400" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">
                  Administrator Email
                </p>
                <p className="text-xs font-mono text-cyan-300">{adminEmail}</p>
              </div>
            </div>

            <button
              onClick={handleCopyEmail}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition flex items-center gap-1 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400 text-[11px]">Copied</span>
                </>
              ) : (
                <span className="text-[11px]">Copy</span>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800/80 bg-slate-950 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 transition shadow-md shadow-purple-600/20 cursor-pointer"
          >
            Got it, Return to Editor
          </button>
        </div>
      </div>
    </div>
  );
}
