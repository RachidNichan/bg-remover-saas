"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  UploadCloud,
  FileImage,
  AlertCircle,
  Sparkles,
  Sliders,
  Check,
  Loader2,
  Lock,
} from "lucide-react";
import { ProcessingResult, ProcessingState } from "@/types";
import { formatBytes } from "@/lib/utils";

interface ImageUploaderProps {
  onProcessComplete: (result: ProcessingResult) => void;
  onOpenAuth: () => void;
}

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

export function ImageUploader({
  onProcessComplete,
  onOpenAuth,
}: ImageUploaderProps) {
  const { user, deductCredit } = useAuth();

  const [dragActive, setDragActive] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Advanced model settings
  const [alphaMatting, setAlphaMatting] = useState<boolean>(false);
  const [postProcessMask, setPostProcessMask] = useState<boolean>(false);

  // Processing stages
  const [state, setState] = useState<ProcessingState>("idle");
  const [processingStep, setProcessingStep] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Validate and set file
  const handleFileSelect = useCallback((file: File) => {
    setErrorMsg(null);

    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setErrorMsg("Please upload a valid image (PNG, JPG, or WEBP).");
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setErrorMsg(`Image exceeds maximum allowed size of 10MB (file is ${formatBytes(file.size)}).`);
      return;
    }

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setState("selected");
  }, []);

  // Handle Drag events
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFileSelect(e.dataTransfer.files[0]);
      }
    },
    [handleFileSelect]
  );

  // Global paste handler (Ctrl+V)
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            handleFileSelect(file);
            break;
          }
        }
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [handleFileSelect]);

  // Load sample image
  const handleLoadSample = async (samplePath: string, name: string) => {
    try {
      setErrorMsg(null);
      setState("uploading");
      setProcessingStep("Loading sample image...");

      const res = await fetch(samplePath);
      const blob = await res.blob();
      const file = new File([blob], name, { type: blob.type || "image/jpeg" });
      handleFileSelect(file);
    } catch {
      setErrorMsg("Failed to load sample image.");
      setState("idle");
    }
  };

  // Process Background Removal
  const handleRemoveBackground = async () => {
    if (!selectedFile) return;

    setState("processing");
    setProcessingStep("Sending image to AI microservice...");

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      if (alphaMatting) formData.append("alpha_matting", "true");
      if (postProcessMask) formData.append("post_process_mask", "true");

      const startTime = performance.now();

      // Progress simulation steps for engaging UX
      const stepTimer1 = setTimeout(() => {
        setProcessingStep("ONNX CPU runtime isolating subject...");
      }, 700);

      const stepTimer2 = setTimeout(() => {
        setProcessingStep("Generating transparent alpha channel...");
      }, 1500);

      const response = await fetch("/api/remove-bg", {
        method: "POST",
        body: formData,
      });

      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);

      if (!response.ok) {
        let errText = "Failed to process image.";
        try {
          const errJson = await response.json();
          errText = errJson.error || errText;
        } catch {
          // ignore
        }
        throw new Error(errText);
      }

      setProcessingStep("Finalizing HD transparent PNG...");

      const blob = await response.blob();
      const pngBlob = new Blob([blob], { type: "image/png" });
      const processedUrl = URL.createObjectURL(pngBlob);
      const elapsedSeconds = (performance.now() - startTime) / 1000;

      // Deduct credit in Firestore / local state
      await deductCredit();

      const rawBaseName = (selectedFile.name || "image")
        .replace(/\.[^/.]+$/, "")
        .replace(/[/\\?%*:|"<>]/g, "_")
        .trim();
      const cleanBaseName = rawBaseName || "image";

      const result: ProcessingResult = {
        originalUrl: previewUrl || "",
        processedUrl: processedUrl,
        fileName: `${cleanBaseName}-nobg.png`,
        originalSizeBytes: selectedFile.size,
        processedSizeBytes: blob.size,
        processingTimeSeconds: parseFloat(elapsedSeconds.toFixed(2)),
      };

      setState("completed");
      onProcessComplete(result);
    } catch (err: any) {
      console.error("Removal error:", err);
      setErrorMsg(err.message || "An error occurred while removing background.");
      setState("error");
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setErrorMsg(null);
    setState("idle");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <section id="uploader" className="py-12 md:py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Subtle top ambient glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-indigo-500/20 rounded-full blur-[80px] pointer-events-none" />

          {/* Section Heading */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Upload Image to Remove Background Online
            </h2>
            <p className="mt-1.5 text-sm text-slate-400">
              Drag and drop any portrait, product, or graphic photo or paste directly with{" "}
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[11px] text-slate-300 font-mono">
                Ctrl+V
              </kbd>
            </p>
          </div>

          {/* Error Banner */}
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-500/30 text-red-200 text-xs sm:text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold">Processing Notice</p>
                <p className="text-red-300/90 mt-0.5">{errorMsg}</p>
              </div>
              <button
                onClick={() => setErrorMsg(null)}
                className="text-red-400 hover:text-white text-xs underline cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Processing State View */}
          {state === "processing" ? (
            <div className="py-16 text-center flex flex-col items-center justify-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center">
                  <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
                </div>
                <Sparkles className="w-5 h-5 text-indigo-400 absolute -top-1 -right-1 animate-bounce" />
              </div>

              <h3 className="text-xl font-bold text-white">AI Processing Image</h3>
              <p className="text-cyan-300 text-sm font-medium mt-2 animate-pulse">
                {processingStep}
              </p>
              <p className="text-slate-500 text-xs mt-3 max-w-xs">
                Running in-memory CPU ONNX inference. Usually completes within 1.5 - 3 seconds.
              </p>
            </div>
          ) : selectedFile && previewUrl ? (
            /* Selected File Preview Mode */
            <div className="space-y-6">
              <div className="relative aspect-video max-h-[380px] w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-700/80 flex items-center justify-center shadow-inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewUrl}
                  alt="Selected preview"
                  className="max-h-full max-w-full object-contain"
                />

                <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-slate-950/80 backdrop-blur-md border border-white/10 text-xs text-slate-200">
                  <span className="font-medium text-white">{selectedFile.name}</span>
                  <span className="text-slate-400 ml-2">({formatBytes(selectedFile.size)})</span>
                </div>

                <button
                  onClick={handleReset}
                  className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 hover:text-white transition-all cursor-pointer"
                >
                  Change Image
                </button>
              </div>

              {/* Advanced Options Bar */}
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-2 text-slate-300 font-medium">
                  <Sliders className="w-4 h-4 text-cyan-400" />
                  <span>AI Refinement Settings:</span>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
                    <input
                      type="checkbox"
                      checked={alphaMatting}
                      onChange={(e) => setAlphaMatting(e.target.checked)}
                      className="rounded bg-slate-800 border-slate-700 text-indigo-500 focus:ring-0 cursor-pointer"
                    />
                    <span>Alpha Matting (Delicate Hair)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
                    <input
                      type="checkbox"
                      checked={postProcessMask}
                      onChange={(e) => setPostProcessMask(e.target.checked)}
                      className="rounded bg-slate-800 border-slate-700 text-indigo-500 focus:ring-0 cursor-pointer"
                    />
                    <span>Denoise Mask</span>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>100% Free • Unlimited AI Removals</span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={handleReset}
                    className="w-1/2 sm:w-auto px-5 py-3 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 text-sm font-medium transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleRemoveBackground}
                    className="w-1/2 sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-600 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Erase Background</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Upload Dropzone View */
            <div>
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-14 text-center cursor-pointer transition-all ${
                  dragActive
                    ? "border-cyan-400 bg-cyan-500/10 scale-[1.01]"
                    : "border-slate-700/80 hover:border-indigo-500/50 hover:bg-slate-900/50"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileSelect(e.target.files[0]);
                    }
                  }}
                />

                <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                  <UploadCloud className="w-8 h-8 text-cyan-400" />
                </div>

                <p className="text-base font-semibold text-white">
                  Drop your image here, or{" "}
                  <span className="text-cyan-400 hover:underline">browse files</span>
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  Supports JPG, PNG, WEBP • Max 10MB • 100% Free &amp; Unlimited
                </p>
              </div>

              {/* Sample Images Quick Trigger */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <span className="text-xs text-slate-500">No image handy? Try a demo:</span>
                <button
                  type="button"
                  onClick={() => handleLoadSample("/samples/portrait-before.jpg", "demo-portrait.jpg")}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <FileImage className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Sample Portrait</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleLoadSample("/samples/product-before.jpg", "demo-product.jpg")}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <FileImage className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Sample Sneaker</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
