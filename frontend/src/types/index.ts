export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  credits: number;
  totalProcessed: number;
  createdAt: number | string | Date;
  updatedAt?: number | string | Date;
}

export interface RemoveBgOptions {
  alphaMatting?: boolean;
  postProcessMask?: boolean;
}

export interface ProcessingResult {
  originalUrl: string;
  processedUrl: string;
  fileName: string;
  originalSizeBytes: number;
  processedSizeBytes: number;
  processingTimeSeconds: number;
  width?: number;
  height?: number;
}

export type ProcessingState =
  | "idle"
  | "selected"
  | "uploading"
  | "processing"
  | "completed"
  | "error";

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  credits: number;
  badge?: string;
  features: string[];
  highlighted?: boolean;
  ctaText: string;
}
