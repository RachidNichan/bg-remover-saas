"use client";

import React, { useState } from "react";
import { Download, RotateCcw, Sparkles, Check, Palette, Clock, Layers } from "lucide-react";
import { ProcessingResult } from "@/types";
import { downloadImage, formatBytes } from "@/lib/utils";

interface ResultPreviewProps {
  result: ProcessingResult;
  onReset: () => void;
}

const BG_PRESETS = [
  { id: "transparent", name: "Transparent", class: "bg-checkerboard", color: "transparent" },
  { id: "white", name: "White", class: "bg-white", color: "#FFFFFF" },
  { id: "black", name: "Studio Black", class: "bg-slate-950", color: "#020617" },
  { id: "cyan", name: "Soft Cyan", class: "bg-cyan-100", color: "#cffafe" },
  { id: "gradient", name: "Sunset", class: "bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600", color: "gradient" },
];

export function ResultPreview({ result, onReset }: ResultPreviewProps) {
  const [selectedBg, setSelectedBg] = useState(BG_PRESETS[0]);
  const [customColor, setCustomColor] = useState<string>("#3b82f6");
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"cutout" | "sideBySide">("cutout");
  const [copied, setCopied] = useState<boolean>(false);

  const handleDownload = () => {
    // If transparent, download directly
    if (selectedBg.id === "transparent" && !isCustom) {
      downloadImage(result.processedUrl, result.fileName);
      return;
    }

    // If solid background is chosen, composite onto canvas and download
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = result.processedUrl;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth || 1024;
      canvas.height = img.naturalHeight || 1024;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Draw background
        ctx.fillStyle = isCustom ? customColor : selectedBg.color === "gradient" ? "#6366f1" : selectedBg.color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // Draw image
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL("image/png");
        downloadImage(dataUrl, result.fileName.replace(".png", "-custom.png"));
      }
    };
  };

  const copyImageToClipboard = async () => {
    try {
      const res = await fetch(result.processedUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Clipboard copy failed:", err);
    }
  };

  return (
    <section className="py-12 md:py-16 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl">
          {/* Top Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-2">
                <Check className="w-3.5 h-3.5" />
                <span>Background Successfully Erased</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Your HD Cutout is Ready
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode(viewMode === "cutout" ? "sideBySide" : "cutout")}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>{viewMode === "cutout" ? "Side by Side View" : "Cutout Only"}</span>
              </button>

              <button
                onClick={onReset}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5 text-indigo-400" />
                <span>Upload Another</span>
              </button>
            </div>
          </div>

          {/* Main Display Area */}
          <div className="mt-8">
            {viewMode === "cutout" ? (
              <div
                className={`relative aspect-square max-h-[500px] w-full mx-auto rounded-2xl overflow-hidden border border-slate-700/80 shadow-inner flex items-center justify-center transition-colors ${
                  isCustom ? "" : selectedBg.class
                }`}
                style={isCustom ? { backgroundColor: customColor } : {}}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={result.processedUrl}
                  alt="Background removed cutout"
                  className="max-h-full max-w-full object-contain p-2"
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Original */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Original Image
                  </span>
                  <div className="aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={result.originalUrl}
                      alt="Original image"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </div>

                {/* Processed */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Clean AI Cutout
                  </span>
                  <div
                    className={`aspect-square rounded-2xl overflow-hidden border border-slate-700/80 flex items-center justify-center ${
                      isCustom ? "" : selectedBg.class
                    }`}
                    style={isCustom ? { backgroundColor: customColor } : {}}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={result.processedUrl}
                      alt="Cutout image"
                      className="max-h-full max-w-full object-contain p-2"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Background Replacement Bar */}
          <div className="mt-6 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <Palette className="w-4 h-4 text-cyan-400" />
              <span>Replace Background:</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {BG_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => {
                    setSelectedBg(preset);
                    setIsCustom(false);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer flex items-center gap-2 ${
                    !isCustom && selectedBg.id === preset.id
                      ? "border-cyan-400 text-cyan-300 bg-slate-800"
                      : "border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850"
                  }`}
                >
                  <span className={`w-3.5 h-3.5 rounded-full border border-white/20 ${preset.class}`} />
                  <span>{preset.name}</span>
                </button>
              ))}

              {/* Custom Color Picker */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl border border-slate-800 bg-slate-850">
                <input
                  type="color"
                  value={customColor}
                  onChange={(e) => {
                    setCustomColor(e.target.value);
                    setIsCustom(true);
                  }}
                  className="w-5 h-5 rounded cursor-pointer border-none bg-transparent"
                  title="Pick a custom solid color"
                />
                <span className="text-[11px] text-slate-400 font-mono">{customColor}</span>
              </div>
            </div>
          </div>

          {/* Metrics & Performance Info */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-400">
            <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
              <div>
                <p className="text-white font-semibold">{result.processingTimeSeconds}s</p>
                <p className="text-[11px]">Processing Time</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
              <div>
                <p className="text-white font-semibold">
                  {formatBytes(result.processedSizeBytes)}
                </p>
                <p className="text-[11px]">Lossless PNG Size</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 col-span-2 sm:col-span-1 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <p className="text-white font-semibold">100% In-Memory</p>
                <p className="text-[11px]">Zero Disk Leaks</p>
              </div>
            </div>
          </div>

          {/* Download & Sharing CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-end gap-3 pt-6 border-t border-slate-800">
            <button
              onClick={copyImageToClipboard}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-sm font-semibold transition-all cursor-pointer"
            >
              {copied ? "✓ Copied to Clipboard" : "Copy to Clipboard"}
            </button>

            <button
              onClick={handleDownload}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white text-sm font-bold shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download HD PNG</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
