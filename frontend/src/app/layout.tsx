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
    default: "Remove Backgrounds Online — 100% Free Automatic Background Remover",
    template: "%s | Remove Backgrounds Online",
  },
  description:
    "Remove backgrounds from images online in 1 click for free. Automatically isolates people, products, animals, and car photos with instant HD transparent PNG download. No registration required.",
  keywords: [
    "remove backgrounds online",
    "remove background online",
    "free background remover",
    "automatic background remover",
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
    title: "Remove Backgrounds Online — 100% Free Automatic Background Remover",
    description:
      "Erase image backgrounds in seconds with studio-grade precision. Download lossless transparent PNG cutouts instantly. 100% free to use.",
    url: siteUrl,
    siteName: "Remove Backgrounds Online",
    images: [
      {
        url: "/samples/portrait-after.png",
        width: 1024,
        height: 1024,
        alt: "Remove Backgrounds Online - Sample Cutout Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Remove Backgrounds Online — 100% Free Automatic Background Remover",
    description:
      "Erase image backgrounds in seconds with studio-grade precision. Download lossless transparent PNG cutouts instantly.",
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
      </head>
      <body className="min-h-full flex flex-col bg-white text-neutral-900 dark:bg-[#0c0e0d] dark:text-neutral-100 selection:bg-emerald-500 selection:text-white transition-colors duration-150">
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
