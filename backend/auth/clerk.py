from fastapi import HTTPException, status

from clerk_backend_api import Clerk
from clerk_backend_api.security.types import AuthenticateRequestOptions

from config import settings


clerk_sdk = Clerk(
    bearer_auth=settings.CLERK_SECRET_KEY,
)


async def verify_clerk_token(request):
    request_state = clerk_sdk.authenticate_request(
        request,
        AuthenticateRequestOptions(
            authorized_parties=settings.CLERK_AUTHORIZED_PARTIES.split(",")
        ),
    )

    print("REQUEST STATE:", request_state)

    print("IS SIGNED IN:", request_state.is_signed_in)

    print("PAYLOAD:", request_state.payload)

    print("REASON:", request_state.reason)

    if not request_state.is_signed_in:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Auth failed: {request_state.reason}",
        )

    return request_state.payload