"use client";

import React from "react";
import { Sparkles, ArrowRight, Zap, Shield, CheckCircle, Image as ImageIcon } from "lucide-react";

interface HeroProps {
  onScrollToUploader: () => void;
}

export function Hero({ onScrollToUploader }: HeroProps) {
  return (
    <section className="relative pt-8 pb-14 md:pt-14 md:pb-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Heading, Subtitle & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>1-Click High-Precision Cutout</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-[1.12]">
              Remove Backgrounds Online{" "}
              <span className="text-emerald-600 dark:text-emerald-400">
                Automatically in 1 Click
              </span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Remove backgrounds from any image online in 1 click. Isolate hair strands, portraits, e-commerce products, and logos with instant HD transparent PNG download. Fast, private, and free to use.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <button
                onClick={onScrollToUploader}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-sm bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Upload Image Now</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href="#comparison"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-sm bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border border-neutral-300 hover:border-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-800 dark:hover:border-neutral-700 transition-colors flex items-center justify-center gap-2"
              >
                <ImageIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>See Before & After</span>
              </a>
            </div>

            <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
              No registration required • Full HD output • 100% Free
            </p>
          </div>

          {/* Right Column: Hero Visual Showcase (Woman with background removed) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl p-2 bg-[#f3f5f4] dark:bg-[#151817] border border-neutral-200 dark:border-neutral-800 shadow-xl transition-all duration-200">
              {/* Card Header Label Bar */}
              <div className="flex items-center justify-between px-3 py-1.5 mb-2 text-xs font-semibold">
                <span className="text-neutral-600 dark:text-neutral-400">Original Photo</span>
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                  <Sparkles className="w-3 h-3" />
                  <span>Clean Cutout</span>
                </span>
              </div>

              {/* Main Image Container */}
              <div className="relative rounded-xl overflow-hidden border border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/samples/hero-woman.jpg"
                  alt="Woman portrait before and after background removal showcasing fine hair edge cutout"
                  className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />

                {/* Split indicator line in the center */}
                <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white/80 dark:bg-white/60 shadow-lg pointer-events-none">
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-neutral-950/80 text-white text-[10px] font-bold tracking-wider uppercase border border-white/30 backdrop-blur-sm">
                    Split
                  </div>
                </div>

                {/* Side badges */}
                <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm text-[11px] font-medium text-white">
                  Original Scene
                </div>
                <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-md bg-emerald-600/90 backdrop-blur-sm text-[11px] font-medium text-white flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-emerald-200" />
                  <span>Transparent Cutout</span>
                </div>
              </div>

              {/* Floating Feature Highlight */}
              <div className="mt-2.5 px-3 py-2 rounded-xl bg-white dark:bg-[#0c0e0d] border border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                    Hair Strand Edge Extraction
                  </span>
                </div>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                  Sub-pixel Alpha Matting
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics / Trust Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <p className="text-neutral-900 dark:text-white font-bold text-sm">~1.8s Speed</p>
              <p className="text-neutral-500 dark:text-neutral-400 text-xs">High-Speed In-Memory</p>
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
