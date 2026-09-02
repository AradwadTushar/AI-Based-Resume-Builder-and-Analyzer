from fastapi import APIRouter, Depends

from auth.dependencies import get_current_user, ADMIN_EMAIL, FREE_AI_LIMIT
from models.user import User

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)


@router.get("/protected")
async def protected_route(
    current_user: User = Depends(get_current_user),
):
    return {
        "message": "Authenticated request success",
        "user_id": str(current_user.id),
        "clerk_id": current_user.clerk_id,
    }


@router.get("/me")
async def get_me(
    current_user: User = Depends(get_current_user),
):
    is_admin = (
        current_user.role == "admin"
        or (current_user.email and current_user.email.lower().strip() == ADMIN_EMAIL.lower())
    )

    return {
        "id": str(current_user.id),
        "clerk_id": current_user.clerk_id,
        "email": current_user.email,
        "role": "admin" if is_admin else "user",
        "is_admin": is_admin,
        "ai_requests_used": current_user.ai_requests_count,
        "ai_requests_limit": None if is_admin else FREE_AI_LIMIT,
        "remaining_credits": None if is_admin else max(0, FREE_AI_LIMIT - current_user.ai_requests_count),
    }