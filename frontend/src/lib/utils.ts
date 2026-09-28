import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export async function downloadImage(source: string | Blob, filename: string) {
  // 1. Sanitize filename and guarantee .png extension
  let safeName = (filename || "background-removed.png").trim();
  // Strip out filesystem reserved characters
  safeName = safeName.replace(/[/\\?%*:|"<>]/g, "_");
  if (!safeName.toLowerCase().endsWith(".png")) {
    safeName += ".png";
  }

  try {
    let blob: Blob;
    if (source instanceof Blob) {
      blob = source.type === "image/png" ? source : new Blob([source], { type: "image/png" });
    } else if (source.startsWith("data:")) {
      const res = await fetch(source);
      blob = await res.blob();
    } else {
      const res = await fetch(source);
      const rawBlob = await res.blob();
      blob = new Blob([rawBlob], { type: "image/png" });
    }

    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.style.display = "none";
    link.style.position = "absolute";
    link.style.left = "-9999px";
    link.href = objectUrl;
    link.setAttribute("download", safeName);
    link.download = safeName;
    link.rel = "noopener";

    document.body.appendChild(link);
    link.click();

    // Critical: Do NOT remove immediately; Chromium requires the link to stay attached
    // in the document tree while the download coordinator parses attributes and queues the file.
    setTimeout(() => {
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
      URL.revokeObjectURL(objectUrl);
    }, 3000);
  } catch (err) {
    console.error("downloadImage error, using direct anchor fallback:", err);
    const link = document.createElement("a");
    link.style.display = "none";
    link.href = typeof source === "string" ? source : URL.createObjectURL(source);
    link.setAttribute("download", safeName);
    link.download = safeName;
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      if (link.parentNode) link.parentNode.removeChild(link);
    }, 3000);
  }
}
