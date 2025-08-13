from __future__ import annotations
from sqlalchemy.orm import Session
from sqlalchemy import select
from optisentry.core.db.models import StripeEvent

def is_duplicate(db: Session, event_id: str) -> bool:
    row = db.execute(select(StripeEvent).where(StripeEvent.id==event_id)).scalars().first()
    return bool(row)

def save_event(db: Session, event_id: str, etype: str, payload: dict):
    db.add(StripeEvent(id=event_id, type=etype, payload=payload))
    db.commit()
