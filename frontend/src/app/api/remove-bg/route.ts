import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rateLimit";

export const maxDuration = 60; // Allow sufficient time for large image processing
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    // 1. Enforce rate limiting per client IP to block bots and abusive traffic
    const rateLimit = checkRateLimit(request);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error:
            rateLimit.error ||
            "Rate limit exceeded: Too many requests. Please wait a moment before trying again.",
          retryAfter: rateLimit.retryAfterSeconds,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.retryAfterSeconds),
            "X-RateLimit-Limit": String(rateLimit.limit),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": String(rateLimit.resetSeconds),
          },
        }
      );
    }

    const backendUrl =
      process.env.AI_BACKEND_URL || "http://localhost:8000";

    const contentType = request.headers.get("content-type") || "";

    let backendResponse: Response;

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("file");

      if (!file || !(file instanceof Blob)) {
        return NextResponse.json(
          { error: "No image file provided in form data" },
          { status: 400 }
        );
      }

      // Forward as multipart to the AI backend
      const forwardFormData = new FormData();
      forwardFormData.append("file", file);

      const alphaMatting = formData.get("alpha_matting");
      if (alphaMatting) {
        forwardFormData.append("alpha_matting", alphaMatting.toString());
      }

      const postProcess = formData.get("post_process_mask");
      if (postProcess) {
        forwardFormData.append("post_process_mask", postProcess.toString());
      }

      try {
        backendResponse = await fetch(`${backendUrl}/api/remove-bg`, {
          method: "POST",
          body: forwardFormData,
        });
      } catch (err: any) {
        console.error("Failed to connect to Python AI backend:", err);
        return NextResponse.json(
          {
            error:
              "AI Microservice is unreachable. Please ensure the Python backend is running on " +
              backendUrl,
          },
          { status: 503 }
        );
      }
    } else if (contentType.includes("application/json")) {
      const jsonBody = await request.json();

      try {
        backendResponse = await fetch(`${backendUrl}/api/remove-bg`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(jsonBody),
        });
      } catch (err: any) {
        console.error("Failed to connect to Python AI backend:", err);
        return NextResponse.json(
          {
            error:
              "AI Microservice is unreachable. Please ensure the Python backend is running on " +
              backendUrl,
          },
          { status: 503 }
        );
      }
    } else {
      return NextResponse.json(
        { error: "Unsupported Content-Type. Use multipart/form-data or application/json." },
        { status: 400 }
      );
    }

    if (!backendResponse.ok) {
      const errorText = await backendResponse.text();
      return NextResponse.json(
        { error: `AI backend returned error: ${errorText}` },
        { status: backendResponse.status }
      );
    }

    const responseContentType = backendResponse.headers.get("content-type") || "";

    const rateLimitHeaders = {
      "X-RateLimit-Limit": String(rateLimit.limit),
      "X-RateLimit-Remaining": String(rateLimit.remaining),
      "X-RateLimit-Reset": String(rateLimit.resetSeconds),
    };

    if (responseContentType.includes("application/json")) {
      const data = await backendResponse.json();
      return NextResponse.json(data, {
        headers: rateLimitHeaders,
      });
    }

    // Stream the transparent PNG image back
    const imageBuffer = await backendResponse.arrayBuffer();
    const processTime = backendResponse.headers.get("x-process-time") || "0";

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": 'inline; filename="background_removed.png"',
        "X-Content-Type-Options": "nosniff",
        "X-Process-Time": processTime,
        "Cache-Control": "no-store, max-age=0",
        ...rateLimitHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in Next.js /api/remove-bg route:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error during background removal" },
      { status: 500 }
    );
  }
}
