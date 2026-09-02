import time
from collections import defaultdict
from fastapi import Request, HTTPException, status


class SimpleRateLimiter:
    """Sliding-window in-memory rate limiter to protect AI endpoint quotas."""

    def __init__(self, max_requests: int = 15, window_seconds: int = 60):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.requests = defaultdict(list)

    def check_rate_limit(self, client_id: str):
        now = time.time()
        client_history = self.requests[client_id]

        # Purge timestamps outside the window
        valid_history = [t for t in client_history if now - t < self.window_seconds]
        self.requests[client_id] = valid_history

        if len(valid_history) >= self.max_requests:
            retry_after = int(self.window_seconds - (now - valid_history[0]))
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail=f"AI generation limit reached ({self.max_requests} req/min). Please wait {max(1, retry_after)}s before generating again.",
                headers={"Retry-After": str(max(1, retry_after))},
            )

        self.requests[client_id].append(now)


# 15 AI requests per minute per IP
ai_rate_limiter = SimpleRateLimiter(max_requests=15, window_seconds=60)


async def check_ai_rate_limit(request: Request):
    """FastAPI dependency for AI endpoints."""
    forwarded = request.headers.get("x-forwarded-for")
    client_ip = forwarded.split(",")[0].strip() if forwarded else (request.client.host if request.client else "unknown")
    ai_rate_limiter.check_rate_limit(client_ip)
