import os, stripe
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="OptiSentry Minimal API")

ALLOWED = [o.strip() for o in os.getenv("ALLOWED_ORIGINS", "https://optisentry.com,https://www.optisentry.com").split(",") if o.strip()]
app.add_middleware(CORSMiddleware, allow_origins=ALLOWED, allow_methods=["*"], allow_headers=["*"])

@app.get("/healthz")
def health(): 
    return {"ok": True}

@app.post("/billing/checkout")
def checkout(tier: str = "pro"):
    sec = os.getenv("STRIPE_SECRET_KEY")
    if not sec:
        raise HTTPException(500, "Stripe key missing")
    stripe.api_key = sec
    price = os.getenv("STRIPE_PRICE_PRO") if tier == "pro" else os.getenv("STRIPE_PRICE_BUSINESS")
    if not price:
        raise HTTPException(400, "price id missing")
    success = os.getenv("STRIPE_SUCCESS_URL", "https://optisentry.com/app/billing/success")
    cancel  = os.getenv("STRIPE_CANCEL_URL",  "https://optisentry.com/app/billing/cancel")
    session = stripe.checkout.Session.create(
        mode="subscription",
        line_items=[{"price": price, "quantity": 1}],
        success_url=success + "?session_id={CHECKOUT_SESSION_ID}",
        cancel_url=cancel,
        automatic_tax={"enabled": True},
        allow_promotion_codes=True
    )
    return {"url": session.url}
