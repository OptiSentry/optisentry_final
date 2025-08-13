from __future__ import annotations
import os, smtplib
from email.mime.text import MIMEText
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
import httpx

router = APIRouter(prefix="/alerts", tags=["alerts"])

class SlackMsg(BaseModel):
    text: str

@router.post("/slack")
async def slack(body: SlackMsg):
    url = os.getenv("SLACK_WEBHOOK_URL")
    if not url: return {"ok": True, "simulated": True}
    async with httpx.AsyncClient(timeout=5) as client:
        r = await client.post(url, json={"text": body.text})
        if r.status_code >= 300: raise HTTPException(r.status_code, r.text)
    return {"ok": True}

class EmailMsg(BaseModel):
    to: str; subject: str; text: str

@router.post("/email")
def email(body: EmailMsg):
    host = os.getenv("SMTP_HOST"); port = int(os.getenv("SMTP_PORT","587")); user=os.getenv("SMTP_USER"); pwd=os.getenv("SMTP_PASS")
    sender = os.getenv("SMTP_FROM","no-reply@example.com")
    if not host: return {"ok": True, "simulated": True}
    msg = MIMEText(body.text); msg["Subject"]=body.subject; msg["From"]=sender; msg["To"]=body.to
    with smtplib.SMTP(host, port, timeout=5) as s:
        try: s.starttls()
        except Exception: pass
        if user and pwd: s.login(user,pwd)
        s.sendmail(sender, [body.to], msg.as_string())
    return {"ok": True}
