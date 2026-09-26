"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { ImageUploader } from "@/components/ImageUploader";
import { ResultPreview } from "@/components/ResultPreview";
import { Features } from "@/components/Features";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { AuthModal } from "@/components/AuthModal";
import { UpgradeModal } from "@/components/UpgradeModal";
import { ProcessingResult } from "@/types";

export default function HomePage() {
  const [authOpen, setAuthOpen] = useState(false);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [processedResult, setProcessedResult] = useState<ProcessingResult | null>(null);

  const scrollToUploader = () => {
    const el = document.getElementById("uploader");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090a0f] text-slate-100">
      {/* Navigation */}
      <Navbar
        onOpenAuth={() => setAuthOpen(true)}
        onOpenUpgrade={() => setUpgradeOpen(true)}
      />

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
              onOpenUpgrade={() => setUpgradeOpen(true)}
            />
          )}
        </div>

        {/* Interactive Comparison Slider */}
        <div id="comparison" className="scroll-mt-20">
          <BeforeAfterSlider />
        </div>

        {/* Feature Highlights */}
        <div id="features" className="scroll-mt-20">
          <Features />
        </div>

        {/* Pricing Table */}
        <div id="pricing" className="scroll-mt-20">
          <Pricing
            onOpenUpgrade={() => setUpgradeOpen(true)}
            onOpenAuth={() => setAuthOpen(true)}
          />
        </div>

        {/* FAQ Accordion */}
        <div id="faq" className="scroll-mt-20">
          <FAQ />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      <UpgradeModal isOpen={upgradeOpen} onClose={() => setUpgradeOpen(false)} />
    </div>
  );
}
