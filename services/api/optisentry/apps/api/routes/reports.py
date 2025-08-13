from __future__ import annotations
import os, time, hmac, hashlib
from fastapi import APIRouter, HTTPException
from fastapi.responses import HTMLResponse
from jinja2 import Environment, FileSystemLoader, select_autoescape

router = APIRouter(prefix="/reports", tags=["reports"])
SECRET = os.getenv("REPORT_SIGNING_SECRET","dev-report")

env = Environment(
    loader=FileSystemLoader("optisentry/core/reports/templates"),
    autoescape=select_autoescape()
)

def sign(path: str, ttl: int = 3600) -> str:
    exp = int(time.time()) + ttl
    msg = f"{path}:{exp}".encode()
    mac = hmac.new(SECRET.encode(), msg, hashlib.sha256).hexdigest()
    return f"{path}?exp={exp}&sig={mac}"

def verify(path: str, exp: int, sig: str) -> bool:
    msg = f"{path}:{exp}".encode()
    mac = hmac.new(SECRET.encode(), msg, hashlib.sha256).hexdigest()
    return hmac.compare_digest(mac, sig)

@router.get("/audit")
def audit_report() -> HTMLResponse:
    tpl = env.get_template("audit_report.html.j2")
    html = tpl.render(company="OptiSentry", ts=time.ctime())
    return HTMLResponse(html, headers={"Content-Disposition":"inline; filename=audit.html"})

@router.get("/download")
def download_signed(path: str, exp: int, sig: str):
    if exp < int(time.time()) or not verify(path, exp, sig):
        raise HTTPException(403, "invalid signature")
    if path != "/reports/audit":
        raise HTTPException(404, "not found")
    return audit_report()
