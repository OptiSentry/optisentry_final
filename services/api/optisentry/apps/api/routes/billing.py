from __future__ import annotations
import os, stripe
from fastapi import APIRouter, Request, HTTPException, Depends
from sqlalchemy.orm import Session
from optisentry.core.db import SessionLocal
from optisentry.core.billing.idempotency import is_duplicate, save_event

router = APIRouter(prefix="/billing", tags=["billing"])

def get_db():
    s = SessionLocal()
    try: yield s
    finally: s.close()

@router.post("/webhook")
async def stripe_webhook(request: Request, db: Session = Depends(get_db)):
    payload = await request.body()
    wh_secret = os.getenv("STRIPE_WEBHOOK_SECRET")
    if not wh_secret:
        raise HTTPException(500, "Webhook secret not configured")
    sig = request.headers.get("stripe-signature", "")
    try:
        event = stripe.Webhook.construct_event(payload=payload, sig_header=sig, secret=wh_secret)
    except Exception as e:
        raise HTTPException(400, f"signature error: {e}")

    if is_duplicate(db, event["id"]):
        return {"ok": True, "duplicate": True}

    etype = event["type"]
    data = event["data"]["object"]

    # TODO: map subscription state to tenant's plan (billing_subscriptions table)
    save_event(db, event["id"], etype, data)
    return {"ok": True, "type": etype}
