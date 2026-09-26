from pydantic import BaseModel, Field
from typing import Optional

class RemoveBgBase64Request(BaseModel):
    image: str = Field(..., description="Base64 encoded input image (data:image/... or raw base64 string)")
    alpha_matting: Optional[bool] = Field(default=False, description="Whether to use alpha matting for fine hair details")
    alpha_matting_foreground_threshold: Optional[int] = Field(default=240, description="Foreground threshold for alpha matting")
    alpha_matting_background_threshold: Optional[int] = Field(default=10, description="Background threshold for alpha matting")
    post_process_mask: Optional[bool] = Field(default=False, description="Post process mask to remove standalone noise points")

class RemoveBgResponse(BaseModel):
    success: bool
    image_base64: str
    processing_time_seconds: float
    original_size_bytes: int
    result_size_bytes: int

class HealthResponse(BaseModel):
    status: str
    service: str
    model: str
    runtime: str
    version: str
