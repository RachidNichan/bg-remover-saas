"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: "How does the AI model isolate complex edges and hair strands?",
    a: "Remove Backgrounds Online uses rembg powered by the u2net neural network model through ONNX Runtime. The model analyzes multi-scale saliency features across the image, generating a high-precision alpha mask that separates flyaway hair, transparent glass, and fine textures cleanly.",
  },
  {
    q: "Why can this run locally on a laptop CPU without expensive cloud GPUs?",
    a: "The ONNX Runtime executes the quantized model graph with CPU instruction optimizations (AVX2/AVX-512). The neural network model is loaded into RAM once upon service startup (taking ~0.38s), meaning consecutive image requests are processed in memory in ~1.5 - 2.5 seconds without any cold-start penalties.",
  },
  {
    q: "How are my user credits tracked and protected?",
    a: "Each authenticated user receives 3 complimentary credits stored in Cloud Firestore under users/{userId}. Whenever an image is processed, an atomic Firestore transaction checks that credits > 0 and decrements the balance by 1. If credits reach zero, an upgrade prompt appears.",
  },
  {
    q: "Are my uploaded photos stored or shared?",
    a: "Never. All image uploads are processed purely in ephemeral system RAM and returned immediately as a PNG stream. No uploaded images are ever written to disk, saved into a database, or used for model training.",
  },
  {
    q: "Can I deploy this to my own Ubuntu VPS?",
    a: "Yes! A root docker-compose.yml file is provided. With Docker and Docker Compose installed on any Ubuntu VPS, running 'docker-compose up -d --build' starts both the Python FastAPI microservice and the Next.js SaaS app in isolated containers on ports 8000 and 3000.",
  },
  {
    q: "What image formats and resolutions are supported?",
    a: "The service accepts JPG, PNG, and WEBP images up to 10MB each. High-definition images up to 4K resolution are supported without forced downscaling.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 md:py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-slate-400 text-sm">
            Everything you need to know about Remove Backgrounds Online, credits, and architecture.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl border border-slate-800/80 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm font-semibold text-white hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-cyan-400" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
