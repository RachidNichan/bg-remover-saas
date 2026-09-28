import base64
import logging
import time
from collections import defaultdict
from contextlib import asynccontextmanager
from typing import Optional

from fastapi import (
    FastAPI,
    File,
    UploadFile,
    Form,
    Query,
    Request,
    HTTPException,
    status,
)
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response, JSONResponse

from app.config import settings
from app.schemas import RemoveBgBase64Request, RemoveBgResponse, HealthResponse
from app.services.remover import BackgroundRemoverService

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger("bg_remover_api")

# Rate Limiter Configuration: 20 requests per 60 seconds per IP
RATE_LIMIT_WINDOW_SECONDS = 60.0
MAX_BACKEND_REQUESTS_PER_MINUTE = 20
ip_request_history: dict[str, list[float]] = defaultdict(list)
last_backend_cleanup = time.time()

def check_backend_rate_limit(ip: str) -> tuple[bool, int]:
    global last_backend_cleanup
    now = time.time()

    # Periodic garbage collection every 2 minutes
    if now - last_backend_cleanup > 120.0:
        for client_ip in list(ip_request_history.keys()):
            ip_request_history[client_ip] = [
                t for t in ip_request_history[client_ip] if now - t < RATE_LIMIT_WINDOW_SECONDS
            ]
            if not ip_request_history[client_ip]:
                del ip_request_history[client_ip]
        last_backend_cleanup = now

    timestamps = [t for t in ip_request_history[ip] if now - t < RATE_LIMIT_WINDOW_SECONDS]
    if len(timestamps) >= MAX_BACKEND_REQUESTS_PER_MINUTE:
        oldest = timestamps[0]
        retry_after = max(1, int(oldest + RATE_LIMIT_WINDOW_SECONDS - now))
        return False, retry_after

    timestamps.append(now)
    ip_request_history[ip] = timestamps
    return True, 0

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Load the processing engine into memory on CPU
    logger.info("Initializing Background Remover service...")
    app.state.remover = BackgroundRemoverService(model_name=settings.MODEL_NAME)
    logger.info("Background Remover service initialized and ready.")
    yield
    # Shutdown: Clean up if necessary
    logger.info("Shutting down Background Remover service.")

app = FastAPI(
    title="Background Remover API",
    description="High-performance background removal microservice powered by in-memory CPU processing",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if "*" in settings.ALLOWED_ORIGINS else settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", tags=["General"])
async def root():
    return {
        "message": "Background Remover Service is operational",
        "runtime": "CPU",
        "docs": "/docs",
    }

@app.get("/api/health", response_model=HealthResponse, tags=["Health"])
async def health_check():
    is_ready = hasattr(app.state, "remover") and app.state.remover is not None
    if not is_ready:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Service is still initializing",
        )
    return HealthResponse(
        status="healthy",
        service="bg-remover",
        model=settings.MODEL_NAME,
        runtime="onnxruntime-cpu",
        version="1.0.0",
    )

@app.post("/api/remove-bg", tags=["Image Processing"])
async def remove_background(
    request: Request,
    file: Optional[UploadFile] = File(None),
    alpha_matting: Optional[bool] = Form(False),
    post_process_mask: Optional[bool] = Form(False),
    response_format: Optional[str] = Query(None, alias="format", description="Output format: 'image' (default) or 'json'"),
):
    """
    Remove background from an image.
    Supports either:
    1. multipart/form-data upload with a 'file' parameter.
    2. application/json body with an 'image' field (base64).
    """
    remover: BackgroundRemoverService = getattr(app.state, "remover", None)
    if remover is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Processing service is initializing. Please try again in a few moments.",
        )

    # Rate limit check to protect backend engine against bot spam and DDoS
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        client_ip = forwarded.split(",")[0].strip()
    else:
        client_ip = request.headers.get("x-real-ip") or (request.client.host if request.client else "127.0.0.1")

    allowed, retry_after = check_backend_rate_limit(client_ip)
    if not allowed:
        logger.warning(f"Backend rate limit triggered for client: {client_ip}")
        return JSONResponse(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            content={
                "error": f"Rate limit exceeded: Bot and overload protection is active. Please retry in {retry_after} seconds.",
                "retry_after": retry_after,
            },
            headers={"Retry-After": str(retry_after)},
        )

    image_bytes = None
    wants_json = response_format == "json" or "application/json" in request.headers.get("accept", "")

    # Check if request is JSON with base64
    content_type = request.headers.get("content-type", "")
    if "application/json" in content_type:
        try:
            body = await request.json()
            payload = RemoveBgBase64Request(**body)
            raw_base64 = payload.image
            if "," in raw_base64:
                # Strip data:image/...;base64, prefix if present
                raw_base64 = raw_base64.split(",", 1)[1]
            image_bytes = base64.b64decode(raw_base64)
            if payload.alpha_matting is not None:
                alpha_matting = payload.alpha_matting
            if payload.post_process_mask is not None:
                post_process_mask = payload.post_process_mask
            wants_json = True  # If called with JSON, default to returning JSON
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Failed to parse JSON base64 image: {str(e)}",
            )
    elif file is not None:
        # Read from file upload
        max_bytes = settings.MAX_IMAGE_SIZE_MB * 1024 * 1024
        image_bytes = await file.read()
        if len(image_bytes) > max_bytes:
            raise HTTPException(
                status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                detail=f"Image exceeds maximum allowed size of {settings.MAX_IMAGE_SIZE_MB}MB",
            )
        if len(image_bytes) == 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Uploaded file is empty",
            )
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Please provide an image via multipart 'file' or JSON 'image' (base64).",
        )

    # Process the image to remove background
    try:
        output_bytes, elapsed_time = remover.remove_background(
            image_bytes=image_bytes,
            alpha_matting=bool(alpha_matting),
            post_process_mask=bool(post_process_mask),
        )
    except ValueError as ve:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(ve),
        )
    except Exception as e:
        logger.error(f"Inference error: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Image processing failed: {str(e)}",
        )

    # Return output as JSON or raw PNG
    if wants_json:
        b64_output = base64.b64encode(output_bytes).decode("utf-8")
        return JSONResponse(
            content={
                "success": True,
                "image_base64": f"data:image/png;base64,{b64_output}",
                "processing_time_seconds": round(elapsed_time, 3),
                "original_size_bytes": len(image_bytes),
                "result_size_bytes": len(output_bytes),
            },
            headers={"X-Process-Time": f"{elapsed_time:.3f}"},
        )

    return Response(
        content=output_bytes,
        media_type="image/png",
        headers={
            "X-Process-Time": f"{elapsed_time:.3f}",
            "Content-Disposition": 'inline; filename="removed_bg.png"',
            "Cache-Control": "no-cache",
        },
    )
