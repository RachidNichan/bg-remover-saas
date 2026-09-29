import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Zap,
  Lock,
  Layers,
  HelpCircle,
  ArrowRight,
  Download,
  Image as ImageIcon,
  Check,
  ChevronRight,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";
import { InteractiveRemoverWorkspace } from "@/components/InteractiveRemoverWorkspace";

export const metadata: Metadata = {
  title: "Best Free Remove.bg Alternative (2026) — 100% Free Full HD No Credits",
  description:
    "Looking for a free alternative to remove.bg? Remove Backgrounds Online delivers 100% free Full HD transparent PNG cutouts with zero credits, no forced sign-ups, and no watermarks.",
  keywords: [
    "remove.bg alternative",
    "free remove bg alternative",
    "best remove bg alternatives",
    "remove bg full resolution free",
    "remove bg without paying",
    "remove background online no credits",
    "free background remover full hd",
    "remove bg alternative no signup",
    "free transparent png background remover",
  ],
  alternates: {
    canonical: "https://removebackgrounds.online/remove-bg-alternative",
  },
  openGraph: {
    title: "Best Free Remove.bg Alternative — 100% Free Full HD No Credits",
    description:
      "Tired of 500px downscaled previews and expensive credit paywalls on remove.bg? Download full HD transparent PNG cutouts completely free.",
    url: "https://removebackgrounds.online/remove-bg-alternative",
    siteName: "Remove Backgrounds Online",
    type: "website",
    images: [
      {
        url: "https://removebackgrounds.online/samples/portrait-after.png",
        width: 1024,
        height: 1024,
        alt: "Remove Backgrounds Online - The Free Remove.bg Alternative",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Free Remove.bg Alternative (2026) — 100% Free Full HD",
    description:
      "Download studio-grade transparent PNG cutouts in Full HD without paywalls or credits.",
    images: ["https://removebackgrounds.online/samples/portrait-after.png"],
  },
};

const COMPARISON_ROWS = [
  {
    feature: "Pricing Model",
    ourTool: "100% Free Forever",
    competitor: "Freemium ($0.20 – $1.99 per credit)",
    ourHighlight: true,
  },
  {
    feature: "Free Download Resolution",
    ourTool: "Full HD & Original Resolution (Up to 4K)",
    competitor: "Downscaled Preview (~0.25 MP / 500x500 px)",
    ourHighlight: true,
  },
  {
    feature: "Credit / Subscription System",
    ourTool: "No Credits Needed (Unlimited Free Use)",
    competitor: "Credits Required for Full HD",
    ourHighlight: true,
  },
  {
    feature: "Mandatory Account Registration",
    ourTool: "No Sign-Up Required (Instant Guest Access)",
    competitor: "Forced Sign-Up for 1 HD Preview",
    ourHighlight: true,
  },
  {
    feature: "Watermarks on Free Downloads",
    ourTool: "Zero Watermarks",
    competitor: "Zero Watermarks (on paid plans)",
    ourHighlight: true,
  },
  {
    feature: "Privacy & Data Storage",
    ourTool: "Ephemeral RAM Processing (Zero File Retention)",
    competitor: "Images Stored in User Account Gallery",
    ourHighlight: true,
  },
  {
    feature: "Output Format",
    ourTool: "Lossless 32-bit Transparent PNG",
    competitor: "PNG / JPG",
    ourHighlight: false,
  },
  {
    feature: "Hair & Complex Edge Isolation",
    ourTool: "Sub-pixel Edge Detection",
    competitor: "Edge Detection Engine",
    ourHighlight: false,
  },
  {
    feature: "Tracking & Script Clutter",
    ourTool: "Ultra-Lightweight & Fast Core Web Vitals",
    competitor: "Heavy Third-Party Marketing Trackers",
    ourHighlight: true,
  },
];

const FAQS = [
  {
    question: "Is there a completely free alternative to remove.bg?",
    answer:
      "Yes. Remove Backgrounds Online was built specifically as a 100% free alternative to remove.bg. You can upload any image and download original, high-definition transparent PNG cutouts without paying for subscription plans or credit packs.",
  },
  {
    question: "Why does remove.bg downgrade free download resolution?",
    answer:
      "remove.bg operates on a freemium business model where free downloads are capped at low-resolution previews (typically around 0.25 megapixels or 500x500 pixels). To unlock your original resolution, they require users to buy credits or commit to a monthly subscription. Remove Backgrounds Online does not downscale your images—you receive your full original resolution for free.",
  },
  {
    question: "Do I need to create an account or provide an email to download Full HD?",
    answer:
      "No. Unlike remove.bg, which requires you to register an account and verify an email address to obtain a single free HD test download, Remove Backgrounds Online allows instant guest processing. You can upload and download immediately with zero friction.",
  },
  {
    question: "Does Remove Backgrounds Online add watermarks to free cutouts?",
    answer:
      "Never. All images processed through Remove Backgrounds Online are delivered as clean, uncompressed 32-bit transparent PNG files without any watermarks, branding, or degradation.",
  },
  {
    question: "How does the privacy of Remove Backgrounds Online compare to remove.bg?",
    answer:
      "remove.bg stores uploaded images in cloud account galleries and tracks user activities across commercial ad platforms. Remove Backgrounds Online prioritizes privacy by processing photos exclusively in temporary server RAM. Once your download is complete, the file is automatically purged from memory. We never retain, inspect, or sell your imagery.",
  },
  {
    question: "Can I use the downloaded cutouts for commercial and e-commerce projects?",
    answer:
      "Yes. You retain 100% ownership of your processed images. Cutouts can be used immediately for Amazon product listings, Shopify stores, YouTube thumbnails, client branding, advertising, and personal graphic design.",
  },
];

export default function RemoveBgAlternativePage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Remove Backgrounds Online - Free Remove.bg Alternative",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "All (Modern Web Browsers)",
      url: "https://removebackgrounds.online/remove-bg-alternative",
      description:
        "A 100% free alternative to remove.bg that provides original Full HD background removal with zero paywalls, zero credits, and no sign-up required.",
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
          name: "Remove.bg Alternative",
          item: "https://removebackgrounds.online/remove-bg-alternative",
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

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-16 w-full">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 mb-6">
          <Link href="/" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-neutral-400" />
          <span className="text-neutral-700 dark:text-neutral-300 font-medium">
            remove.bg Alternative
          </span>
        </nav>

        {/* Hero Headline Section */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>The #1 Free Alternative to remove.bg</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
            The 100% Free Remove.bg Alternative with Full HD Downloads
          </h1>

          <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Tired of low-resolution 500px previews and expensive credit paywalls on remove.bg?{" "}
            <strong className="text-neutral-900 dark:text-white font-semibold">
              Remove Backgrounds Online
            </strong>{" "}
            delivers original Full HD cutouts with zero credits, no forced sign-ups, and complete privacy.
          </p>
        </div>

        {/* Interactive Workspace Uploader (Embedded directly on page) */}
        <div className="mb-16 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-[#f3f5f4]/50 dark:bg-[#151817]/50 p-4 sm:p-6 shadow-sm">
          <div className="text-center mb-4">
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Try It Right Now For Free
            </span>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Upload your image below to experience full resolution cutouts with zero paywalls.
            </p>
          </div>
          <InteractiveRemoverWorkspace />
        </div>

        {/* Feature Comparison Table */}
        <section className="mb-16">
          <div className="text-center sm:text-left mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
              Head-to-Head Comparison: Remove Backgrounds Online vs. remove.bg
            </h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              See why thousands of e-commerce sellers, designers, and professionals are switching from remove.bg to our free platform.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#f3f5f4] dark:bg-[#151817] text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-800">
                <tr>
                  <th className="p-4 sm:p-5 font-bold">Feature</th>
                  <th className="p-4 sm:p-5 font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/5">
                    Remove Backgrounds Online
                  </th>
                  <th className="p-4 sm:p-5 font-bold text-neutral-500 dark:text-neutral-400">
                    remove.bg
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 bg-white dark:bg-[#0c0e0d]">
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30 transition-colors"
                  >
                    <td className="p-4 sm:p-5 font-medium text-neutral-900 dark:text-white">
                      {row.feature}
                    </td>
                    <td className="p-4 sm:p-5 bg-emerald-500/5 font-semibold text-emerald-700 dark:text-emerald-300">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{row.ourTool}</span>
                      </div>
                    </td>
                    <td className="p-4 sm:p-5 text-neutral-600 dark:text-neutral-400">
                      <div className="flex items-center gap-2">
                        {row.ourHighlight ? (
                          <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                        ) : (
                          <Check className="w-4 h-4 text-neutral-400 shrink-0" />
                        )}
                        <span>{row.competitor}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 4 Pillars Grid: Why Users Are Switching */}
        <section className="mb-16">
          <div className="text-center sm:text-left mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
              Why Users Are Switching from remove.bg
            </h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              The four major advantages that make Remove Backgrounds Online the preferred choice.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#f3f5f4] dark:bg-[#151817] border border-neutral-200 dark:border-neutral-800 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center mb-4">
                <Download className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2">
                1. True Full HD Resolution Without Downscaling
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                remove.bg lures users with a free service, only to restrict free downloads to a blurry 0.25 MP thumbnail (500x500px). If you need high resolution for print or e-commerce, they charge up to $1.99 per image. We deliver your original full resolution with zero downscaling.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#f3f5f4] dark:bg-[#151817] border border-neutral-200 dark:border-neutral-800 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center mb-4">
                <Zap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2">
                2. Zero Credits &amp; Zero Subscription Traps
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Say goodbye to complicated credit calculations and recurring monthly billing. Remove Backgrounds Online is 100% free to use. Process as many photos, product images, or personal portraits as you need without watching a credit counter drop.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#f3f5f4] dark:bg-[#151817] border border-neutral-200 dark:border-neutral-800 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center mb-4">
                <Lock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2">
                3. Instant Guest Access (No Forced Registration)
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Need to quickly clean up an image for a slide deck or listing? You should not have to give away your email address, verify an inbox, and navigate subscription upsells just to cut out a background. Drag, drop, and download immediately.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#f3f5f4] dark:bg-[#151817] border border-neutral-200 dark:border-neutral-800 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2">
                4. Ephemeral RAM Privacy (Zero Image Retention)
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Your private photos, confidential documents, and customer assets are processed purely in ephemeral server memory and wiped immediately after generation. Unlike commercial platforms that retain photos in cloud user libraries, we never store or inspect your files.
              </p>
            </div>
          </div>
        </section>

        {/* Step-by-Step Guide */}
        <section className="mb-16 p-8 rounded-2xl bg-[#f3f5f4] dark:bg-[#151817] border border-neutral-200 dark:border-neutral-800">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            How to Remove Backgrounds in Full HD (Without Paying)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-sm flex items-center justify-center mb-3">
                1
              </div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-1">
                Upload Your Image
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Drag and drop your JPEG, PNG, or WebP photo into the workspace above. No account or payment details required.
              </p>
            </div>

            <div className="flex flex-col">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-sm flex items-center justify-center mb-3">
                2
              </div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-1">
                Automatic Subject Isolation
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                The processing engine analyzes the subject contours, isolates people, products, or cars, and separates the background in seconds.
              </p>
            </div>

            <div className="flex flex-col">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-sm flex items-center justify-center mb-3">
                3
              </div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-1">
                Download Full HD PNG
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Click Download Result to save your original resolution 32-bit transparent PNG. 100% free with zero watermarks.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Accordion Section */}
        <section className="mb-16">
          <div className="text-center sm:text-left mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 mb-3">
              <HelpCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Got Questions?</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
              Frequently Asked Questions About remove.bg Alternatives
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

        {/* Bottom CTA Banner */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/30 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
              Ready to remove backgrounds without paywalls?
            </h3>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Join thousands of creators, sellers, and professionals who have made the switch to Remove Backgrounds Online.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.02] shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>Start Removing Backgrounds</span>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
