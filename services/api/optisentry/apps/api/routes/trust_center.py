from __future__ import annotations
from fastapi import APIRouter, HTTPException, Request, Response
from pathlib import Path
import hashlib

router = APIRouter(prefix="/trust-center", tags=["trust"])
BASE = Path("docs/trust-center")

@router.get("")
def index():
    items = {p.stem: f"/trust-center/{p.stem}" for p in BASE.glob("*.md")}
    return {"pages": items}

def _serve_md(path: Path, request: Request) -> Response:
    if not path.exists(): raise HTTPException(404, "Not found")
    text = path.read_text(encoding="utf-8")
    etag = hashlib.sha256(text.encode()).hexdigest()
    if request.headers.get("if-none-match") == etag:
        return Response(status_code=304, headers={"ETag": etag})
    return Response(text, media_type="text/markdown; charset=utf-8", headers={"ETag": etag, "Cache-Control": "public, max-age=1800"})

@router.get("/{page}")
def page(page: str, request: Request):
    p = BASE / f"{page}.md"
    return _serve_md(p, request)
