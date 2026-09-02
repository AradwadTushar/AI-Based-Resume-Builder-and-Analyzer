from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from models.user import User
from config import settings


def is_admin_email(email: str | None) -> bool:
    if not email:
        return False
    admin_list = [e.strip().lower() for e in settings.ADMIN_EMAILS.split(",") if e.strip()]
    return email.strip().lower() in admin_list


async def get_or_create_user(
    db: AsyncSession,
    clerk_id: str,
    email: str | None = None,
    clerk_role: str | None = None,
):
    result = await db.execute(
        select(User).where(
            User.clerk_id == clerk_id
        )
    )

    user = result.scalar_one_or_none()
    should_be_admin = is_admin_email(email) or (clerk_role == "admin")

    if user:
        updated = False
        if email and user.email != email:
            user.email = email
            updated = True
        if should_be_admin and user.role != "admin":
            user.role = "admin"
            updated = True
        if updated:
            await db.commit()
            await db.refresh(user)
        return user

    new_user = User(
        clerk_id=clerk_id,
        email=email,
        role="admin" if should_be_admin else "user",
        ai_requests_count=0,
    )

    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)

    return new_user