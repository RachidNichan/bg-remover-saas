"use client";

import React from "react";
import { Sparkles, Shield, Cpu, Image, Code2, CheckCheck } from "lucide-react";

const FEATURES = [
  {
    icon: Sparkles,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10 border-emerald-500/20",
    title: "Hair & Fur Precision",
    description:
      "Advanced neural matting separates flyaway hair, animal fur, transparent glass, and intricate clothing edges with sub-pixel fidelity.",
  },
  {
    icon: Cpu,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10 border-emerald-500/20",
    title: "Pre-Warmed CPU Engine",
    description:
      "The rembg u2net model remains loaded in system memory using optimized ONNX runtime. No cold-start lag or cloud GPU bills.",
  },
  {
    icon: Shield,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10 border-emerald-500/20",
    title: "100% Private & In-Memory",
    description:
      "Your uploads are processed entirely in ephemeral RAM. Files are never written to disk, indexed, or shared with third parties.",
  },
  {
    icon: Image,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10 border-emerald-500/20",
    title: "Full HD Lossless PNG",
    description:
      "Export crisp PNG files with pristine 8-bit alpha transparency. No forced compression or resolution downsampling.",
  },
  {
    icon: Code2,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10 border-emerald-500/20",
    title: "Developer REST API",
    description:
      "Integrate background removal into your own scripts, mobile apps, or headless workflows using clean JSON or multipart endpoints.",
  },
  {
    icon: CheckCheck,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10 border-emerald-500/20",
    title: "Full Commercial Rights",
    description:
      "Use your output cutouts for Amazon, Shopify, eBay, advertising banners, client deliverables, and print graphics without restrictions.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-16 md:py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-3">
            <span>Built For Performance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Why Choose Remove Backgrounds Online
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base max-w-xl mx-auto">
            High-performance AI designed to remove backgrounds from portraits, products, and graphics with zero quality loss.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl p-6 relative overflow-hidden bg-[#151817] border border-neutral-800 hover:border-neutral-700 transition-colors group"
              >
                <div
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-5 ${feat.bgColor} transition-transform group-hover:scale-105`}
                >
                  <Icon className={`w-6 h-6 ${feat.color}`} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
