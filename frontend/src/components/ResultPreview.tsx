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
  { id: "black", name: "Studio Black", class: "bg-[#0c0e0d]", color: "#0c0e0d" },
  { id: "gray", name: "Neutral Gray", class: "bg-neutral-800", color: "#262626" },
  { id: "emerald", name: "Emerald Tint", class: "bg-emerald-950", color: "#064e3b" },
];

export function ResultPreview({ result, onReset }: ResultPreviewProps) {
  const [selectedBg, setSelectedBg] = useState(BG_PRESETS[0]);
  const [customColor, setCustomColor] = useState<string>("#10b981");
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"cutout" | "sideBySide">("cutout");
  const [copied, setCopied] = useState<boolean>(false);
  const [downloading, setDownloading] = useState<boolean>(false);

  const handleDownload = async () => {
    if (downloading) return;
    setDownloading(true);

    try {
      // If transparent, download directly from processed blob URL
      if (selectedBg.id === "transparent" && !isCustom) {
        await downloadImage(result.processedUrl, result.fileName);
        return;
      }

      // If solid or custom background is chosen, composite onto canvas and download
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = result.processedUrl;

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
      });

      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth || 1024;
      canvas.height = img.naturalHeight || 1024;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Draw background
        ctx.fillStyle = isCustom
          ? customColor
          : selectedBg.color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // Draw image
        ctx.drawImage(img, 0, 0);

        await new Promise<void>((resolve) => {
          canvas.toBlob(async (blob) => {
            if (blob) {
              const baseName = result.fileName.replace(/\.png$/i, "");
              await downloadImage(blob, `${baseName}-custom.png`);
            }
            resolve();
          }, "image/png");
        });
      }
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setTimeout(() => setDownloading(false), 800);
    }
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
        <div className="rounded-3xl p-6 sm:p-10 border border-neutral-200 dark:border-neutral-800 bg-[#f3f5f4] dark:bg-[#151817] transition-colors duration-150">
          {/* Top Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200 dark:border-neutral-800">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 mb-2">
                <Check className="w-3.5 h-3.5" />
                <span>Background Successfully Erased</span>
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">
                Your HD Cutout is Ready
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode(viewMode === "cutout" ? "sideBySide" : "cutout")}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-neutral-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 text-xs text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{viewMode === "cutout" ? "Side by Side View" : "Cutout Only"}</span>
              </button>

              <button
                onClick={onReset}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-neutral-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 text-xs text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Upload Another</span>
              </button>
            </div>
          </div>

          {/* Main Display Area */}
          <div className="mt-8">
            {viewMode === "cutout" ? (
              <div
                className={`relative aspect-square max-h-[500px] w-full mx-auto rounded-2xl overflow-hidden border border-neutral-300 dark:border-neutral-800 flex items-center justify-center transition-colors ${
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
                  <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                    Original Image
                  </span>
                  <div className="aspect-square rounded-2xl overflow-hidden bg-neutral-100 dark:bg-[#101211] border border-neutral-300 dark:border-neutral-800 flex items-center justify-center">
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
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Clean AI Cutout
                  </span>
                  <div
                    className={`aspect-square rounded-2xl overflow-hidden border border-neutral-300 dark:border-neutral-800 flex items-center justify-center ${
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
          <div className="mt-6 p-4 rounded-2xl bg-white dark:bg-[#181c1a] border border-neutral-300 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-800 dark:text-neutral-300">
              <Palette className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
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
                      ? "border-emerald-500 text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-neutral-800"
                      : "border-neutral-300 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  }`}
                >
                  <span className={`w-3.5 h-3.5 rounded-full border border-black/10 dark:border-white/20 ${preset.class}`} />
                  <span>{preset.name}</span>
                </button>
              ))}

              {/* Custom Color Picker */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-[#151817]">
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
                <span className="text-[11px] text-neutral-600 dark:text-neutral-400 font-mono">{customColor}</span>
              </div>
            </div>
          </div>

          {/* Metrics & Performance Info */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-neutral-600 dark:text-neutral-400">
            <div className="p-3 rounded-xl bg-white dark:bg-[#181c1a] border border-neutral-300 dark:border-neutral-800 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div>
                <p className="text-neutral-900 dark:text-white font-semibold">{result.processingTimeSeconds}s</p>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400">Processing Time</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-[#181c1a] border border-neutral-300 dark:border-neutral-800 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div>
                <p className="text-neutral-900 dark:text-white font-semibold">
                  {formatBytes(result.processedSizeBytes)}
                </p>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400">Lossless PNG Size</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-[#181c1a] border border-neutral-300 dark:border-neutral-800 col-span-2 sm:col-span-1 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div>
                <p className="text-neutral-900 dark:text-white font-semibold">100% In-Memory</p>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400">Zero Disk Leaks</p>
              </div>
            </div>
          </div>

          {/* Download & Sharing CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-end gap-3 pt-6 border-t border-neutral-200 dark:border-neutral-800">
            <button
              onClick={copyImageToClipboard}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white hover:bg-neutral-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 text-sm font-semibold transition-colors cursor-pointer"
            >
              {copied ? "✓ Copied to Clipboard" : "Copy to Clipboard"}
            </button>

            <button
              onClick={handleDownload}
              disabled={downloading}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-75 disabled:cursor-not-allowed text-white text-sm font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className={`w-4 h-4 ${downloading ? "animate-bounce" : ""}`} />
              <span>{downloading ? "Downloading PNG..." : "Download HD PNG"}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
