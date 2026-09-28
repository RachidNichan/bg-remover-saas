import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 60; // Allow sufficient time for large image processing
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
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

    if (responseContentType.includes("application/json")) {
      const data = await backendResponse.json();
      return NextResponse.json(data);
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
