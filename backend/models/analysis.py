import uuid

from sqlalchemy import ForeignKey, Integer, Text
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from models.base import Base
from models.base import UUIDMixin, TimestampMixin


class Analysis(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "analyses"

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )

    resume_text: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    job_description: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    score: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    feedback: Mapped[dict] = mapped_column(
        JSONB,
        nullable=False,
        default=dict,
    )

    user = relationship(
        "User",
        back_populates="analyses",
    )