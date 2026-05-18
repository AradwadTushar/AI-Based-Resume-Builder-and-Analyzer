from fastapi import APIRouter, Depends

from auth.dependencies import get_current_user

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)


@router.get("/protected")
async def protected_route(
    current_user = Depends(get_current_user),
):
    return {
        "message": "Authenticated request success",
        "user_id": str(current_user.id),
        "clerk_id": current_user.clerk_id,
    }

@router.get("/me")
async def get_me(
    current_user = Depends(get_current_user)
):
    return current_user