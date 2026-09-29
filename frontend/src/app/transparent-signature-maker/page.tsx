import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles,
  ArrowLeft,
  FileCheck,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Lock,
  Download,
  HelpCircle,
  FileText,
  PenTool,
  ChevronRight,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";
import { InteractiveRemoverWorkspace } from "@/components/InteractiveRemoverWorkspace";

export const metadata: Metadata = {
  title: "Free Transparent Signature Maker — Turn Signatures into Transparent PNGs",
  description:
    "Convert your handwritten signature into a clean, transparent PNG in 1 click. Easily sign PDF documents, contracts, and digital invoices without gray background boxes.",
  keywords: [
    "transparent signature maker",
    "make signature transparent online",
    "remove background from signature",
    "transparent signature for pdf",
    "convert signature to transparent png",
    "digital signature transparent background free",
    "digitize pen signature online",
    "sign pdf without gray box",
  ],
  alternates: {
    canonical: "https://removebackgrounds.online/transparent-signature-maker",
  },
  openGraph: {
    title: "Free Transparent Signature Maker — Remove Backgrounds Online",
    description:
      "Isolate handwritten signatures from paper snapshots into lossless transparent PNG files for signing PDFs, Word documents, and contracts.",
    url: "https://removebackgrounds.online/transparent-signature-maker",
    siteName: "Remove Backgrounds Online",
    type: "website",
    images: [
      {
        url: "https://removebackgrounds.online/blog/transparent-signature-guide.jpg",
        width: 1200,
        height: 675,
        alt: "Transparent Signature Maker for Digital Documents",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Transparent Signature Maker — Turn Signatures into Transparent PNGs",
    description:
      "Convert photographed paper signatures into clean 32-bit transparent PNGs for PDF contracts.",
    images: ["https://removebackgrounds.online/blog/transparent-signature-guide.jpg"],
  },
};

const FAQS = [
  {
    question: "How do I make my handwritten signature transparent for PDFs?",
    answer:
      "Sign your name on clean white paper using a dark black or blue pen, take a clear photo with your smartphone, and upload it above. Our engine isolates the ink strokes from the paper background and converts the white paper into 100% alpha transparency. Download the PNG and insert it directly into your PDF reader.",
  },
  {
    question: "Why do signatures photographed with a phone have an ugly gray box?",
    answer:
      "Phone cameras capture ambient indoor shadows, paper texture, and off-white room lighting. When you paste that photo into a document, the camera's captured paper color clashes with the pure white digital page. Transparent PNG isolation removes every background pixel so only the ink appears.",
  },
  {
    question: "Is my signature kept private and secure?",
    answer:
      "Absolutely. We understand that your signature is a sensitive legal identifier. Remove Backgrounds Online processes your image strictly in temporary server RAM and purges it immediately upon download. We never store, catalog, inspect, or retain your signature files in any database.",
  },
  {
    question: "How do I insert the transparent signature into Adobe Acrobat or Google Docs?",
    answer:
      "In Adobe Acrobat, go to Tools > Fill & Sign > Sign Yourself > Add Signature > Image, and select your transparent PNG. In Google Docs or Microsoft Word, click Insert > Image, choose In Front of Text, and position your signature neatly over the signature line.",
  },
  {
    question: "Is this signature tool completely free to use?",
    answer:
      "Yes. There are zero credit limits, no subscription paywalls, and no account registrations required. You can digitize as many signatures as you need in full original resolution.",
  },
];

export default function TransparentSignatureMakerPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Transparent Signature Maker",
      applicationCategory: "OfficeApplication",
      operatingSystem: "All (Web Browser)",
      url: "https://removebackgrounds.online/transparent-signature-maker",
      description:
        "Free utility to convert handwritten pen signatures into clean 32-bit transparent PNGs for PDF contracts, digital invoices, and document signing.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      creator: {
        "@type": "Person",
        name: "Rachid Nichan",
        url: "https://removebackgrounds.online/about",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://removebackgrounds.online",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Transparent Signature Maker",
          item: "https://removebackgrounds.online/transparent-signature-maker",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 dark:bg-[#0c0e0d] dark:text-neutral-100 transition-colors duration-150">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-16 w-full">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 mb-6">
          <Link href="/" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-neutral-400" />
          <span className="text-neutral-700 dark:text-neutral-300 font-medium">
            Transparent Signature Maker
          </span>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 mb-4">
            <PenTool className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Digital Document Utility</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
            Free Transparent Signature Maker for PDFs &amp; Documents
          </h1>

          <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Turn your handwritten pen signature into a clean, transparent PNG in 1 click. Stamp contracts, NDAs, and invoices without gray shadow boxes or obscured text.
          </p>
        </div>

        {/* Interactive Workspace */}
        <div className="mb-16 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-[#f3f5f4]/50 dark:bg-[#151817]/50 p-4 sm:p-6 shadow-sm">
          <div className="text-center mb-4">
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Upload Your Signature Photo
            </span>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              JPG, PNG, or WebP. Background paper is automatically converted to full transparency.
            </p>
          </div>
          <InteractiveRemoverWorkspace />
        </div>

        {/* Privacy Callout Banner */}
        <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/25 flex flex-col sm:flex-row items-center gap-4 mb-16">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-center sm:text-left text-xs sm:text-sm">
            <h2 className="font-bold text-neutral-900 dark:text-white text-sm sm:text-base">
              100% Privacy Guaranteed for Sensitive Signatures
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
              Signatures are legal identifiers. Our platform processes your image in volatile RAM and purges it immediately upon completion. We never store, log, or keep copies of your documents.
            </p>
          </div>
        </div>

        {/* 3 Simple Steps */}
        <section className="mb-16">
          <div className="text-center sm:text-left mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
              How to Create Your Transparent Signature in 3 Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#f3f5f4] dark:bg-[#151817] border border-neutral-200 dark:border-neutral-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center font-bold text-emerald-600 dark:text-emerald-400 mb-4">
                1
              </div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2">
                Write &amp; Photograph
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Sign on plain white paper using a dark black or blue pen. Snap a clear photo with your phone camera directly from above.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#f3f5f4] dark:bg-[#151817] border border-neutral-200 dark:border-neutral-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center font-bold text-emerald-600 dark:text-emerald-400 mb-4">
                2
              </div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2">
                Upload to Transparent Maker
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Drag and drop your photo above. The engine isolates every ink curve and converts the paper to a transparent alpha channel.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#f3f5f4] dark:bg-[#151817] border border-neutral-200 dark:border-neutral-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center font-bold text-emerald-600 dark:text-emerald-400 mb-4">
                3
              </div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2">
                Download &amp; Sign Any PDF
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Download your transparent 32-bit PNG. Stamp it onto Acrobat PDFs, Google Docs, Word files, or invoices with zero background friction.
              </p>
            </div>
          </div>
        </section>

        {/* Supported Software Table */}
        <section className="mb-16">
          <div className="text-center sm:text-left mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
              Compatible with All Major Document Apps
            </h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Your transparent signature PNG works universally across all digital signing and word processing tools.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl bg-[#f3f5f4] dark:bg-[#151817] border border-neutral-200 dark:border-neutral-800">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-600 flex items-center justify-center font-bold text-xs mb-3">
                PDF
              </div>
              <h3 className="font-bold text-neutral-900 dark:text-white text-sm mb-1">
                Adobe Acrobat
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Tools &gt; Fill &amp; Sign &gt; Add Signature Image
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#f3f5f4] dark:bg-[#151817] border border-neutral-200 dark:border-neutral-800">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold text-xs mb-3">
                DOC
              </div>
              <h3 className="font-bold text-neutral-900 dark:text-white text-sm mb-1">
                Google Docs
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Insert &gt; Image &gt; Wrap Text Over Line
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#f3f5f4] dark:bg-[#151817] border border-neutral-200 dark:border-neutral-800">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 flex items-center justify-center font-bold text-xs mb-3">
                WD
              </div>
              <h3 className="font-bold text-neutral-900 dark:text-white text-sm mb-1">
                Microsoft Word
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Insert Picture &gt; In Front of Text
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#f3f5f4] dark:bg-[#151817] border border-neutral-200 dark:border-neutral-800">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-xs mb-3">
                OS
              </div>
              <h3 className="font-bold text-neutral-900 dark:text-white text-sm mb-1">
                Apple Preview
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Markup Toolbar &gt; Sign Document
              </p>
            </div>
          </div>
        </section>

        {/* Read Full Tutorial Guide Card */}
        <div className="mb-16 p-6 rounded-2xl bg-[#f3f5f4] dark:bg-[#151817] border border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-neutral-900 dark:text-white text-sm sm:text-base">
                Looking for a detailed step-by-step walkthrough?
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                Read our in-depth guide on creating transparent signatures for PDF contracts and legal forms.
              </p>
            </div>
          </div>
          <Link
            href="/blog/create-transparent-signature-pdf-documents"
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 transition-colors shrink-0"
          >
            <span>Read Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* FAQ Section */}
        <section className="mb-16">
          <div className="text-center sm:text-left mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 mb-3">
              <HelpCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Questions &amp; Answers</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-[#f3f5f4] dark:bg-[#151817] border border-neutral-200 dark:border-neutral-800"
              >
                <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
