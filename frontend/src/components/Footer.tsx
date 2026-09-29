"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Cpu, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-[#f3f5f4] dark:bg-[#090b0a] pt-14 pb-10 text-neutral-600 dark:text-neutral-400 text-xs transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Multi-Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-neutral-200 dark:border-neutral-800">
          
          {/* Brand Info Column (Spans 2 columns on md/lg screens) */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center transition-colors group-hover:border-emerald-500/50">
                <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="font-bold text-neutral-900 dark:text-white tracking-tight text-base">
                Remove Backgrounds<span className="text-emerald-600 dark:text-emerald-400"> Online</span>
              </span>
            </Link>

            <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm leading-relaxed">
              100% free, high-precision background removal. Isolate people, products, animals, and cars in 1 click with zero paywalls, zero credits, and zero data retention.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Free Unlimited Full HD Access</span>
            </div>
          </div>

          {/* Column 1: Tools & Features */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
              Tools &amp; Features
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/remove-background"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Remove Background
                </Link>
              </li>
              <li>
                <Link
                  href="/#how-it-works"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/#features"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Core Features
                </Link>
              </li>
              <li>
                <Link
                  href="/#comparison"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Before &amp; After
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Solutions & Use Cases */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
              Solutions
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/remove-bg-alternative"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  remove.bg Alternative
                </Link>
              </li>
              <li>
                <Link
                  href="/transparent-signature-maker"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Transparent Signature
                </Link>
              </li>
              <li>
                <Link
                  href="/white-background-product-photos"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Product Photos (Amazon)
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Blog &amp; Tutorials
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company & Legal */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
              Company &amp; Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/about"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500 dark:text-neutral-500">
          <p>
            © {new Date().getFullYear()} Remove Backgrounds Online. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400">
              <Cpu className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>ONNX CPU Engine</span>
            </span>
            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <span className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Ephemeral RAM Processing</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
