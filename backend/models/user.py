from sqlalchemy import String, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship

from models.base import Base
from models.base import UUIDMixin, TimestampMixin


class User(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "users"

    clerk_id: Mapped[str] = mapped_column(
        String,
        unique=True,
        nullable=False,
    )

    email: Mapped[str] = mapped_column(
        String,
        unique=True,
        nullable=True,
    )

    role: Mapped[str] = mapped_column(
        String,
        default="user",
        nullable=False,
    )

    ai_requests_count: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False,
    )

    resumes = relationship(
        "Resume",
        back_populates="user",
        cascade="all, delete-orphan",
    )

    analyses = relationship(
        "Analysis",
        back_populates="user",
        cascade="all, delete-orphan",
    )
    
    