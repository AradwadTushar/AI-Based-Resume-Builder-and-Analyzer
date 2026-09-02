import pytest
from fastapi import HTTPException
from auth.dependencies import is_admin_user, FREE_AI_LIMIT


class DummyUser:
    def __init__(self, email: str, role: str = "user", count: int = 0):
        self.email = email
        self.role = role
        self.ai_requests_count = count


def check_quota_logic(user: DummyUser):
    if is_admin_user(user):
        return True

    if user.ai_requests_count >= FREE_AI_LIMIT:
        raise HTTPException(
            status_code=403,
            detail=f"Free limit reached ({FREE_AI_LIMIT}/{FREE_AI_LIMIT})",
        )

    user.ai_requests_count += 1
    return True


def test_admin_email_has_unlimited_quota():
    admin = DummyUser(email="aradwadtushar72@gmail.com", role="user", count=100)
    # Admin should never be blocked regardless of request count
    assert check_quota_logic(admin) is True


def test_admin_role_has_unlimited_quota():
    admin = DummyUser(email="other@example.com", role="admin", count=50)
    assert check_quota_logic(admin) is True


def test_regular_user_under_quota():
    user = DummyUser(email="regular@example.com", role="user", count=2)
    assert check_quota_logic(user) is True
    assert user.ai_requests_count == 3


def test_regular_user_blocks_at_limit():
    user = DummyUser(email="regular@example.com", role="user", count=5)
    with pytest.raises(HTTPException) as exc_info:
        check_quota_logic(user)
    assert exc_info.value.status_code == 403
    assert "Free limit reached" in exc_info.value.detail
