from fastapi import APIRouter
from fastapi.responses import HTMLResponse
router = APIRouter()

@router.get("/api-docs", include_in_schema=False)
def api_docs() -> HTMLResponse:
    html = """<!doctype html><html><head><meta charset="utf-8"/>
    <title>OptiSentry API Docs</title>
    <script src="https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js"></script>
    </head><body><redoc spec-url='/openapi.json' expand-responses='200,201'></redoc></body></html>"""
    return HTMLResponse(content=html)
