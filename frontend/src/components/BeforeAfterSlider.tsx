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
  const [bgStyle, setBgStyle] = useState<"checkerboard" | "white" | "dark" | "gradient">("checkerboard");

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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 mb-3">
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive Comparison</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            See the Quality for Yourself
          </h2>
          <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Drag the slider to compare original photos with AI cutouts. Sub-pixel accuracy down to single hair strands.
          </p>

          {/* Preset Selector */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => setActivePreset(preset)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  activePreset.id === preset.id
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                    : "glass-card text-slate-300 hover:text-white hover:border-slate-600"
                }`}
              >
                <span>{preset.name}</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-900/60 text-indigo-200">
                  {preset.tag}
                </span>
              </button>
            ))}
          </div>

          {/* Background switcher for cutout preview */}
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
            <span>Cutout Backdrop:</span>
            <button
              onClick={() => setBgStyle("checkerboard")}
              className={`px-2.5 py-1 rounded-lg border text-xs cursor-pointer ${
                bgStyle === "checkerboard"
                  ? "border-cyan-400 text-cyan-300 bg-slate-800"
                  : "border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              Transparent
            </button>
            <button
              onClick={() => setBgStyle("white")}
              className={`px-2.5 py-1 rounded-lg border text-xs cursor-pointer ${
                bgStyle === "white"
                  ? "border-cyan-400 text-cyan-300 bg-slate-800"
                  : "border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              White
            </button>
            <button
              onClick={() => setBgStyle("dark")}
              className={`px-2.5 py-1 rounded-lg border text-xs cursor-pointer ${
                bgStyle === "dark"
                  ? "border-cyan-400 text-cyan-300 bg-slate-800"
                  : "border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              Dark Studio
            </button>
            <button
              onClick={() => setBgStyle("gradient")}
              className={`px-2.5 py-1 rounded-lg border text-xs cursor-pointer ${
                bgStyle === "gradient"
                  ? "border-cyan-400 text-cyan-300 bg-slate-800"
                  : "border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              Sunset
            </button>
          </div>
        </div>

        {/* Comparison Frame */}
        <div className="relative mx-auto max-w-3xl rounded-2xl p-1 bg-gradient-to-b from-slate-700/50 via-slate-800/30 to-slate-900/60 shadow-2xl">
          <div
            ref={containerRef}
            className="relative aspect-square w-full rounded-xl overflow-hidden select-none cursor-ew-resize touch-none shadow-inner"
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
                  ? "bg-slate-950"
                  : "bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activePreset.after}
                alt="AI Processed with background removed"
                className="w-full h-full object-cover pointer-events-none"
              />

              {/* Label Right */}
              <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-white/10 text-xs font-semibold text-emerald-400 flex items-center gap-1.5 shadow-lg">
                <Sparkles className="w-3 h-3 text-cyan-300" />
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
              <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-white/10 text-xs font-semibold text-slate-300 shadow-lg">
                <span>Original Photo</span>
              </div>
            </div>

            {/* Draggable Divider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_12px_rgba(255,255,255,0.7)] cursor-ew-resize z-20 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-slate-900 border-2 border-white shadow-xl flex items-center justify-center text-white pointer-events-auto hover:scale-110 active:scale-95 transition-transform">
                <SlidersHorizontal className="w-4 h-4 rotate-90 text-cyan-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Slider tip */}
        <p className="text-center text-xs text-slate-400 mt-4">
          Click and drag the central handle to reveal edge extraction quality.
        </p>
      </div>
    </section>
  );
}
