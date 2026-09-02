import pytest
from fastapi import HTTPException
from services.rate_limiter import SimpleRateLimiter


def test_rate_limiter_allows_under_limit():
    limiter = SimpleRateLimiter(max_requests=3, window_seconds=10)
    # Should not raise
    limiter.check_rate_limit("client_1")
    limiter.check_rate_limit("client_1")
    limiter.check_rate_limit("client_1")


def test_rate_limiter_blocks_over_limit():
    limiter = SimpleRateLimiter(max_requests=2, window_seconds=10)
    limiter.check_rate_limit("client_2")
    limiter.check_rate_limit("client_2")

    with pytest.raises(HTTPException) as exc_info:
        limiter.check_rate_limit("client_2")

    assert exc_info.value.status_code == 429
    assert "limit reached" in exc_info.value.detail


def test_rate_limiter_isolates_clients():
    limiter = SimpleRateLimiter(max_requests=1, window_seconds=10)
    limiter.check_rate_limit("client_a")

    # client_b should still be allowed
    limiter.check_rate_limit("client_b")
