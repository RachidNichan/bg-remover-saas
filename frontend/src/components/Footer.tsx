"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Cpu, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-[#090b0a] py-12 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-neutral-850">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center transition-colors group-hover:border-emerald-500/50">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <span className="font-semibold text-white tracking-tight text-sm">
              Remove Backgrounds<span className="text-emerald-400 font-bold"> Online</span>
            </span>
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-6 text-neutral-400">
            <Link href="/#uploader" className="hover:text-white transition-colors">
              Online Remover
            </Link>
            <Link href="/#how-it-works" className="hover:text-white transition-colors">
              How It Works
            </Link>
            <Link href="/#comparison" className="hover:text-white transition-colors">
              Comparison
            </Link>
            <Link href="/#features" className="hover:text-white transition-colors">
              Features
            </Link>
            <Link href="/#faq" className="hover:text-white transition-colors">
              FAQ
            </Link>
            <Link href="/privacy" className="text-neutral-300 hover:text-white transition-colors font-medium">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-neutral-300 hover:text-white transition-colors font-medium">
              Terms of Service
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <p>
              © {new Date().getFullYear()} Remove Backgrounds Online. All rights reserved.
            </p>
            <span className="text-neutral-800 hidden sm:inline">•</span>
            <Link href="/privacy" className="hover:text-neutral-300 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-neutral-800">•</span>
            <Link href="/terms" className="hover:text-neutral-300 transition-colors">
              Terms of Service
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-neutral-400">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span>ONNX CPU Powered</span>
            </span>
            <span className="text-neutral-700">•</span>
            <span className="flex items-center gap-1 text-neutral-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ephemeral RAM Processing</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
