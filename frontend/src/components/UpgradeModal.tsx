"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { X, Zap, Sparkles, Check, CreditCard, ShieldCheck } from "lucide-react";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
  const { profile, addCredits } = useAuth();
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const credits = profile?.credits ?? 0;

  const handleSimulateTopup = async (amount: number, label: string) => {
    await addCredits(amount);
    setSuccessNotice(`Successfully added ${amount} credits! (${label})`);
    setTimeout(() => {
      setSuccessNotice(null);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-lg rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative bg-slate-950">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-indigo-500 p-0.5 mx-auto mb-3 shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Zap className="w-5 h-5 text-amber-400 fill-amber-400" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-white">
            {credits === 0 ? "You're Out of Credits" : "Recharge Your Credits"}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Current balance: <strong className="text-cyan-400">{credits} Credits</strong>. Choose a pack to keep creating.
          </p>
        </div>

        {successNotice && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs text-center font-medium">
            {successNotice}
          </div>
        )}

        {/* Credit Options */}
        <div className="space-y-3 mb-6">
          {/* 100 Credits Pro Pack (Recommended) */}
          <div className="glass-card rounded-2xl p-4 border border-indigo-500/50 bg-indigo-950/20 flex items-center justify-between gap-4 relative">
            <div className="absolute -top-2.5 right-4 px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500 text-white uppercase tracking-wider">
              Best Value
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">Creator Pack</span>
                <span className="text-xs text-indigo-300 font-semibold">(100 Credits)</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                $0.09 per removal • Priority queue • Full commercial license
              </p>
            </div>
            <button
              onClick={() => handleSimulateTopup(100, "Creator Pack")}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-bold text-xs shadow-md transition-all cursor-pointer whitespace-nowrap"
            >
              Get for $9
            </button>
          </div>

          {/* 25 Credits Starter */}
          <div className="glass-card rounded-2xl p-4 border border-slate-800 flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">Starter Pack</span>
                <span className="text-xs text-slate-400 font-semibold">(25 Credits)</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                $0.16 per removal • Instant download
              </p>
            </div>
            <button
              onClick={() => handleSimulateTopup(25, "Starter Pack")}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-all cursor-pointer whitespace-nowrap"
            >
              Get for $4
            </button>
          </div>
        </div>

        {/* Demo recharge shortcut */}
        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
          <p className="text-[11px] text-slate-400 mb-2">
            Local testing or evaluating the MVP?
          </p>
          <button
            onClick={() => handleSimulateTopup(10, "Demo Top-up")}
            className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>+10 Free Evaluation Credits</span>
          </button>
        </div>
      </div>
    </div>
  );
}
