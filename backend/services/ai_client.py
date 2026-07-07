import os
import json
import requests
from config import settings

# Load environment variable to decide which provider to use
AI_PROVIDER = os.getenv("AI_PROVIDER", "gemini").lower()

# ------- Gemini (default) -------------------------------------------------
# The original Gemini model is still used for local development.
# We keep the import here to avoid pulling it in when using Ollama.
try:
    import google.generativeai as genai
    genai.configure(api_key=settings.GEMINI_API_KEY)
    _gemini_model = genai.GenerativeModel("gemini-3.1-flash-lite")
except Exception:
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

# ------- Factory ----------------------------------------------------------
def get_model():
    """Return an object exposing ``generate_content(prompt)``.

    * If ``AI_PROVIDER`` == ``ollama`` → use :class:`OllamaClient`.
    * Otherwise fall back to the Gemini model (if available).
    """
    if AI_PROVIDER == "ollama":
        return OllamaClient()
    # Fallback to Gemini – raise a clear error if not configured.
    if _gemini_model is None:
        raise RuntimeError("Gemini model is not configured. Check GEMINI_API_KEY.")
    return _gemini_model
