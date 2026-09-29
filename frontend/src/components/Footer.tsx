"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Cpu, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-[#f3f5f4] dark:bg-[#090b0a] py-12 text-neutral-600 dark:text-neutral-400 text-xs transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-neutral-200 dark:border-neutral-800">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center transition-colors group-hover:border-emerald-500/50">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <span className="font-semibold text-neutral-900 dark:text-white tracking-tight text-sm">
              Remove Backgrounds<span className="text-emerald-600 dark:text-emerald-400 font-bold"> Online</span>
            </span>
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-neutral-600 dark:text-neutral-400">
            <Link href="/remove-background" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              Remove Background
            </Link>
            <Link href="/#how-it-works" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              How It Works
            </Link>
            <Link href="/blog" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              Blog
            </Link>
            <Link href="/remove-bg-alternative" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              remove.bg Alternative
            </Link>
            <Link href="/transparent-signature-maker" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              Transparent Signature
            </Link>
            <Link href="/white-background-product-photos" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              Product Photos
            </Link>
            <Link href="/about" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              About Us
            </Link>
            <Link href="/help" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              Help Center
            </Link>
            <Link href="/faq" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              FAQ
            </Link>
            <Link href="/contact" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              Contact Us
            </Link>
            <Link href="/privacy" className="text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white transition-colors font-medium">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white transition-colors font-medium">
              Terms of Service
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500 dark:text-neutral-500">
          <p>
            © {new Date().getFullYear()} Remove Backgrounds Online. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-neutral-600 dark:text-neutral-400">
              <Cpu className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>ONNX CPU Powered</span>
            </span>
            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <span className="flex items-center gap-1 text-neutral-600 dark:text-neutral-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Ephemeral RAM Processing</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
