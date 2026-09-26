import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const backendUrl = process.env.AI_BACKEND_URL || "http://localhost:8000";
  let backendHealth = null;
  let backendStatus = "offline";

  try {
    const res = await fetch(`${backendUrl}/api/health`, {
      cache: "no-store",
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) {
      backendHealth = await res.json();
      backendStatus = "connected";
    }
  } catch (err: any) {
    backendStatus = "unreachable";
  }

  return NextResponse.json({
    status: "online",
    service: "clearcut-frontend",
    timestamp: new Date().toISOString(),
    backend: {
      url: backendUrl,
      status: backendStatus,
      details: backendHealth,
    },
  });
}
