"use client";

import React from "react";
import { Check, Sparkles, Zap, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface PricingProps {
  onOpenUpgrade: () => void;
  onOpenAuth: () => void;
}

export function Pricing({ onOpenUpgrade, onOpenAuth }: PricingProps) {
  const { user, profile } = useAuth();
  const credits = profile?.credits ?? 3;

  return (
    <section id="pricing" className="py-16 md:py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Transparent Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Simple, Credit-Based Plans
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Get started with 3 free credits on signup. Top up credits whenever you need them without hidden subscriptions.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Free Tier */}
          <div className="glass-card rounded-3xl p-8 flex flex-col justify-between border-slate-800">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Free Trial</h3>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-800 text-slate-300">
                  Included
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Ideal for testing out the cutout quality on your own photos.
              </p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">$0</span>
                <span className="text-xs text-slate-400">/ forever</span>
              </div>

              <ul className="mt-8 space-y-3.5 text-xs text-slate-300">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>3 Free HD Credits</strong> on Signup</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Full HD Transparent PNG Export</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Standard CPU Processing Queue</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Web Drag & Drop Tool</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4">
              <button
                onClick={user ? undefined : onOpenAuth}
                disabled={Boolean(user)}
                className={`w-full py-3 rounded-xl text-xs font-semibold transition-all ${
                  user
                    ? "bg-slate-800 text-slate-400 cursor-default"
                    : "bg-slate-800 hover:bg-slate-700 text-white cursor-pointer"
                }`}
              >
                {user ? `Active (${credits} credits left)` : "Sign Up Free"}
              </button>
            </div>
          </div>

          {/* Pro Tier (Popular) */}
          <div className="glass-card rounded-3xl p-8 flex flex-col justify-between border-indigo-500/50 relative shadow-2xl shadow-indigo-500/10">
            {/* Most popular glowing badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[11px] font-bold bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>MOST POPULAR</span>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Creator Pro</h3>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-500/20 text-indigo-300">
                  100 Credits
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Designed for e-commerce sellers, designers, and active creators.
              </p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">$9</span>
                <span className="text-xs text-slate-400">/ 100 pack (or $9/mo)</span>
              </div>

              <ul className="mt-8 space-y-3.5 text-xs text-slate-300">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span><strong>100 High-Res Cutout Credits</strong></span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Priority In-Memory Inference Queue</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Sub-pixel Hair & Fur Alpha Matting</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Custom Solid & Gradient Backgrounds</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Full Commercial License</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4">
              <button
                onClick={onOpenUpgrade}
                className="w-full py-3.5 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-500 via-purple-600 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white shadow-lg shadow-indigo-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                <span>Upgrade to Pro ($9)</span>
              </button>
            </div>
          </div>

          {/* Unlimited / Business Tier */}
          <div className="glass-card rounded-3xl p-8 flex flex-col justify-between border-slate-800">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Business API</h3>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-800 text-slate-300">
                  Self-Hosted / VPS
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Ideal for high volume platforms, automated pipelines, and agencies.
              </p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">$29</span>
                <span className="text-xs text-slate-400">/ month</span>
              </div>

              <ul className="mt-8 space-y-3.5 text-xs text-slate-300">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Unlimited Background Removals</strong></span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Direct REST API Key Access</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Ready for Ubuntu VPS Docker Deployment</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Max 25MB File Size Limit</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Priority Technical Support</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4">
              <button
                onClick={onOpenUpgrade}
                className="w-full py-3 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition-all cursor-pointer"
              >
                Contact for Enterprise
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
