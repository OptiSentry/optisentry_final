from __future__ import annotations
import uuid
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session
from sqlalchemy import select, func
from optisentry.core.db import SessionLocal
from optisentry.core.db.models import Experiment, ExperimentVariant, ExperimentAssignment, ProductEvent
from optisentry.experiments.service import Variant, choose_variant, srm_pvalue

router = APIRouter(prefix="/experiments", tags=["experiments"])

def get_db():
    s = SessionLocal()
    try: yield s
    finally: s.close()

class VariantIn(BaseModel):
    key: str = Field(pattern="^[a-zA-Z0-9_\-]+$")
    weight: int = Field(ge=0, le=100)

class ExperimentCreate(BaseModel):
    tenant_id: str
    key: str
    description: str | None = None
    variants: list[VariantIn]
    guardrails: dict | None = None

@router.post("/")
def create_experiment(body: ExperimentCreate, db: Session = Depends(get_db)):
    eid = str(uuid.uuid4())
    db.add(Experiment(id=eid, tenant_id=body.tenant_id, key=body.key, description=body.description, status="running", guardrails=body.guardrails or {}))
    for v in body.variants:
        db.add(ExperimentVariant(id=str(uuid.uuid4()), experiment_id=eid, key=v.key, weight=v.weight))
    db.commit()
    return {"id": eid, "key": body.key, "status": "running"}

class AssignReq(BaseModel):
    tenant_id: str
    user_id: str
    experiment_key: str

@router.post("/assign")
def assign_variant(body: AssignReq, db: Session = Depends(get_db)):
    exp = db.execute(select(Experiment).where(Experiment.tenant_id==body.tenant_id, Experiment.key==body.experiment_key)).scalars().first()
    if not exp or exp.status != "running":
        raise HTTPException(404, "experiment not running or not found")
    vars = db.execute(select(ExperimentVariant).where(ExperimentVariant.experiment_id==exp.id)).scalars().all()
    if not vars:
        raise HTTPException(400, "no variants defined")
    v = choose_variant(body.user_id, exp.key, [Variant(key=x.key, weight=x.weight) for x in vars])
    db.add(ExperimentAssignment(experiment_id=exp.id, user_id=body.user_id, variant_key=v))
    db.commit()
    return {"experiment": exp.key, "variant": v}

class EventIn(BaseModel):
    tenant_id: str
    user_id: str | None = None
    event: str
    properties: dict | None = None

@router.post("/event")
def log_event(body: EventIn, db: Session = Depends(get_db)):
    db.add(ProductEvent(tenant_id=body.tenant_id, user_id=body.user_id, event=body.event, properties=body.properties or {}))
    db.commit()
    return {"ok": True}

@router.get("/guardrails/{tenant_id}/{experiment_key}")
def guardrails_status(tenant_id: str, experiment_key: str, db: Session = Depends(get_db)):
    exp = db.execute(select(Experiment).where(Experiment.tenant_id==tenant_id, Experiment.key==experiment_key)).scalars().first()
    if not exp: raise HTTPException(404, "not found")
    vars = db.execute(select(ExperimentVariant).where(ExperimentVariant.experiment_id==exp.id)).scalars().all()
    weights = [x.weight for x in vars]
    counts = [db.execute(select(func.count()).select_from(ExperimentAssignment).where(ExperimentAssignment.experiment_id==exp.id, ExperimentAssignment.variant_key==x.key)).scalar_one() for x in vars]
    pval = srm_pvalue(counts, weights)
    srm_ok = pval >= (exp.guardrails.get("srm_p", 0.01) if exp.guardrails else 0.01)
    min_per_arm = (exp.guardrails.get("min_per_arm", 0) if exp.guardrails else 0)
    sample_ok = all(c >= min_per_arm for c in counts) if min_per_arm else True
    return {"variants": [x.key for x in vars], "counts": counts, "weights": weights, "srm_pvalue": pval, "srm_ok": srm_ok, "sample_ok": sample_ok}
