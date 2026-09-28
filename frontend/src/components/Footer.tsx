"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Cpu, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-500 to-cyan-400 p-[1px] transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              </div>
            </div>
            <span className="font-bold text-white tracking-tight text-sm">
              Remove Backgrounds<span className="text-cyan-400"> Online</span>
            </span>
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400">
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
            <Link href="/privacy" className="text-slate-300 hover:text-white transition-colors font-medium">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-slate-300 hover:text-white transition-colors font-medium">
              Terms of Service
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <p>
              © {new Date().getFullYear()} Remove Backgrounds Online. All rights reserved.
            </p>
            <span className="text-slate-800 hidden sm:inline">•</span>
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-slate-800">•</span>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              <span>ONNX CPU Powered</span>
            </span>
            <span className="text-slate-700">•</span>
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ephemeral RAM Processing</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
