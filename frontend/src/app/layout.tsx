import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://removebackgrounds.online";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#090a0f",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Remove Backgrounds Online — 100% Free AI Background Remover",
    template: "%s | Remove Backgrounds Online",
  },
  description:
    "Remove backgrounds from images online in 1 click for free. Advanced AI automatically isolates people, products, animals, and car photos with instant HD transparent PNG download. No registration required to test.",
  keywords: [
    "remove backgrounds online",
    "remove background online",
    "free background remover",
    "ai background remover",
    "transparent background png online",
    "remove bg online free",
    "erase photo background",
    "cutout image online",
    "online background eraser",
    "product image background remover",
    "ecommerce photo cutout",
  ],
  authors: [{ name: "Remove Backgrounds Online Team", url: siteUrl }],
  creator: "Remove Backgrounds Online",
  publisher: "Remove Backgrounds Online",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Remove Backgrounds Online — 100% Free AI Background Remover",
    description:
      "Erase image backgrounds in seconds with studio-grade AI precision. Download lossless transparent PNG cutouts instantly. 100% free to try.",
    url: siteUrl,
    siteName: "Remove Backgrounds Online",
    images: [
      {
        url: "/samples/portrait-after.png",
        width: 1024,
        height: 1024,
        alt: "Remove Backgrounds Online - Sample AI Cutout Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Remove Backgrounds Online — 100% Free AI Background Remover",
    description:
      "Erase image backgrounds in seconds with studio-grade AI precision. Download lossless transparent PNG cutouts instantly.",
    images: ["/samples/portrait-after.png"],
    creator: "@removebgonline",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

// JSON-LD Structured Data Schema for Search Engines
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${siteUrl}/#webapp`,
      name: "Remove Backgrounds Online",
      url: siteUrl,
      applicationCategory: "DesignApplication",
      operatingSystem: "All",
      browserRequirements: "Requires modern web browser with HTML5 support",
      description:
        "Free web-based AI background remover tool that instantly creates transparent PNG cutouts with sub-pixel precision.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: "3 Free Credits upon signup",
      },
      featureList: [
        "100% Automatic AI Background Removal",
        "Sub-pixel hair and fur edge detection",
        "Lossless HD transparent PNG download",
        "Custom background color switcher",
        "In-memory processing for complete privacy",
      ],
    },
    {
      "@type": "HowTo",
      name: "How to Remove Background from Image Online for Free",
      description: "Step-by-step guide to removing image backgrounds online using AI in seconds.",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Upload Image",
          text: "Drag and drop your photo (JPG, PNG, or WEBP) or paste from clipboard (Ctrl+V).",
          url: `${siteUrl}/#uploader`,
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Automatic AI Processing",
          text: "Our neural network detects subjects and isolates backgrounds within 2 seconds.",
          url: `${siteUrl}/#uploader`,
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Download Transparent PNG",
          text: "Preview the cutout on transparent or colored backdrops and click Download HD PNG.",
          url: `${siteUrl}/#uploader`,
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full antialiased scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#090a0f] text-slate-100 selection:bg-indigo-500 selection:text-white">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
