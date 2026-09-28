"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { ImageUploader } from "@/components/ImageUploader";
import { ResultPreview } from "@/components/ResultPreview";
import { Features } from "@/components/Features";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { AuthModal } from "@/components/AuthModal";
import { ProcessingResult } from "@/types";

export default function HomePage() {
  const [authOpen, setAuthOpen] = useState(false);
  const [processedResult, setProcessedResult] = useState<ProcessingResult | null>(null);

  const scrollToUploader = () => {
    const el = document.getElementById("uploader");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0c0e0d] text-neutral-100">
      {/* Navigation */}
      <Navbar onOpenAuth={() => setAuthOpen(true)} />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero onScrollToUploader={scrollToUploader} />

        {/* Core SaaS Workspace: Uploader or Result View */}
        <div id="uploader" className="scroll-mt-20">
          {processedResult ? (
            <ResultPreview
              result={processedResult}
              onReset={() => setProcessedResult(null)}
            />
          ) : (
            <ImageUploader
              onProcessComplete={(result) => setProcessedResult(result)}
              onOpenAuth={() => setAuthOpen(true)}
            />
          )}
        </div>

        {/* Step-by-step How It Works Section for SEO & UX */}
        <div id="how-it-works" className="scroll-mt-20">
          <HowItWorks />
        </div>

        {/* Interactive Comparison Slider */}
        <div id="comparison" className="scroll-mt-20">
          <BeforeAfterSlider />
        </div>

        {/* Feature Highlights */}
        <div id="features" className="scroll-mt-20">
          <Features />
        </div>

        {/* FAQ Accordion */}
        <div id="faq" className="scroll-mt-20">
          <FAQ />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Auth Modal */}
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}
