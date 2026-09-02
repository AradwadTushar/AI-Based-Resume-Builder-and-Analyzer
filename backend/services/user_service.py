from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from models.user import User

ADMIN_EMAIL = "aradwadtushar72@gmail.com"


async def get_or_create_user(
    db: AsyncSession,
    clerk_id: str,
    email: str | None = None,
):
    result = await db.execute(
        select(User).where(
            User.clerk_id == clerk_id
        )
    )

    user = result.scalar_one_or_none()

    is_admin_email = bool(email and email.lower().strip() == ADMIN_EMAIL.lower())

    if user:
        updated = False
        if email and user.email != email:
            user.email = email
            updated = True
        if is_admin_email and user.role != "admin":
            user.role = "admin"
            updated = True
        if updated:
            await db.commit()
            await db.refresh(user)
        return user

    new_user = User(
        clerk_id=clerk_id,
        email=email,
        role="admin" if is_admin_email else "user",
        ai_requests_count=0,
    )

    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)

    return new_user