from __future__ import annotations
import uuid, hashlib
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session
from sqlalchemy import select
from optisentry.core.db import SessionLocal
from optisentry.core.db.models import Tenant, User
from optisentry.core.security.tokens import create_access_token, create_refresh_token

router = APIRouter(prefix="/auth", tags=["auth"])

def get_db():
    s = SessionLocal()
    try: yield s
    finally: s.close()

class SignupIn(BaseModel):
    tenant_name: str
    email: EmailStr
    password: str

@router.post("/signup")
def signup(body: SignupIn, db: Session = Depends(get_db)):
    tid = str(uuid.uuid4())
    uid = str(uuid.uuid4())
    pwd = hashlib.sha256(body.password.encode()).hexdigest()
    db.add(Tenant(id=tid, name=body.tenant_name))
    db.add(User(id=uid, tenant_id=tid, email=body.email, password_hash=pwd, role="owner"))
    db.commit()
    return {
        "access_token": create_access_token(uid, tid, "owner"),
        "refresh_token": create_refresh_token(uid, tid, "owner"),
        "token_type": "bearer"
    }
