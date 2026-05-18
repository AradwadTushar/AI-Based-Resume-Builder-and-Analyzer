from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from models.user import User


async def get_or_create_user(
    db: AsyncSession,
    clerk_id: str,
):
    result = await db.execute(
        select(User).where(
            User.clerk_id == clerk_id
        )
    )

    user = result.scalar_one_or_none()

    if user:
        return user

    new_user = User(
        clerk_id=clerk_id,
    )

    db.add(new_user)

    await db.commit()

    await db.refresh(new_user)

    return new_user