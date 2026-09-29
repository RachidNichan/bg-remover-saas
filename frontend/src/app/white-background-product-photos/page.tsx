import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles,
  ArrowLeft,
  ShoppingBag,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Lock,
  Download,
  HelpCircle,
  Layers,
  Store,
  ChevronRight,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";
import { InteractiveRemoverWorkspace } from "@/components/InteractiveRemoverWorkspace";

export const metadata: Metadata = {
  title: "White Background Product Photo Maker — Free for Amazon & Shopify",
  description:
    "Transform product photos into Amazon-compliant pure white (RGB 255, 255, 255) and transparent PNG cutouts in 1 click. 100% free with original Full HD resolution.",
  keywords: [
    "white background product photo maker",
    "amazon white background product photo tool",
    "remove background product photos online free",
    "make background white for shopify",
    "ebay product photography cutout",
    "product photo background remover free",
    "rgb 255 255 255 background maker",
    "ecommerce photo background editor",
  ],
  alternates: {
    canonical: "https://removebackgrounds.online/white-background-product-photos",
  },
  openGraph: {
    title: "White Background Product Photo Maker — Remove Backgrounds Online",
    description:
      "Isolate products with pixel-level precision for Amazon, Shopify, eBay, and Google Shopping. Free Full HD downloads without credits.",
    url: "https://removebackgrounds.online/white-background-product-photos",
    siteName: "Remove Backgrounds Online",
    type: "website",
    images: [
      {
        url: "https://removebackgrounds.online/blog/product-photos-guide.jpg",
        width: 1200,
        height: 675,
        alt: "White Background Product Photo Maker for E-Commerce",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "White Background Product Photo Maker — Free for Amazon & Shopify",
    description:
      "Create marketplace-compliant pure white background product photos in seconds.",
    images: ["https://removebackgrounds.online/blog/product-photos-guide.jpg"],
  },
};

const MARKETPLACE_STANDARDS = [
  {
    platform: "Amazon Main Image",
    bgRule: "Pure White (sRGB 255, 255, 255) Mandatory",
    resolution: "1,000 to 10,000 px (1,600+ px for zoom)",
    frameFill: "Product must fill 85%+ of frame",
    status: "Strictly Enforced (Listing suppressed if non-compliant)",
  },
  {
    platform: "Shopify & WooCommerce",
    bgRule: "Transparent PNG or Brand Palette",
    resolution: "2,048 x 2,048 px square recommended",
    frameFill: "Balanced 75% - 85% frame fill",
    status: "Flexible (Transparent PNG ideal for responsive themes)",
  },
  {
    platform: "eBay Marketplace",
    bgRule: "Pure White or Off-White recommended",
    resolution: "1,600 px on longest side",
    frameFill: "Uncluttered isolated merchandise",
    status: "Recommended for top search placement",
  },
  {
    platform: "Google Shopping Feed",
    bgRule: "Solid White or Light Gray backdrop",
    resolution: "800 x 800 px minimum (non-apparel)",
    frameFill: "Full view of merchandise without watermarks",
    status: "Mandatory for merchant approval",
  },
];

const FAQS = [
  {
    question: "Does this tool produce pure white backgrounds compliant with Amazon?",
    answer:
      "Yes. Our processing engine isolates your product and delivers a transparent PNG. When uploaded or placed over a white digital canvas, the background represents absolute pure white (RGB 255, 255, 255), satisfying Amazon's primary image guidelines completely.",
  },
  {
    question: "Do I lose image resolution when downloading for my Shopify store?",
    answer:
      "No. Unlike competitor services that cap free downloads at 500x500 pixels, Remove Backgrounds Online preserves your original camera resolution. Whether your photo is 2,000 x 2,000 px or 4,000 x 3,000 px, you receive your full HD transparent cutout at zero cost.",
  },
  {
    question: "How does the engine handle intricate product edges like jewelry or footwear?",
    answer:
      "Our edge detection uses sub-pixel boundary refinement to distinguish fine textures, reflective metals, shoelaces, and complex contours without the harsh jagged pixelation typical of basic eraser tools.",
  },
  {
    question: "Do I need to install software or pay for credits?",
    answer:
      "No. Remove Backgrounds Online operates 100% in your web browser. There are no credit packs to purchase, no subscriptions, and no mandatory account sign-ups.",
  },
  {
    question: "Can I use downloaded product cutouts commercially?",
    answer:
      "Yes. You retain full copyright and ownership of all processed merchandise images for commercial advertising, Amazon listings, Shopify storefronts, catalogs, and print media.",
  },
];

export default function WhiteBackgroundProductPhotosPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "White Background Product Photo Maker",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "All (Web Browser)",
      url: "https://removebackgrounds.online/white-background-product-photos",
      description:
        "Free tool to create marketplace-compliant pure white and transparent background product photography for Amazon, Shopify, eBay, and Google Shopping.",
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
          name: "White Background Product Photos",
          item: "https://removebackgrounds.online/white-background-product-photos",
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
            White Background Product Photos
          </span>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 mb-4">
            <ShoppingBag className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>E-Commerce Product Studio</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
            White Background Product Photo Maker for Amazon &amp; Shopify
          </h1>

          <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Create marketplace-compliant pure white (RGB 255, 255, 255) and transparent PNG product cutouts in seconds. 100% free with full original resolution and zero credit limits.
          </p>
        </div>

        {/* Interactive Workspace */}
        <div className="mb-16 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-[#f3f5f4]/50 dark:bg-[#151817]/50 p-4 sm:p-6 shadow-sm">
          <div className="text-center mb-4">
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Upload Your Product Photo
            </span>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Footwear, clothing, electronics, jewelry, or cosmetics. Download lossless transparent PNG instantly.
            </p>
          </div>
          <InteractiveRemoverWorkspace />
        </div>

        {/* Marketplace Standards Comparison Table */}
        <section className="mb-16">
          <div className="text-center sm:text-left mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
              Major Marketplace Image Requirements
            </h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Ensure your merchandise photography adheres strictly to major marketplace standards to avoid listing suppression.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#f3f5f4] dark:bg-[#151817] text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-800">
                <tr>
                  <th className="p-4 sm:p-5 font-bold">Platform</th>
                  <th className="p-4 sm:p-5 font-bold">Background Requirement</th>
                  <th className="p-4 sm:p-5 font-bold">Resolution &amp; Framing</th>
                  <th className="p-4 sm:p-5 font-bold">Compliance Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 bg-white dark:bg-[#0c0e0d]">
                {MARKETPLACE_STANDARDS.map((std, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30 transition-colors"
                  >
                    <td className="p-4 sm:p-5 font-bold text-neutral-900 dark:text-white">
                      {std.platform}
                    </td>
                    <td className="p-4 sm:p-5 text-emerald-700 dark:text-emerald-400 font-semibold">
                      {std.bgRule}
                    </td>
                    <td className="p-4 sm:p-5 text-neutral-600 dark:text-neutral-400">
                      {std.resolution} • {std.frameFill}
                    </td>
                    <td className="p-4 sm:p-5 text-xs text-neutral-500 dark:text-neutral-400">
                      {std.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 3 Core E-Commerce Advantages */}
        <section className="mb-16">
          <div className="text-center sm:text-left mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
              Why E-Commerce Merchants Choose Remove Backgrounds Online
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#f3f5f4] dark:bg-[#151817] border border-neutral-200 dark:border-neutral-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center font-bold text-emerald-600 dark:text-emerald-400 mb-4">
                <Download className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2">
                Full HD Original Resolution
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Marketplaces require 1600px+ images to enable customer pinch-to-zoom. While other tools downscale free images to 500px, we deliver full original dimensions for crisp customer inspection.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#f3f5f4] dark:bg-[#151817] border border-neutral-200 dark:border-neutral-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center font-bold text-emerald-600 dark:text-emerald-400 mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2">
                Zero Cost &amp; Unlimited Catalog
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Whether you have 5 products or a 500-SKU dropshipping catalog, you will never encounter subscription traps, credit limits, or surprise charges. 100% free forever.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#f3f5f4] dark:bg-[#151817] border border-neutral-200 dark:border-neutral-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center font-bold text-emerald-600 dark:text-emerald-400 mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2">
                Sub-Pixel Clean Edges
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Our boundary engine separates handles, shoe eyelets, fabric weaves, and transparent glass without leaving white fringes or jagged stair-stepping edges.
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
                Looking for conversion optimization tips?
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                Read our in-depth seller guide on product photo backgrounds for Amazon, Shopify, and eBay.
              </p>
            </div>
          </div>
          <Link
            href="/blog/remove-background-product-photos-shopify-amazon"
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 transition-colors shrink-0"
          >
            <span>Read Seller Guide</span>
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
              Frequently Asked Questions About Product Cutouts
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
