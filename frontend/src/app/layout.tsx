import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";

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
  applicationName: "Remove Backgrounds Online",
  appleWebApp: {
    title: "Remove Backgrounds Online",
    statusBarStyle: "default",
    capable: true,
  },
  icons: {
    icon: [
      { url: "/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

// JSON-LD Structured Data Schema for Search Engines (including WebSite Site Name for Google Search)
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "Remove Backgrounds Online",
      alternateName: [
        "Remove Backgrounds",
        "RemoveBackgroundsOnline",
        "removebackgrounds.online",
      ],
      url: `${siteUrl}/`,
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      inLanguage: "en-US",
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Remove Backgrounds Online",
      url: `${siteUrl}/`,
      logo: {
        "@type": "ImageObject",
        "@id": `${siteUrl}/#logo`,
        url: `${siteUrl}/icon-512.png`,
        caption: "Remove Backgrounds Online Logo",
        width: 512,
        height: 512,
      },
    },
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
        description: "100% Free Unlimited AI Background Removal",
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
  const isProduction = process.env.NODE_ENV === "production";

  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased scroll-smooth">
      <head>
        {isProduction && (
          <>
            {/* Google tag (gtag.js) */}
            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-76STEQV112"
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-76STEQV112');
                `,
              }}
            />
          </>
        )}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (stored === 'dark' || (!stored && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-neutral-900 dark:bg-[#0c0e0d] dark:text-neutral-100 selection:bg-emerald-500 selection:text-white transition-colors duration-150">
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
