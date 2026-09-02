"""add role and ai_requests_count to users

Revision ID: 7a8b9c0d1e2f
Revises: 5603a0a3f250
Create Date: 2026-09-03 00:30:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '7a8b9c0d1e2f'
down_revision: Union[str, Sequence[str], None] = '5603a0a3f250'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Check and add columns with safe default values
    op.add_column(
        'users',
        sa.Column('role', sa.String(), server_default='user', nullable=False)
    )
    op.add_column(
        'users',
        sa.Column('ai_requests_count', sa.Integer(), server_default='0', nullable=False)
    )


def downgrade() -> None:
    op.drop_column('users', 'ai_requests_count')
    op.drop_column('users', 'role')
