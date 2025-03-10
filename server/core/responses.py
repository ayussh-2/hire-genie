from typing import Any, Dict, Optional, Union
from fastapi import status
from fastapi.responses import JSONResponse


def success_response(
    data: Any = None,
    message: str = "Operation successful",
    status_code: int = status.HTTP_200_OK,
) -> Dict[str, Any]:
    """
    Create a standardized success response
    """
    return {"status": "success", "message": message, "data": data}


def error_response(
    message: str = "An error occurred",
    errors: Optional[Union[str, Dict, list]] = None,
    status_code: int = status.HTTP_400_BAD_REQUEST,
) -> JSONResponse:
    """
    Create a standardized error response
    """
    return JSONResponse(
        status_code=status_code,
        content={"status": "error", "message": message, "errors": errors},
    )
