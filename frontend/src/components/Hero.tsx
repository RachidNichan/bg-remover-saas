"use client";

import React from "react";
import { Sparkles, ArrowRight, Zap, Shield, CheckCircle, Image as ImageIcon } from "lucide-react";

interface HeroProps {
  onScrollToUploader: () => void;
}

export function Hero({ onScrollToUploader }: HeroProps) {
  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-[1.15]">
          Remove Backgrounds Online{" "}
          <span className="text-emerald-600 dark:text-emerald-400">
            with 100% Automatic AI
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed">
          Remove backgrounds from any image online in 1 click. Isolate hair strands, portraits, e-commerce products, and logos with instant HD transparent PNG download. Fast, private, and free to use.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={onScrollToUploader}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-sm bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Upload Image Now</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <a
            href="#comparison"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-sm bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border border-neutral-300 hover:border-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-800 dark:hover:border-neutral-700 transition-colors flex items-center justify-center gap-2"
          >
            <ImageIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Interactive Demo</span>
          </a>
        </div>

        {/* Key Metrics / Trust Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <p className="text-neutral-900 dark:text-white font-bold text-sm">~1.8s Speed</p>
              <p className="text-neutral-500 dark:text-neutral-400 text-xs">CPU ONNX Optimized</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-neutral-900 dark:text-white font-bold text-sm">Fine Hair Edges</p>
              <p className="text-neutral-500 dark:text-neutral-400 text-xs">Sub-pixel Alpha Matting</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <p className="text-neutral-900 dark:text-white font-bold text-sm">100% Private</p>
              <p className="text-neutral-500 dark:text-neutral-400 text-xs">Images Never Stored</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
              <CheckCircle className="w-4 h-4" />
            </div>
            <div>
              <p className="text-neutral-900 dark:text-white font-bold text-sm">Full HD PNG</p>
              <p className="text-neutral-500 dark:text-neutral-400 text-xs">Transparent Cutout</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
