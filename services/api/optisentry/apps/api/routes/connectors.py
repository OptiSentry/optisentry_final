from __future__ import annotations
import os, json, datetime as dt, pathlib
from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import select
from optisentry.core.db import SessionLocal
from optisentry.core.db.models import PredictionLog, AuditLog

router = APIRouter(prefix="/connectors", tags=["connectors"])

def get_db():
    s = SessionLocal()
    try: yield s
    finally: s.close()

def _write_local(payload: list[dict], fname: str) -> str:
    out_dir = pathlib.Path("exports"); out_dir.mkdir(exist_ok=True)
    out = out_dir / fname
    out.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    return str(out)

@router.post("/export")
def export_data(kind: str = "predictions", db: Session = next(get_db())):
    if kind == "predictions":
        rows = db.execute(select(PredictionLog)).scalars().all()
        payload = [{"ts": str(r.created_at), "model_id": r.model_id, "run_id": r.run_id, "y_pred": r.y_pred, "y_true": r.y_true} for r in rows]
        path = _write_local(payload, f"predictions_{dt.datetime.utcnow().strftime('%Y%m%d%H%M%S')}.json")
    elif kind == "audit":
        rows = db.execute(select(AuditLog)).scalars().all()
        payload = [{"ts": str(r.created_at), "actor": r.actor_id, "action": r.action, "meta": r.meta} for r in rows]
        path = _write_local(payload, f"audit_{dt.datetime.utcnow().strftime('%Y%m%d%H%M%S')}.json")
    else:
        raise HTTPException(400, "unsupported kind")
    return {"path": path}
