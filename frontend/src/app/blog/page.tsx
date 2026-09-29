import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  User,
  ShoppingBag,
  FileCheck,
  Award,
  Car,
  Palette,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BLOG_POSTS, AUTHOR_RACHID } from "@/data/blogPosts";

export const metadata: Metadata = {
  title: "Blog & Guides — Image Background Removal Tips | Remove Backgrounds Online",
  description:
    "Practical guides, step-by-step tutorials, and tips by Rachid Nichan on removing image backgrounds for e-commerce, LinkedIn headshots, digital signatures, and graphic design.",
  alternates: {
    canonical: "https://removebackgrounds.online/blog",
  },
  openGraph: {
    title: "Blog & Guides — Remove Backgrounds Online",
    description:
      "Practical guides and tutorials by Rachid Nichan on removing backgrounds from product photos, portraits, signatures, and automotive images.",
    url: "https://removebackgrounds.online/blog",
    siteName: "Remove Backgrounds Online",
    type: "website",
  },
};

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "E-Commerce": <ShoppingBag className="w-3.5 h-3.5" />,
  "Office & Productivity": <FileCheck className="w-3.5 h-3.5" />,
  "Career & Personal Branding": <Award className="w-3.5 h-3.5" />,
  "Automotive & Classifieds": <Car className="w-3.5 h-3.5" />,
  "Graphic Design & Web Standards": <Palette className="w-3.5 h-3.5" />,
};

export default function BlogIndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Remove Backgrounds Online Blog",
    description:
      "Tutorials, e-commerce photo guides, and background removal tips written by Rachid Nichan.",
    url: "https://removebackgrounds.online/blog",
    publisher: {
      "@type": "Organization",
      name: "Remove Backgrounds Online",
      url: "https://removebackgrounds.online",
      logo: "https://removebackgrounds.online/icon-512.png",
    },
    blogPost: BLOG_POSTS.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      url: `https://removebackgrounds.online/blog/${post.slug}`,
      datePublished: post.isoDate,
      author: {
        "@type": "Person",
        name: post.author.name,
      },
    })),
  };

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
              <span>Back to Tool</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        {/* Page Hero */}
        <div className="text-center sm:text-left mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 mb-4">
            <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Guides &amp; Tutorials</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Practical Guides &amp; Background Removal Tips
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
            Expert articles and actionable walkthroughs written by{" "}
            <span className="font-semibold text-neutral-900 dark:text-white">
              {AUTHOR_RACHID.name}
            </span>{" "}
            to help you get the cleanest cutouts for e-commerce stores, professional resumes, digital signatures, and design projects.
          </p>

          {/* Author Badge Card */}
          <div className="mt-6 p-4 rounded-xl bg-[#f3f5f4] dark:bg-[#151817] border border-neutral-200 dark:border-neutral-800 flex items-center gap-3.5 max-w-xl">
            <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
              RN
            </div>
            <div className="text-left text-xs">
              <p className="font-semibold text-neutral-900 dark:text-white">
                Written by {AUTHOR_RACHID.name}
              </p>
              <p className="text-neutral-500 dark:text-neutral-400 mt-0.5">
                {AUTHOR_RACHID.role} • 5 in-depth guides published
              </p>
            </div>
          </div>
        </div>

        {/* Articles List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {BLOG_POSTS.map((post, idx) => (
            <article
              key={post.slug}
              className={`rounded-2xl bg-[#f3f5f4] dark:bg-[#151817] border border-neutral-200 dark:border-neutral-800 p-6 sm:p-7 flex flex-col justify-between transition-all hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/5 group ${
                idx === 0 ? "md:col-span-2 md:p-8" : ""
              }`}
            >
              <div>
                <div className="flex flex-wrap items-center gap-2.5 mb-4 text-xs">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-400 font-semibold">
                    {CATEGORY_ICONS[post.category] || null}
                    <span>{post.category}</span>
                  </span>
                  <span className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{post.publishDate}</span>
                  </span>
                  <span className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime}</span>
                  </span>
                </div>

                <h2
                  className={`font-bold text-neutral-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug ${
                    idx === 0 ? "text-xl sm:text-2xl md:text-3xl mb-3" : "text-lg sm:text-xl mb-2.5"
                  }`}
                >
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>

                <p
                  className={`text-neutral-600 dark:text-neutral-400 leading-relaxed ${
                    idx === 0 ? "text-sm sm:text-base mb-6 max-w-3xl" : "text-xs sm:text-sm mb-6 line-clamp-3"
                  }`}
                >
                  {post.description}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-200/80 dark:border-neutral-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold text-[10px] flex items-center justify-center">
                    RN
                  </div>
                  <span>{post.author.name}</span>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Tool Callout Banner */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/30 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
              Need to remove a background right now?
            </h3>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Isolate products, people, cars, or signatures with studio-grade precision in 1 click. 100% free, no credit card, and no sign-up required.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.02] shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>Try Background Remover</span>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
