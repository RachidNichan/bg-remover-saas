"use client";

import React from "react";
import { UploadCloud, Cpu, Download, ArrowRight, Sparkles } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      step: "01",
      icon: UploadCloud,
      title: "1. Upload Your Image",
      description:
        "Drag and drop any JPG, PNG, or WEBP photo up to 10MB, browse your device, or paste directly from clipboard with Ctrl+V.",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
      step: "02",
      icon: Cpu,
      title: "2. Automatic AI Eraser",
      description:
        "Our neural network automatically detects foreground subjects, extracts complex hair strands, and erases the background in ~1.5s.",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
      step: "03",
      icon: Download,
      title: "3. Download HD Cutout",
      description:
        "Instantly download your full-resolution transparent PNG cutout, or replace the backdrop with studio white, dark, or neutral colors.",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10 border-emerald-500/20",
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simple 3-Step Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            How to Remove Backgrounds Online
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base max-w-2xl mx-auto">
            No design expertise, expensive software, or lasso tools needed. Get studio-grade cutouts directly in your web browser.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl p-8 relative flex flex-col justify-between bg-[#151817] border border-neutral-800 hover:border-neutral-700 transition-colors group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl border flex items-center justify-center ${item.bgColor} transition-transform group-hover:scale-105`}
                    >
                      <Icon className={`w-7 h-7 ${item.color}`} />
                    </div>
                    <span className="text-3xl font-black text-neutral-700 tracking-wider">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center text-xs font-semibold text-emerald-400">
                  <span>Fast &amp; 100% Free to Use</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
