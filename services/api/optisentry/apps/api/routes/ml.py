from __future__ import annotations
import uuid
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session
from sqlalchemy import select
from optisentry.core.db import SessionLocal
from optisentry.core.db.models import ModelRegistry, ModelRun, PredictionLog, DriftEvent, UsageCounter

router = APIRouter(prefix="/ml", tags=["ml"])

def get_db():
    s = SessionLocal()
    try: yield s
    finally: s.close()

class ModelCreate(BaseModel):
    tenant_id: str
    name: str
    version: str = "v1"

@router.post("/models")
def create_model(body: ModelCreate, db: Session = Depends(get_db)):
    mid = str(uuid.uuid4())
    row = ModelRegistry(id=mid, tenant_id=body.tenant_id, name=body.name, version=body.version)
    db.add(row); db.commit()
    return {"id": mid, "name": body.name, "version": body.version}

@router.get("/models/{tenant_id}")
def list_models(tenant_id: str, db: Session = Depends(get_db)):
    rows = db.execute(select(ModelRegistry).where(ModelRegistry.tenant_id==tenant_id)).scalars().all()
    return [{"id": r.id, "name": r.name, "version": r.version, "status": r.status} for r in rows]

class RunCreate(BaseModel):
    tenant_id: str
    model_id: str
    run_key: str
    env: str = "prod"

@router.post("/runs")
def create_run(body: RunCreate, db: Session = Depends(get_db)):
    if not db.get(ModelRegistry, body.model_id): raise HTTPException(404, "model not found")
    rid = str(uuid.uuid4())
    row = ModelRun(id=rid, tenant_id=body.tenant_id, model_id=body.model_id, run_key=body.run_key, env=body.env)
    db.add(row); db.commit()
    return {"id": rid, "run_key": body.run_key}

@router.get("/runs/{tenant_id}")
def list_runs(tenant_id: str, db: Session = Depends(get_db)):
    rows = db.execute(select(ModelRun).where(ModelRun.tenant_id==tenant_id)).scalars().all()
    return [{"id": r.id, "model_id": r.model_id, "run_key": r.run_key, "env": r.env, "status": r.status} for r in rows]

class PredIn(BaseModel):
    tenant_id: str
    model_id: str
    run_id: str
    y_pred: float = Field(ge=0.0, le=1.0)
    y_true: float | None = Field(default=None, ge=0.0, le=1.0)

@router.post("/predictions/log")
def log_prediction(body: PredIn, db: Session = Depends(get_db)):
    db.add(PredictionLog(tenant_id=body.tenant_id, model_id=body.model_id, run_id=body.run_id, y_pred=body.y_pred, y_true=body.y_true))
    # increment usage
    import datetime as dt
    day = dt.datetime.utcnow().strftime("%Y-%m-%d")
    row = db.execute(select(UsageCounter).where(UsageCounter.day==day, UsageCounter.tenant_id==body.tenant_id, UsageCounter.metric=="predictions")).scalars().first()
    if not row:
        row = UsageCounter(day=day, tenant_id=body.tenant_id, metric="predictions", value=0); db.add(row)
    row.value = int(row.value or 0) + 1
    db.commit()
    return {"ok": True}

@router.get("/calibration/{tenant_id}/{model_id}")
def calibration(tenant_id: str, model_id: str, db: Session = Depends(get_db)):
    rows = db.execute(select(PredictionLog).where(PredictionLog.tenant_id==tenant_id, PredictionLog.model_id==model_id, PredictionLog.y_true!=None)).scalars().all()
    bins = [0]*10; pos=[0]*10
    for r in rows:
        idx = min(9, int(r.y_pred*10)); bins[idx]+=1; pos[idx]+= 1 if (r.y_true or 0)>=0.5 else 0
    return {"bins": bins, "positives": pos}
