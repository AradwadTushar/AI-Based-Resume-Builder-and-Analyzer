import os
import json
import requests

# Cache for the Gemini model instance to ensure we only configure it once
_gemini_model = None

# ------- Ollama client ----------------------------------------------------
class OllamaClient:
    """Simple wrapper around the Ollama HTTP API.

    The model name can be overridden via the ``OLLAMA_MODEL`` env var.
    By default we use ``llama3`` – a lightweight 8‑B model that fits on the
    free tier of Fly.io or Render.
    """

    def __init__(self):
        self.base_url = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
        self.model = os.getenv("OLLAMA_MODEL", "llama3")
        self.headers = {"Content-Type": "application/json"}

    def generate_content(self, prompt: str) -> str:
        payload = {"model": self.model, "prompt": prompt, "stream": False}
        try:
            resp = requests.post(f"{self.base_url}/api/generate", json=payload, headers=self.headers, timeout=30)
            resp.raise_for_status()
            data = resp.json()
            # Ollama returns {'response': '...'}
            return data.get("response", "")
        except Exception as e:
            raise RuntimeError(f"Ollama request failed: {e}")

# ------- Factory (Lazy Initialization) ------------------------------------
def get_model():
    """Return an object exposing ``generate_content(prompt)``.
    Uses lazy loading to prevent crashes at module import time.

    * If ``AI_PROVIDER`` == ``ollama`` → use :class:`OllamaClient`.
    * Otherwise fall back to the Gemini model (if available).
    """
    global _gemini_model
    
    ai_provider = os.getenv("AI_PROVIDER", "gemini").lower()
    
    if ai_provider == "ollama":
        return OllamaClient()
        
    if _gemini_model is None:
        try:
            from config import settings
            import google.generativeai as genai
            
            if not settings.GEMINI_API_KEY:
                raise ValueError("GEMINI_API_KEY is empty or missing")
                
            genai.configure(api_key=settings.GEMINI_API_KEY)
            _gemini_model = genai.GenerativeModel("gemini-3.1-flash-lite")
        except Exception as e:
            raise RuntimeError(f"Gemini model is not configured properly: {e}")
            
    return _gemini_model
