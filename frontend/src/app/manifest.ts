import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Remove Backgrounds Online",
    short_name: "Remove Backgrounds",
    description: "Free AI background remover. Remove backgrounds from images online in 1 click with HD transparent PNG download.",
    start_url: "/",
    display: "standalone",
    background_color: "#0c0e0d",
    theme_color: "#10b981",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
