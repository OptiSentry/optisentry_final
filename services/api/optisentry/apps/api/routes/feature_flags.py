from __future__ import annotations
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy import select
from optisentry.core.db import SessionLocal
from optisentry.core.db.models import FeatureFlag, User

router = APIRouter(prefix="/feature-flags", tags=["feature-flags"])

def get_db():
    s = SessionLocal()
    try: yield s
    finally: s.close()

class FlagUpsert(BaseModel):
    tenant_id: str
    key: str
    enabled: bool

@router.post("/")
def upsert_flag(body: FlagUpsert, db: Session = Depends(get_db)):
    row = db.execute(select(FeatureFlag).where(FeatureFlag.tenant_id==body.tenant_id, FeatureFlag.key==body.key)).scalars().first()
    if not row:
        row = FeatureFlag(tenant_id=body.tenant_id, key=body.key, enabled=body.enabled); db.add(row)
    else:
        row.enabled = body.enabled
    db.commit()
    return {"key": body.key, "enabled": body.enabled}

@router.get("/{tenant_id}/{key}")
def get_flag(tenant_id: str, key: str, db: Session = Depends(get_db)):
    row = db.execute(select(FeatureFlag).where(FeatureFlag.tenant_id==tenant_id, FeatureFlag.key==key)).scalars().first()
    return {"key": key, "enabled": bool(row.enabled) if row else False}
