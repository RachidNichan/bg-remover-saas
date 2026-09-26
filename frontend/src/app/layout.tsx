import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "ClearCut AI — Studio-Quality AI Background Remover SaaS",
  description:
    "Erase backgrounds with sub-pixel precision in seconds. Powered by in-memory CPU ONNX runtime. Free 3 credits on signup.",
  keywords: [
    "background remover",
    "ai background removal",
    "rembg",
    "transparent png",
    "image cutout",
    "product photography",
  ],
  authors: [{ name: "ClearCut AI Team" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-[#090a0f] text-slate-100 selection:bg-indigo-500 selection:text-white">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
