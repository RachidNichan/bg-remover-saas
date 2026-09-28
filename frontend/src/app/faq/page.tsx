"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowLeft,
  HelpCircle,
  ChevronDown,
  Mail,
  ShieldCheck,
  Zap,
  Cpu,
  Layers,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";

interface FAQItem {
  q: string;
  a: string;
  category: "general" | "quality" | "privacy" | "troubleshooting";
}

const ALL_FAQS: FAQItem[] = [
  // General
  {
    q: "Is Remove Backgrounds Online really 100% free?",
    a: "Yes! Remove Backgrounds Online is completely free with unlimited image removals. There are no hidden subscription charges, credit limits, or watermarks placed on your images. You can process as many personal or commercial photos as you want at zero cost.",
    category: "general",
  },
  {
    q: "Do I need to create an account or sign in to use the service?",
    a: "No! Account creation is 100% optional. You can simply drag and drop your image on the homepage and download your transparent cutout immediately without registering.",
    category: "general",
  },
  {
    q: "Are there any daily limits or throttling on image processing?",
    a: "No. You can remove backgrounds from as many images as you need throughout the day without daily quota caps.",
    category: "general",
  },
  {
    q: "Can I use the transparent cutouts for commercial projects?",
    a: "Yes, absolutely! You retain 100% ownership of your photos and generated cutouts. You are free to use them for e-commerce listings (Amazon, Shopify, eBay), advertising campaigns, marketing materials, social media, and client work.",
    category: "general",
  },

  // Quality & Processing
  {
    q: "How does the tool isolate complex edges like hair and fur?",
    a: "We utilize high-precision edge detection and object isolation algorithms. The system analyzes contrast and fine details across the image, producing an ultra-precise alpha transparency mask that cleanly separates flyaway hair, glass transparency, and fine textures.",
    category: "quality",
  },
  {
    q: "Does the service reduce the resolution or downscale my images?",
    a: "No. Your output transparent PNG maintains the full native resolution of your uploaded image. We do not artificially downscale your photos to force you to pay for HD quality.",
    category: "quality",
  },
  {
    q: "What file formats and image sizes are supported?",
    a: "We support JPG, JPEG, PNG, and WEBP formats up to 10MB per image. High-definition images up to 4K resolution are processed seamlessly.",
    category: "quality",
  },
  {
    q: "Why is the processing so fast and responsive?",
    a: "Our backend is built with Python FastAPI and operates with pre-warmed memory optimization. The processing engine remains in server RAM, allowing fast in-memory cutouts in approximately 1.5 to 2.5 seconds without cold-start delays or slow disk operations.",
    category: "quality",
  },

  // Privacy & Security
  {
    q: "Are my uploaded photos stored on disk or in a database?",
    a: "Never. All image uploads are processed purely in ephemeral server RAM (memory) and immediately purged once the transparent PNG is delivered back to your browser. We never write your uploaded images to persistent disk or cloud storage.",
    category: "privacy",
  },
  {
    q: "Do you store, sell, or retain uploaded photos?",
    a: "No. We have a strict zero-data-retention policy. Your photos are never saved, indexed, aggregated, or retained. Once the background is removed, the data is immediately purged from memory.",
    category: "privacy",
  },
  {
    q: "Is my image upload secure and encrypted in transit?",
    a: "Yes. All communications between your browser and our servers are encrypted using modern TLS/HTTPS encryption, preventing interception or unauthorized access.",
    category: "privacy",
  },
  {
    q: "Can other users or third parties see the images I process?",
    a: "No. Your requests are processed in isolated memory streams unique to your session. No public gallery or shared image feed exists.",
    category: "privacy",
  },

  // Troubleshooting
  {
    q: "Why does the transparent background look black in my photo viewer?",
    a: "Many standard operating system image viewers (such as Windows Photos or default phone galleries) do not display the transparent alpha checkerboard, and instead render empty transparent regions as solid black or gray. When you place your PNG into Canva, Photoshop, Figma, or any website, the background is 100% transparent.",
    category: "troubleshooting",
  },
  {
    q: "What should I do if the download does not start?",
    a: "Check if your web browser has an active popup or download blocker prompt. When you click 'Download HD PNG', your browser should automatically trigger a download for '[filename]-no-bg.png'. You can also right-click (or long-tap on mobile) the cutout preview and select 'Save Image As...'.",
    category: "troubleshooting",
  },
  {
    q: "Can I use Remove Backgrounds Online on my iPhone or Android device?",
    a: "Yes! The site is fully mobile-friendly. You can tap the uploader to pick an existing image from your camera roll or snap a brand-new photo directly with your device's camera.",
    category: "troubleshooting",
  },
  {
    q: "Can I replace the transparent background with solid colors like white or black?",
    a: "Yes! In the result preview area, you will find background presets including Transparent, Pure White, Sleek Dark, Studio Slate, and Emerald. You can switch between them instantly before downloading.",
    category: "troubleshooting",
  },
];

type CategoryKey = "all" | "general" | "quality" | "privacy" | "troubleshooting";

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs =
    selectedCategory === "all"
      ? ALL_FAQS
      : ALL_FAQS.filter((item) => item.category === selectedCategory);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

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
        <div className="text-center sm:text-left mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Questions &amp; Answers</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
            Everything you need to know about our free background remover tool, image quality, privacy architecture, and troubleshooting.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-neutral-200 dark:border-neutral-800 pb-4">
          {[
            { key: "all", label: "All Questions" },
            { key: "general", label: "General & Free Plan" },
            { key: "quality", label: "Quality & Processing" },
            { key: "privacy", label: "Privacy & Security" },
            { key: "troubleshooting", label: "Troubleshooting" },
          ].map((cat) => {
            const isActive = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => {
                  setSelectedCategory(cat.key as CategoryKey);
                  setOpenIndex(null);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  isActive
                    ? "bg-emerald-600 text-white font-semibold"
                    : "bg-[#f3f5f4] dark:bg-[#151817] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white border border-neutral-200 dark:border-neutral-800"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Accordion FAQ List */}
        <div className="space-y-3 mb-12">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-[#f3f5f4] dark:bg-[#151817] overflow-hidden transition-colors hover:border-neutral-300 dark:hover:border-neutral-700"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-500 dark:text-neutral-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-emerald-600 dark:text-emerald-400" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed border-t border-neutral-200 dark:border-neutral-800">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#f3f5f4] dark:bg-[#151817] border border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
              Still have a question?
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
              Can’t find what you are looking for? Our friendly team is ready to help.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shrink-0"
          >
            <Mail className="w-4 h-4" />
            <span>Contact Support</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
