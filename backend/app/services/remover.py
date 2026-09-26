import io
import time
import logging
from typing import Optional
from PIL import Image
import rembg
from rembg.session_factory import new_session

logger = logging.getLogger("bg_remover_ai")

class BackgroundRemoverService:
    def __init__(self, model_name: str = "u2net"):
        self.model_name = model_name
        self.session = None
        self._load_session()

    def _load_session(self):
        try:
            logger.info(f"Loading rembg session with model '{self.model_name}' on CPU...")
            start = time.perf_counter()
            self.session = new_session(self.model_name)
            elapsed = time.perf_counter() - start
            logger.info(f"Model '{self.model_name}' loaded in {elapsed:.2f}s successfully.")
        except Exception as e:
            logger.error(f"Failed to load model '{self.model_name}': {e}", exc_info=True)
            raise e

    def remove_background(
        self,
        image_bytes: bytes,
        alpha_matting: bool = False,
        alpha_matting_foreground_threshold: int = 240,
        alpha_matting_background_threshold: int = 10,
        post_process_mask: bool = False,
    ) -> tuple[bytes, float]:
        """
        Process the image bytes with rembg and return (output_png_bytes, elapsed_seconds).
        """
        # Validate that image_bytes is a valid image
        try:
            with Image.open(io.BytesIO(image_bytes)) as img:
                img.verify()
        except Exception as e:
            raise ValueError(f"Invalid image format: {str(e)}")

        start_time = time.perf_counter()

        output_bytes = rembg.remove(
            image_bytes,
            session=self.session,
            alpha_matting=alpha_matting,
            alpha_matting_foreground_threshold=alpha_matting_foreground_threshold,
            alpha_matting_background_threshold=alpha_matting_background_threshold,
            post_process_mask=post_process_mask,
        )

        elapsed_time = time.perf_counter() - start_time
        logger.info(f"Processed image ({len(image_bytes)} bytes -> {len(output_bytes)} bytes) in {elapsed_time:.3f}s")
        return output_bytes, elapsed_time
