from fastapi import Depends, HTTPException, Request
from fastapi.security import (
    HTTPAuthorizationCredentials,
    HTTPBearer,
)

from sqlalchemy.ext.asyncio import AsyncSession

from auth.clerk import verify_clerk_token
from database import get_db
from services.user_service import get_or_create_user

security = HTTPBearer()


def get_token(
    credentials: HTTPAuthorizationCredentials = Depends(security),
):
    if not credentials:
        raise HTTPException(
            status_code=401,
            detail="Missing authentication credentials",
        )

    return credentials.credentials


async def get_current_user(
    request: Request,
    db: AsyncSession = Depends(get_db),
):
    payload = await verify_clerk_token(request)

    clerk_id = payload.get("sub")

    if not clerk_id:
        raise HTTPException(
            status_code=401,
            detail="Invalid token",
        )

    user = await get_or_create_user(
        db=db,
        clerk_id=clerk_id,
    )

    return user