import pytest
from config import clean_postgres_asyncpg_url


def test_clean_postgres_asyncpg_url_postgres_prefix():
    raw_url = "postgres://user:pass@host.com:5432/db"
    cleaned = clean_postgres_asyncpg_url(raw_url)
    assert cleaned.startswith("postgresql+asyncpg://")


def test_clean_postgres_asyncpg_url_strips_channel_binding():
    raw_url = "postgresql://user:pass@ep-cloud.neon.tech/neondb?sslmode=require&channel_binding=require"
    cleaned = clean_postgres_asyncpg_url(raw_url)
    assert cleaned.startswith("postgresql+asyncpg://")
    assert "channel_binding" not in cleaned
    assert "ssl=require" in cleaned


def test_clean_postgres_asyncpg_url_normalizes_sslmode():
    raw_url = "postgresql://user:pass@host.com/db?sslmode=prefer"
    cleaned = clean_postgres_asyncpg_url(raw_url)
    assert "ssl=require" in cleaned
    assert "sslmode" not in cleaned


def test_clean_postgres_asyncpg_url_leaves_asyncpg_scheme_intact():
    raw_url = "postgresql+asyncpg://user:pass@host.com/db"
    cleaned = clean_postgres_asyncpg_url(raw_url)
    assert cleaned == "postgresql+asyncpg://user:pass@host.com/db"
