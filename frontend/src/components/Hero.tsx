"use client";

import React from "react";
import { Sparkles, ArrowRight, Zap, Shield, CheckCircle, Image as ImageIcon } from "lucide-react";

interface HeroProps {
  onScrollToUploader: () => void;
}

export function Hero({ onScrollToUploader }: HeroProps) {
  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/15 to-cyan-500/20 rounded-full blur-[110px] pointer-events-none -z-10 animate-pulse-slow" />
      <div className="absolute top-12 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none -z-10" />
      <div className="absolute top-24 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Top Feature Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-slate-900/90 border border-indigo-500/30 text-indigo-300 mb-6 shadow-sm hover:border-indigo-400/50 transition-colors">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: "6s" }} />
          <span>100% Free Online AI Background Remover • Zero Installation</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span className="text-slate-400">3 Free Credits</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
          Remove Backgrounds Online{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
            with 100% Automatic AI
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Remove backgrounds from any image online in 1 click. Isolate hair strands, portraits, e-commerce products, and logos with instant HD transparent PNG download. Fast, private, and free to try.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={onScrollToUploader}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Upload Image Now</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <a
            href="#comparison"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-sm bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-slate-600 transition-all flex items-center justify-center gap-2"
          >
            <ImageIcon className="w-4 h-4 text-cyan-400" />
            <span>Interactive Demo</span>
          </a>
        </div>

        {/* Key Metrics / Trust Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">~1.8s Speed</p>
              <p className="text-slate-400 text-xs">CPU ONNX Optimized</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">Fine Hair Edges</p>
              <p className="text-slate-400 text-xs">Sub-pixel Alpha Matting</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">100% Private</p>
              <p className="text-slate-400 text-xs">Images Never Stored</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <CheckCircle className="w-4 h-4" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">Full HD PNG</p>
              <p className="text-slate-400 text-xs">Transparent Cutout</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
