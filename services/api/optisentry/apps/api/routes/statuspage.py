from __future__ import annotations
import json
from pathlib import Path
from fastapi import APIRouter, HTTPException
from fastapi.responses import HTMLResponse

router = APIRouter(prefix="/statuspage", tags=["statuspage"])
CFG = Path("statuspage/config.json")

@router.get("")
def overall():
    if not CFG.exists(): raise HTTPException(404, "config missing")
    data = json.loads(CFG.read_text())
    return data

@router.get("/components")
def components():
    if not CFG.exists(): raise HTTPException(404, "config missing")
    data = json.loads(CFG.read_text())
    return {"components": data.get("components", [])}

@router.get("/html", include_in_schema=False)
def html():
    if not CFG.exists(): raise HTTPException(404, "config missing")
    d = json.loads(CFG.read_text())
    html = "<h1>OptiSentry Status</h1><p>Overall: {}</p><ul>{}</ul>".format(
        d.get("overall","unknown"),
        "".join("<li>{}: {}</li>".format(c["name"], c["status"]) for c in d.get("components",[]))
    )
    return HTMLResponse(html)
