import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles,
  ArrowLeft,
  ShieldCheck,
  Cpu,
  Zap,
  CheckCircle2,
  Lock,
  Heart,
  Globe2,
  Layers,
  ArrowRight,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "About Us | Remove Backgrounds Online",
  description:
    "Learn about Remove Backgrounds Online. We provide 100% free, privacy-first, high-precision background removal with zero paywalls, zero credits, and zero data retention.",
  alternates: {
    canonical: "https://removebackgrounds.online/about",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 dark:bg-[#0c0e0d] dark:text-neutral-100 transition-colors duration-150">
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full border-b border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-[#0c0e0d]/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 group transition-transform hover:scale-[1.02]"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <span className="font-bold text-base tracking-tight text-neutral-900 dark:text-white">
              Remove Backgrounds<span className="text-emerald-600 dark:text-emerald-400"> Online</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 dark:bg-[#151817] dark:hover:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to App</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        {/* Page Hero */}
        <div className="text-center sm:text-left mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 mb-4">
            <Heart className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Our Mission &amp; Purpose</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Making Background Removal Effortless &amp; Free for Everyone
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
            We built Remove Backgrounds Online because we believe essential creative tools should be fast, private, and accessible to anyone—without subscriptions, artificial credit limits, or watermarks.
          </p>
        </div>

        {/* Core Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
          <div className="p-6 rounded-2xl bg-[#f3f5f4] dark:bg-[#151817] border border-neutral-200 dark:border-neutral-800 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center mb-4">
              <Zap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-base font-bold text-neutral-900 dark:text-white mb-2">
              100% Free &amp; Unlimited
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              No subscription traps, no credits to buy, and no locked features. Process as many photos, product images, or personal portraits as you need with full HD resolution.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#f3f5f4] dark:bg-[#151817] border border-neutral-200 dark:border-neutral-800 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-base font-bold text-neutral-900 dark:text-white mb-2">
              Privacy by Design
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Your photos are processed purely in ephemeral server RAM and wiped immediately after delivery. We never save, inspect, or retain your images.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#f3f5f4] dark:bg-[#151817] border border-neutral-200 dark:border-neutral-800 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center mb-4">
              <Cpu className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-base font-bold text-neutral-900 dark:text-white mb-2">
              Optimized High-Speed Engine
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Powered by specialized high-performance image processing algorithms, delivering clean edges around hair, clothes, and transparent objects in 1-2 seconds.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#f3f5f4] dark:bg-[#151817] border border-neutral-200 dark:border-neutral-800 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center mb-4">
              <Layers className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-base font-bold text-neutral-900 dark:text-white mb-2">
              Clean &amp; Lightweight
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              No intrusive ads, no bloated scripts, and no popups asking for your credit card. A straightforward utility crafted to get your task done smoothly.
            </p>
          </div>
        </div>

        {/* Narrative Section */}
        <article className="space-y-8 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 mb-14">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <span>Why We Started</span>
            </h2>
            <p>
              Most online background removers follow the same frustrating pattern: you upload an image, see a nice preview, and are suddenly blocked by a paywall, forced to purchase &quot;credits&quot;, or forced to download a low-resolution thumbnail covered with a watermark.
            </p>
            <p>
              We believed there was a better way. With modern server optimization, high-quality background removal can be computed cleanly, efficiently, and cost-effectively. We designed Remove Backgrounds Online to be the utility we always wanted to use ourselves: instant, accurate, completely free, and completely respectful of user privacy.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <span>Who We Serve</span>
            </h2>
            <p>
              Remove Backgrounds Online is built for creators and professionals around the globe:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>E-commerce Sellers:</strong> Create crisp, pure-white or transparent product catalog photos for Shopify, Amazon, Etsy, and eBay.
              </li>
              <li>
                <strong>Designers &amp; Marketers:</strong> Prepare marketing assets, banners, social media thumbnails, and presentation slides in seconds.
              </li>
              <li>
                <strong>Photographers &amp; Creators:</strong> Isolate portrait subjects, create YouTube thumbnails, or extract elements for composite collages.
              </li>
              <li>
                <strong>Developers &amp; Students:</strong> Quick asset cleanup without needing heavy desktop photo editing software.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <span>Our Privacy Pledge</span>
            </h2>
            <p>
              We believe in data minimalism. Unlike many cloud services that store uploaded pictures or track user habits, our architecture has zero persistent image storage. Once your transparent PNG is generated and returned to your browser, all memory traces are instantly cleared.
            </p>
          </section>
        </article>

        {/* Call to action card */}
        <div className="p-8 rounded-2xl bg-[#f3f5f4] dark:bg-[#151817] border border-neutral-200 dark:border-neutral-800 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
              Try It Out Right Now
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
              No signup required. Upload a photo and see the instant cutout.
            </p>
          </div>
          <Link
            href="/#uploader"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shrink-0 shadow-sm"
          >
            <span>Remove Background</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
