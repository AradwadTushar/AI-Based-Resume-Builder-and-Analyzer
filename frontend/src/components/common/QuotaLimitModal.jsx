import React from "react";
import { Lock, Crown, X, ArrowUpRight, MessageSquare } from "lucide-react";

export default function QuotaLimitModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-950 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-cyan-500/30 ring-1 ring-purple-500/20 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="relative p-6 text-center bg-gradient-to-b from-purple-950/40 via-slate-950 to-slate-950 border-b border-slate-800">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
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
              Unlimited AI generation, deep bullet-point rewriting, and target job description matching can be unlocked by contacting support or upgrading your account tier.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <div>
                  <p className="text-[11px] font-semibold text-slate-200">
                    Contact for Limit Extension
                  </p>
                  <p className="text-[10px] text-cyan-400 font-mono">
                    aradwadt47@gmail.com
                  </p>
                </div>
              </div>

              <a
                href="mailto:aradwadt47@gmail.com?subject=Request%20ResumeIQ%20AI%20Credits"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white transition shadow-xs cursor-pointer"
              >
                <span>Email</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800/80 bg-slate-950 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="w-full py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition cursor-pointer"
          >
            Return to Resume Editor
          </button>
        </div>
      </div>
    </div>
  );
}
