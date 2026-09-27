import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Remove Backgrounds Online",
    short_name: "RemoveBG",
    description: "Free AI background remover. Remove backgrounds from images online in 1 click with HD transparent PNG download.",
    start_url: "/",
    display: "standalone",
    background_color: "#090a0f",
    theme_color: "#6366f1",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
