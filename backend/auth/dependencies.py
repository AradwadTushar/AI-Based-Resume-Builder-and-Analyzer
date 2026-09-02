from fastapi import Depends, HTTPException, Request, status
from fastapi.security import (
    HTTPAuthorizationCredentials,
    HTTPBearer,
)
from sqlalchemy.ext.asyncio import AsyncSession

from auth.clerk import verify_clerk_token, clerk_sdk
from config import settings
from database import get_db
from models.user import User
from services.user_service import get_or_create_user, is_admin_email

security = HTTPBearer()

FREE_AI_LIMIT = 5


def get_token(
    credentials: HTTPAuthorizationCredentials = Depends(security),
):
    if not credentials:
        raise HTTPException(
            status_code=401,
            detail="Missing authentication credentials",
        )

    return credentials.credentials


def is_admin_user(user: User) -> bool:
    if user.role == "admin":
        return True
    return is_admin_email(user.email)


async def get_current_user(
    request: Request,
    db: AsyncSession = Depends(get_db),
) -> User:
    try:
        payload = await verify_clerk_token(request)
    except Exception as e:
        raise HTTPException(
            status_code=401, 
            detail="Authentication failed"
        )

    clerk_id = payload.get("sub")
    if not clerk_id:
        raise HTTPException(
            status_code=401,
            detail="Invalid token: Missing 'sub' claim",
        )

    email = payload.get("email") or payload.get("primary_email_address")
    clerk_role = None

    try:
        clerk_user = clerk_sdk.users.get(user_id=clerk_id)
        if clerk_user:
            # Check public metadata for role: "admin"
            metadata = getattr(clerk_user, "public_metadata", {}) or {}
            clerk_role = metadata.get("role")

            if not email and getattr(clerk_user, "email_addresses", None):
                primary_id = getattr(clerk_user, "primary_email_address_id", None)
                for addr in clerk_user.email_addresses:
                    if getattr(addr, "id", None) == primary_id:
                        email = getattr(addr, "email_address", None)
                        break
                if not email and len(clerk_user.email_addresses) > 0:
                    email = getattr(clerk_user.email_addresses[0], "email_address", None)
    except Exception as err:
        print("[get_current_user] Clerk metadata query notice:", err)

    user = await get_or_create_user(
        db=db,
        clerk_id=clerk_id,
        email=email,
        clerk_role=clerk_role,
    )

    return user


async def check_and_consume_ai_quota(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> User:
    """Enforces 5 AI requests limit for standard users; configured admin emails/roles have unlimited requests."""
    if is_admin_user(user):
        return user

    if user.ai_requests_count >= FREE_AI_LIMIT:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"You have reached your free limit of {FREE_AI_LIMIT} AI requests. Please contact support to upgrade your account tier.",
        )

    user.ai_requests_count += 1
    await db.commit()
    await db.refresh(user)
    return user