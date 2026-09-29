"use client";

import React, { useState } from "react";
import { ImageUploader } from "@/components/ImageUploader";
import { ResultPreview } from "@/components/ResultPreview";
import { AuthModal } from "@/components/AuthModal";
import { ProcessingResult } from "@/types";

export function InteractiveRemoverWorkspace() {
  const [authOpen, setAuthOpen] = useState(false);
  const [processedResult, setProcessedResult] = useState<ProcessingResult | null>(null);

  return (
    <div className="w-full">
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
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}
