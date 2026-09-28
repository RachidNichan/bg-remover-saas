import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles,
  ArrowLeft,
  HelpCircle,
  BookOpen,
  Image,
  Sliders,
  Smartphone,
  Download,
  CheckCircle2,
  AlertCircle,
  FileQuestion,
  ArrowRight,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "Help Center & User Guides | Remove Backgrounds Online",
  description:
    "Explore our user guides, tutorials, best practices for high-quality cutouts, and troubleshooting solutions for Remove Backgrounds Online.",
  alternates: {
    canonical: "https://removebackgrounds.online/help",
  },
};

export default function HelpPage() {
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
            <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Help Center &amp; Documentation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            How Can We Help You?
          </h1>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
            Everything you need to get flawless cutouts, master transparent PNGs, and resolve any question quickly.
          </p>
        </div>

        {/* Quick Nav Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <a
            href="#quick-start"
            className="p-4 rounded-xl bg-[#f3f5f4] dark:bg-[#151817] border border-neutral-200 dark:border-neutral-800 hover:border-emerald-500/40 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-2">
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold text-neutral-900 dark:text-white">Quick Start</h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">3-step process to remove backgrounds instantly.</p>
          </a>

          <a
            href="#quality-tips"
            className="p-4 rounded-xl bg-[#f3f5f4] dark:bg-[#151817] border border-neutral-200 dark:border-neutral-800 hover:border-emerald-500/40 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-2">
              <Image className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold text-neutral-900 dark:text-white">Quality Tips</h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Lighting and contrast advice for crisp edges.</p>
          </a>

          <a
            href="#troubleshooting"
            className="p-4 rounded-xl bg-[#f3f5f4] dark:bg-[#151817] border border-neutral-200 dark:border-neutral-800 hover:border-emerald-500/40 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-2">
              <AlertCircle className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold text-neutral-900 dark:text-white">Troubleshooting</h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Solutions for downloads, formats, and mobile.</p>
          </a>
        </div>

        {/* Detailed Guide Sections */}
        <div className="space-y-12">
          {/* Section 1: Quick Start */}
          <section id="quick-start" className="scroll-mt-24 space-y-4">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>1. Quick Start Guide</span>
            </h2>
            <div className="p-6 rounded-2xl bg-[#f3f5f4] dark:bg-[#151817] border border-neutral-200 dark:border-neutral-800 space-y-4 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">1</span>
                <div>
                  <strong className="text-neutral-900 dark:text-white block">Upload Your Image</strong>
                  <p className="text-neutral-600 dark:text-neutral-400 mt-0.5">Drag and drop your JPG, PNG, or WEBP file into the upload zone, or click to browse files on your device. You can also paste an image directly using <kbd className="px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-[11px] font-mono">Ctrl+V</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-[11px] font-mono">Cmd+V</kbd>.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">2</span>
                <div>
                  <strong className="text-neutral-900 dark:text-white block">Automatic AI Segmentation</strong>
                  <p className="text-neutral-600 dark:text-neutral-400 mt-0.5">In ~1.5 to 2.5 seconds, our AI model isolates the subject and removes the background entirely in server memory without saving any file to disk.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">3</span>
                <div>
                  <strong className="text-neutral-900 dark:text-white block">Choose Background &amp; Download</strong>
                  <p className="text-neutral-600 dark:text-neutral-400 mt-0.5">Keep the default transparent background, or switch to solid White, Dark, or Color presets. Click <strong>Download HD PNG</strong> to save your cutout in full resolution with the proper <code className="text-emerald-600 dark:text-emerald-400 font-mono text-xs">.png</code> extension.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Best Quality Tips */}
          <section id="quality-tips" className="scroll-mt-24 space-y-4">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <Image className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>2. Tips for Achieving the Cleanest Cutouts</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#f3f5f4] dark:bg-[#151817] border border-neutral-200 dark:border-neutral-800">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Optimal Subject Contrast</span>
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  The AI model separates subjects by detecting contrast and depth boundaries. Subjects with distinct separation from their background (e.g., a dark jacket against a light wall) produce razor-sharp edges.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#f3f5f4] dark:bg-[#151817] border border-neutral-200 dark:border-neutral-800">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>High Resolution Photos</span>
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Higher resolution images preserve individual hair strands, eyelash details, and product textures. You can upload photos up to 10MB and up to 4K resolution.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#f3f5f4] dark:bg-[#151817] border border-neutral-200 dark:border-neutral-800">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Even Lighting</span>
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Avoid extreme lens glare or backlighting that blows out the edge of the subject. Diffused daylight or soft studio lighting gives the most precise cutout results.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#f3f5f4] dark:bg-[#151817] border border-neutral-200 dark:border-neutral-800">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Supported Formats</span>
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  All standard digital photo formats are supported: <strong>JPG / JPEG</strong>, <strong>PNG</strong>, and <strong>WEBP</strong>. Outputs are always delivered in universal PNG format with alpha transparency.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Troubleshooting */}
          <section id="troubleshooting" className="scroll-mt-24 space-y-4">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>3. Troubleshooting Common Issues</span>
            </h2>
            <div className="space-y-3">
              <div className="p-5 rounded-2xl bg-[#f3f5f4] dark:bg-[#151817] border border-neutral-200 dark:border-neutral-800">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-1.5">
                  Why does the transparent background look black in my photo viewer?
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Many default image viewers (like Windows Photos or certain phone galleries) display transparent areas as solid black or gray because there is no background color beneath them. Rest assured, your file is a real transparent PNG: when you import it into Photoshop, Canva, Figma, or a website, the background is 100% transparent.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#f3f5f4] dark:bg-[#151817] border border-neutral-200 dark:border-neutral-800">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-1.5">
                  The download didn&apos;t trigger when clicking the button.
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Some browser security settings or ad-blocker extensions block programmatic downloads. If clicking &quot;Download HD PNG&quot; doesn&apos;t initiate the save dialog, check your browser&apos;s download bar or permission prompt at the top of the window, or right-click the cutout preview and select &quot;Save Image As...&quot;.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#f3f5f4] dark:bg-[#151817] border border-neutral-200 dark:border-neutral-800">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-1.5">
                  Can I use this on my iPhone, iPad, or Android phone?
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Yes! Remove Backgrounds Online is fully responsive. When you tap the upload zone on a mobile device, you can choose a photo from your photo library or take a photo directly with your camera. The transparent cutout can be saved straight to your camera roll.
                </p>
              </div>
            </div>
          </section>

          {/* Need More Assistance Banner */}
          <div className="p-6 rounded-2xl bg-[#f3f5f4] dark:bg-[#151817] border border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white">
                Have a specific question not covered here?
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                Browse our complete FAQ or send our support team a direct message.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/faq"
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white transition-colors"
              >
                View FAQ
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
