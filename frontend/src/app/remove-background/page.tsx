"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { ImageUploader } from "@/components/ImageUploader";
import { ResultPreview } from "@/components/ResultPreview";
import { Footer } from "@/components/Footer";
import { AuthModal } from "@/components/AuthModal";
import { ProcessingResult } from "@/types";
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Cpu,
  ArrowRight,
  HelpCircle,
  CheckCircle2,
  Layers,
} from "lucide-react";

export default function RemoveBackgroundPage() {
  const [authOpen, setAuthOpen] = useState(false);
  const [processedResult, setProcessedResult] = useState<ProcessingResult | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 dark:bg-[#0c0e0d] dark:text-neutral-100 transition-colors duration-150">
      {/* Navigation */}
      <Navbar onOpenAuth={() => setAuthOpen(true)} />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header Title & Description */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-400 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Automatic Background Remover</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Remove Background Online
          </h1>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Upload any image to automatically isolate the subject and download a clean, high-definition transparent PNG in seconds. 100% free with zero paywalls.
          </p>
        </div>

        {/* Core Workspace: Image Uploader or Result Preview */}
        <div className="mb-12">
          {processedResult ? (
            <ResultPreview
              result={processedResult}
              onReset={() => setProcessedResult(null)}
            />
          ) : (
            <ImageUploader
              onProcessComplete={(result) => setProcessedResult(result)}
              onOpenAuth={() => setAuthOpen(true)}
            />
          )}
        </div>

        {/* Feature Highlights Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="p-4 rounded-2xl bg-[#f3f5f4] dark:bg-[#151817] border border-neutral-200 dark:border-neutral-800 transition-colors flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-neutral-900 dark:text-white">
                100% Free &amp; Unlimited
              </h3>
              <p className="text-[11px] text-neutral-600 dark:text-neutral-400 mt-0.5">
                No credits, subscriptions, or hidden charges.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#f3f5f4] dark:bg-[#151817] border border-neutral-200 dark:border-neutral-800 transition-colors flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-neutral-900 dark:text-white">
                Private &amp; Secure
              </h3>
              <p className="text-[11px] text-neutral-600 dark:text-neutral-400 mt-0.5">
                In-memory RAM processing. Photos are never stored.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#f3f5f4] dark:bg-[#151817] border border-neutral-200 dark:border-neutral-800 transition-colors flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center shrink-0">
              <Cpu className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-neutral-900 dark:text-white">
                Ultra-Fast Processing
              </h3>
              <p className="text-[11px] text-neutral-600 dark:text-neutral-400 mt-0.5">
                Accurate edge cutouts in ~1.5 to 2.5 seconds.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#f3f5f4] dark:bg-[#151817] border border-neutral-200 dark:border-neutral-800 transition-colors flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center shrink-0">
              <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-neutral-900 dark:text-white">
                Full HD Quality
              </h3>
              <p className="text-[11px] text-neutral-600 dark:text-neutral-400 mt-0.5">
                Crisp PNG downloads with original resolution.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Help & FAQ Banner */}
        <div className="p-6 rounded-2xl bg-[#f3f5f4] dark:bg-[#151817] border border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center shrink-0 text-emerald-600 dark:text-emerald-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white">
                Questions about image formats or cutout quality?
              </h4>
              <p className="text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-400">
                Check our Frequently Asked Questions for tips on lighting, file formats, and troubleshooting.
              </p>
            </div>
          </div>
          <Link
            href="/faq"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shrink-0"
          >
            <span>Read FAQ</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Auth Modal */}
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}
