"use client";

import React from "react";
import { Sparkles, ArrowRight, User, ShoppingBag, Car, HeartHandshake } from "lucide-react";

interface ShowcaseItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  badge: string;
  icon: React.ElementType;
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: "portrait",
    title: "People & Portraits",
    category: "Portraits",
    badge: "Fine Hair Strands",
    description: "Complex curly hair, flyaway strands, and facial edges isolated with crisp sub-pixel alpha matting.",
    image: "/samples/showcase-portrait.jpg",
    icon: User,
  },
  {
    id: "product",
    title: "Products & E-Commerce",
    category: "Products",
    badge: "Clean Catalog Edges",
    description: "Luxury watches, jewelry, shoes, and packaging isolated on transparent PNG ready for Amazon or Shopify.",
    image: "/samples/showcase-product.jpg",
    icon: ShoppingBag,
  },
  {
    id: "car",
    title: "Cars & Automotive",
    category: "Automotive",
    badge: "Reflective Glass & Rims",
    description: "Sharp vehicle silhouettes, transparent windshield glass, and intricate wheel spoke cutout isolation.",
    image: "/samples/showcase-car.jpg",
    icon: Car,
  },
  {
    id: "pet",
    title: "Animals & Pets",
    category: "Pets & Wildlife",
    badge: "Soft Fur & Whiskers",
    description: "Delicate puppy fur coats, fluffy ears, and individual whiskers preserved without background fringe.",
    image: "/samples/showcase-pet.jpg",
    icon: HeartHandshake,
  },
];

interface ShowcaseGalleryProps {
  onScrollToUploader: () => void;
}

export function ShowcaseGallery({ onScrollToUploader }: ShowcaseGalleryProps) {
  return (
    <section id="showcase" className="py-16 md:py-24 bg-neutral-50/50 dark:bg-[#0f1211]/50 border-y border-neutral-200/80 dark:border-neutral-800/80 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Versatile Cutout Engine</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white tracking-tight">
            Stunning Cutout Quality Across Any Subject
          </h2>

          <p className="mt-3 text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
            See how cleanly our automatic background removal handles challenging subjects: from fine flyaway hair and delicate pet fur to reflective e-commerce items and automotive contours.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SHOWCASE_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group flex flex-col rounded-2xl bg-white dark:bg-[#151817] border border-neutral-200 dark:border-neutral-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all duration-200 overflow-hidden shadow-sm hover:shadow-lg"
              >
                {/* Visual Image Preview with Before/After Split */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={`${item.title} background removal example`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Split Line Indicator */}
                  <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white/70 shadow-sm pointer-events-none" />

                  {/* Badges on the image */}
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[10px] font-medium text-white">
                    Original
                  </div>
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-emerald-600/90 backdrop-blur-sm text-[10px] font-medium text-white">
                    Cutout
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col">
                  {/* Category Pill */}
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <span className="p-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <Icon className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed flex-1">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Quick CTA Banner */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-950/20 via-neutral-900/40 to-emerald-950/20 dark:from-emerald-950/40 dark:via-[#151817] dark:to-emerald-950/40 border border-emerald-500/20 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
              Have an image to cutout right now?
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
              Upload any photo — portraits, product shots, signatures, or cars — and get an HD transparent PNG in seconds.
            </p>
          </div>

          <button
            onClick={onScrollToUploader}
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-sm bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 group cursor-pointer whitespace-nowrap"
          >
            <span>Upload Your Photo</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
