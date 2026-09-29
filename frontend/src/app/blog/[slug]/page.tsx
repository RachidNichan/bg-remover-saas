import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Sparkles,
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  ChevronRight,
  CheckCircle2,
  BookOpen,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BLOG_POSTS, getBlogPostBySlug, getAllBlogSlugs } from "@/data/blogPosts";

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | Remove Backgrounds Online",
    };
  }

  const url = `https://removebackgrounds.online/blog/${post.slug}`;

  return {
    title: `${post.title} | Remove Backgrounds Online`,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: post.author.name, url: "https://removebackgrounds.online/about" }],
    creator: post.author.name,
    publisher: "Remove Backgrounds Online",
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${post.title} | Remove Backgrounds Online`,
      description: post.description,
      url,
      siteName: "Remove Backgrounds Online",
      type: "article",
      publishedTime: post.isoDate,
      authors: [post.author.name],
      images: [
        {
          url: `https://removebackgrounds.online${post.coverImage}`,
          width: 1200,
          height: 675,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`https://removebackgrounds.online${post.coverImage}`],
    },
  };
}

export default async function BlogPostPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.description,
      image: `https://removebackgrounds.online${post.coverImage}`,
      datePublished: post.isoDate,
      dateModified: post.isoDate,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://removebackgrounds.online/blog/${post.slug}`,
      },
      author: {
        "@type": "Person",
        name: post.author.name,
        url: "https://removebackgrounds.online/about",
        jobTitle: post.author.role,
      },
      publisher: {
        "@type": "Organization",
        name: "Remove Backgrounds Online",
        url: "https://removebackgrounds.online",
        logo: {
          "@type": "ImageObject",
          url: "https://removebackgrounds.online/icon-512.png",
        },
      },
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
          name: "Blog",
          item: "https://removebackgrounds.online/blog",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.title,
          item: `https://removebackgrounds.online/blog/${post.slug}`,
        },
      ],
    },
  ];

  // Helper to render markdown content with clean styling
  const renderFormattedContent = (content: string) => {
    const lines = content.trim().split("\n");
    const elements: React.ReactNode[] = [];
    let currentParagraph: string[] = [];
    let inTable = false;
    let tableRows: string[][] = [];

    const flushParagraph = (key: string) => {
      if (currentParagraph.length > 0) {
        const text = currentParagraph.join(" ").trim();
        if (text) {
          elements.push(
            <p
              key={key}
              className="text-neutral-700 dark:text-neutral-300 text-base leading-relaxed my-4"
              dangerouslySetInnerHTML={{
                __html: text
                  .replace(
                    /\[([^\]]+)\]\(([^)]+)\)/g,
                    '<a href="$2" class="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">$1</a>'
                  )
                  .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-neutral-900 dark:text-white">$1</strong>')
                  .replace(/\*([^*]+)\*/g, '<em class="italic">$1</em>'),
              }}
            />
          );
        }
        currentParagraph = [];
      }
    };

    const flushTable = (key: string) => {
      if (tableRows.length > 0) {
        const header = tableRows[0];
        const bodyRows = tableRows.slice(1);
        elements.push(
          <div key={key} className="my-6 overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#f3f5f4] dark:bg-[#151817] text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-800">
                <tr>
                  {header.map((col, idx) => (
                    <th key={idx} className="p-3 font-semibold">
                      {col.trim()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {bodyRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30">
                    {row.map((cell, cIdx) => (
                      <td
                        key={cIdx}
                        className="p-3 text-neutral-700 dark:text-neutral-300"
                        dangerouslySetInnerHTML={{
                          __html: cell
                            .trim()
                            .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-neutral-900 dark:text-white">$1</strong>'),
                        }}
                      />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        tableRows = [];
        inTable = false;
      }
    };

    lines.forEach((rawLine, idx) => {
      const line = rawLine.trim();

      // Table row detection
      if (line.startsWith("|") && line.endsWith("|")) {
        // Skip separator row |:---|:---|
        if (line.includes("---")) return;
        flushParagraph(`p-before-table-${idx}`);
        inTable = true;
        const cols = line.split("|").slice(1, -1);
        tableRows.push(cols);
        return;
      } else if (inTable) {
        flushTable(`table-${idx}`);
      }

      // Headings
      if (line.startsWith("## ")) {
        flushParagraph(`p-before-h2-${idx}`);
        elements.push(
          <h2
            key={`h2-${idx}`}
            className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white mt-10 mb-4 tracking-tight"
          >
            {line.replace("## ", "")}
          </h2>
        );
        return;
      }

      if (line.startsWith("### ")) {
        flushParagraph(`p-before-h3-${idx}`);
        elements.push(
          <h3
            key={`h3-${idx}`}
            className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mt-8 mb-3"
          >
            {line.replace("### ", "")}
          </h3>
        );
        return;
      }

      // Horizontal separator
      if (line === "---") {
        flushParagraph(`p-before-hr-${idx}`);
        elements.push(
          <hr
            key={`hr-${idx}`}
            className="my-8 border-neutral-200 dark:border-neutral-800"
          />
        );
        return;
      }

      // Checklists & Bullet points
      if (line.startsWith("- [ ] ")) {
        flushParagraph(`p-before-check-${idx}`);
        elements.push(
          <div key={`check-${idx}`} className="flex items-center gap-2.5 my-2 text-sm text-neutral-700 dark:text-neutral-300">
            <div className="w-4 h-4 rounded border border-neutral-300 dark:border-neutral-700 shrink-0" />
            <span>{line.replace("- [ ] ", "")}</span>
          </div>
        );
        return;
      }

      if (line.startsWith("- ") || line.startsWith("* ")) {
        flushParagraph(`p-before-li-${idx}`);
        const text = line.substring(2);
        elements.push(
          <li
            key={`li-${idx}`}
            className="text-neutral-700 dark:text-neutral-300 text-sm sm:text-base leading-relaxed ml-5 list-disc my-1.5"
            dangerouslySetInnerHTML={{
              __html: text
                .replace(
                  /\[([^\]]+)\]\(([^)]+)\)/g,
                  '<a href="$2" class="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">$1</a>'
                )
                .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-neutral-900 dark:text-white">$1</strong>')
                .replace(/\*([^*]+)\*/g, '<em class="italic">$1</em>'),
            }}
          />
        );
        return;
      }

      // Numbered list
      if (/^\d+\.\s/.test(line)) {
        flushParagraph(`p-before-num-${idx}`);
        const text = line.replace(/^\d+\.\s/, "");
        elements.push(
          <li
            key={`num-${idx}`}
            className="text-neutral-700 dark:text-neutral-300 text-sm sm:text-base leading-relaxed ml-5 list-decimal my-1.5"
            dangerouslySetInnerHTML={{
              __html: text
                .replace(
                  /\[([^\]]+)\]\(([^)]+)\)/g,
                  '<a href="$2" class="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">$1</a>'
                )
                .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-neutral-900 dark:text-white">$1</strong>')
                .replace(/\*([^*]+)\*/g, '<em class="italic">$1</em>'),
            }}
          />
        );
        return;
      }

      // Empty line -> flush paragraph
      if (line === "") {
        flushParagraph(`p-${idx}`);
      } else {
        currentParagraph.push(line);
      }
    });

    flushParagraph("final-p");
    if (inTable) flushTable("final-table");

    return elements;
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
              href="/blog"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 dark:bg-[#151817] dark:hover:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Guides</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Article Container */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-14 w-full">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 mb-6">
          <Link href="/" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-neutral-400" />
          <Link href="/blog" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
            Blog
          </Link>
          <ChevronRight className="w-3 h-3 text-neutral-400" />
          <span className="text-neutral-700 dark:text-neutral-300 font-medium truncate max-w-[200px] sm:max-w-none">
            {post.category}
          </span>
        </nav>

        {/* Article Meta Header */}
        <div className="mb-8">
          <span className="inline-block px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-400 text-xs font-semibold mb-4">
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
            {post.title}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {post.description}
          </p>

          {/* Author Byline */}
          <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-500 dark:text-neutral-400">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shadow-sm">
                RN
              </div>
              <div>
                <p className="font-semibold text-neutral-900 dark:text-white">
                  Written by {post.author.name}
                </p>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                  {post.author.role}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                <span>{post.publishDate}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-neutral-400" />
                <span>{post.readTime}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Featured Cover Image */}
        <div className="my-8 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full aspect-video object-cover"
            loading="eager"
          />
        </div>

        {/* Article Body */}
        <article className="border-t border-neutral-200 dark:border-neutral-800 pt-6">
          {renderFormattedContent(post.content)}
        </article>

        {/* Embedded Free Tool CTA Box */}
        <div className="my-12 p-8 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/30 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="max-w-lg">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 mb-2">
              <Sparkles className="w-3 h-3" />
              <span>Instant 1-Click Background Removal</span>
            </span>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
              Try It on Your Photos for Free
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
              Remove backgrounds from products, portraits, cars, and signatures in 1 click. Zero watermarks, full HD resolution, completely free.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.02] shrink-0"
          >
            <span>Upload Image Now</span>
            <Sparkles className="w-4 h-4" />
          </Link>
        </div>

        {/* Author Bio Box */}
        <div className="p-6 rounded-2xl bg-[#f3f5f4] dark:bg-[#151817] border border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center gap-5 my-10">
          <div className="w-12 h-12 rounded-full bg-emerald-600 text-white font-bold text-base flex items-center justify-center shrink-0">
            RN
          </div>
          <div>
            <h4 className="font-bold text-neutral-900 dark:text-white text-sm">
              About the Author: {post.author.name}
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
              {post.author.bio}
            </p>
          </div>
        </div>

        {/* More Articles Section */}
        {otherPosts.length > 0 && (
          <div className="mt-14 pt-10 border-t border-neutral-200 dark:border-neutral-800">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">
              More Guides &amp; Tutorials
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {otherPosts.map((other) => (
                <Link
                  key={other.slug}
                  href={`/blog/${other.slug}`}
                  className="p-4 rounded-xl bg-[#f3f5f4] dark:bg-[#151817] border border-neutral-200 dark:border-neutral-800 hover:border-emerald-500/40 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-video w-full rounded-lg overflow-hidden mb-3 border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={other.coverImage}
                        alt={other.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-1">
                      {other.category}
                    </span>
                    <h4 className="font-semibold text-neutral-900 dark:text-white text-xs group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                      {other.title}
                    </h4>
                  </div>
                  <span className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-3 block">
                    {other.readTime}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
