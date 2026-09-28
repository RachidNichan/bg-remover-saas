"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { Sparkles, SlidersHorizontal, Eye } from "lucide-react";

interface SamplePreset {
  id: string;
  name: string;
  tag: string;
  before: string;
  after: string;
}

const PRESETS: SamplePreset[] = [
  {
    id: "portrait",
    name: "Model Portrait",
    tag: "Complex Hair Details",
    before: "/samples/portrait-before.jpg",
    after: "/samples/portrait-after.png",
  },
  {
    id: "product",
    name: "E-Commerce Sneaker",
    tag: "Sharp Product Edges",
    before: "/samples/product-before.jpg",
    after: "/samples/product-after.png",
  },
];

export function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activePreset, setActivePreset] = useState<SamplePreset>(PRESETS[0]);
  const [bgStyle, setBgStyle] = useState<"checkerboard" | "white" | "dark" | "emerald">("checkerboard");

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <section id="comparison" className="py-16 md:py-24 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-3">
            <Eye className="w-3.5 h-3.5 text-emerald-400" />
            <span>Interactive Comparison</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            See the Quality: Before & After Background Removal
          </h2>
          <p className="mt-2 text-neutral-400 text-sm sm:text-base max-w-xl mx-auto">
            Drag the interactive slider to inspect our online background remover. Sub-pixel accuracy down to single hair strands and intricate product edges.
          </p>

          {/* Preset Selector */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => setActivePreset(preset)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center gap-2 ${
                  activePreset.id === preset.id
                    ? "bg-emerald-600 text-white"
                    : "bg-[#151817] border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700"
                }`}
              >
                <span>{preset.name}</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-neutral-900 text-emerald-300">
                  {preset.tag}
                </span>
              </button>
            ))}
          </div>

          {/* Background switcher for cutout preview */}
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-neutral-400">
            <span>Cutout Backdrop:</span>
            <button
              onClick={() => setBgStyle("checkerboard")}
              className={`px-2.5 py-1 rounded-lg border text-xs cursor-pointer transition-colors ${
                bgStyle === "checkerboard"
                  ? "border-emerald-500 text-emerald-300 bg-neutral-800"
                  : "border-neutral-800 text-neutral-400 hover:text-white"
              }`}
            >
              Transparent
            </button>
            <button
              onClick={() => setBgStyle("white")}
              className={`px-2.5 py-1 rounded-lg border text-xs cursor-pointer transition-colors ${
                bgStyle === "white"
                  ? "border-emerald-500 text-emerald-300 bg-neutral-800"
                  : "border-neutral-800 text-neutral-400 hover:text-white"
              }`}
            >
              White
            </button>
            <button
              onClick={() => setBgStyle("dark")}
              className={`px-2.5 py-1 rounded-lg border text-xs cursor-pointer transition-colors ${
                bgStyle === "dark"
                  ? "border-emerald-500 text-emerald-300 bg-neutral-800"
                  : "border-neutral-800 text-neutral-400 hover:text-white"
              }`}
            >
              Studio Black
            </button>
            <button
              onClick={() => setBgStyle("emerald")}
              className={`px-2.5 py-1 rounded-lg border text-xs cursor-pointer transition-colors ${
                bgStyle === "emerald"
                  ? "border-emerald-500 text-emerald-300 bg-neutral-800"
                  : "border-neutral-800 text-neutral-400 hover:text-white"
              }`}
            >
              Emerald
            </button>
          </div>
        </div>

        {/* Comparison Frame */}
        <div className="relative mx-auto max-w-3xl rounded-2xl p-1 bg-[#151817] border border-neutral-800">
          <div
            ref={containerRef}
            className="relative aspect-square w-full rounded-xl overflow-hidden select-none cursor-ew-resize touch-none border border-neutral-800"
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
          >
            {/* Layer 1: Background Removed Cutout (Right side / base) */}
            <div
              className={`absolute inset-0 w-full h-full flex items-center justify-center ${
                bgStyle === "checkerboard"
                  ? "bg-checkerboard"
                  : bgStyle === "white"
                  ? "bg-white"
                  : bgStyle === "dark"
                  ? "bg-[#0c0e0d]"
                  : "bg-emerald-950"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activePreset.after}
                alt="AI Processed with background removed"
                className="w-full h-full object-cover pointer-events-none"
              />

              {/* Label Right */}
              <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-lg bg-[#0c0e0d]/90 border border-neutral-800 text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                <span>AI Background Removed</span>
              </div>
            </div>

            {/* Layer 2: Original Image (Clipped to sliderPosition) */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
              style={{ width: `${sliderPosition}%` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activePreset.before}
                alt="Original photo before background removal"
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{
                  width: containerRef.current ? `${containerRef.current.clientWidth}px` : "100%",
                }}
              />

              {/* Label Left */}
              <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-lg bg-[#0c0e0d]/90 border border-neutral-800 text-xs font-semibold text-neutral-300">
                <span>Original Photo</span>
              </div>
            </div>

            {/* Draggable Divider Handle */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white cursor-ew-resize z-20 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-neutral-900 border-2 border-white flex items-center justify-center text-emerald-400 pointer-events-auto hover:scale-105 active:scale-95 transition-transform">
                <SlidersHorizontal className="w-3.5 h-3.5 rotate-90 text-emerald-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Slider tip */}
        <p className="text-center text-xs text-neutral-400 mt-4">
          Click and drag the central handle to reveal edge extraction quality.
        </p>
      </div>
    </section>
  );
}
