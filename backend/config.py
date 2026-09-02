from urllib.parse import urlparse, parse_qs, urlencode, urlunparse
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import field_validator


def clean_postgres_asyncpg_url(url: str) -> str:
    if not isinstance(url, str):
        return url
    url = url.strip()

    # Replace dialect with postgresql+asyncpg
    if url.startswith("postgres://"):
        url = "postgresql+asyncpg://" + url[len("postgres://"):]
    elif url.startswith("postgresql://") and not url.startswith("postgresql+asyncpg://"):
        url = "postgresql+asyncpg://" + url[len("postgresql://"):]

    parsed = urlparse(url)
    query_params = parse_qs(parsed.query)

    # Filter query parameters for asyncpg compatibility
    cleaned_params = {}

    # Handle SSL
    if "sslmode" in query_params:
        mode = query_params["sslmode"][0]
        if mode in ("require", "verify-ca", "verify-full", "prefer"):
            cleaned_params["ssl"] = "require"
    elif "ssl" in query_params:
        cleaned_params["ssl"] = query_params["ssl"][0]

    # Only pass allowed asyncpg parameters; ignore libpq-only parameters like channel_binding
    allowed_keys = {"ssl", "timeout", "command_timeout", "server_settings"}
    for k, v in query_params.items():
        if k in allowed_keys and k not in cleaned_params:
            cleaned_params[k] = v[0]

    new_query = urlencode(cleaned_params)
    return urlunparse((
        parsed.scheme,
        parsed.netloc,
        parsed.path,
        parsed.params,
        new_query,
        parsed.fragment
    ))


class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/resumeiq_test"
    CLERK_SECRET_KEY: str = "test_clerk_secret"
    GEMINI_API_KEY: str = "test_gemini_key"
    CLERK_AUTHORIZED_PARTIES: str = "http://localhost:5173"
    ADMIN_EMAILS: str = "aradwadtushar72@gmail.com"
    SUPPORT_EMAIL: str = "aradwadt47@gmail.com"

    @field_validator("DATABASE_URL", mode="before")
    @classmethod
    def assemble_db_connection(cls, v: str) -> str:
        return clean_postgres_asyncpg_url(v)

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore"
    )


settings = Settings()