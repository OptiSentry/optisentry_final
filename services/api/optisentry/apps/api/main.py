from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from optisentry.core.security.headers import SecurityHeadersMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from optisentry.core.security.csrf import verify_csrf
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from optisentry.core.db import engine, Base, SessionLocal


app = FastAPI(title="OptiSentry", version="1.0.0")

app.add_middleware(SecurityHeadersMiddleware)

class CSRFMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        try:
            verify_csrf(request)
        except Exception as e:
            from fastapi import HTTPException
            raise e
        return await call_next(request)

app.add_middleware(CSRFMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    s = SessionLocal()
    try: yield s
    finally: s.close()

# Include routers
from optisentry.apps.api.routes.feature_flags import router as feature_flags_router
from optisentry.apps.api.routes.experiments import router as experiments_router
from optisentry.apps.api.routes.ml import router as ml_router
from optisentry.apps.api.routes.alerts import router as alerts_router
from optisentry.apps.api.routes.connectors import router as connectors_router
from optisentry.apps.api.routes.audit_export import router as audit_router
from optisentry.apps.api.routes.public_docs import router as public_docs_router
from optisentry.apps.api.routes.statuspage import router as statuspage_router
from optisentry.apps.api.routes.trust_center import router as trust_router
from optisentry.apps.api.routes.auth import router as auth_router
from optisentry.apps.api.routes.billing import router as billing_router

app.include_router(auth_router)
app.include_router(feature_flags_router)
app.include_router(experiments_router)
app.include_router(ml_router)
app.include_router(alerts_router)
app.include_router(connectors_router)
app.include_router(audit_router)
app.include_router(public_docs_router)
app.include_router(statuspage_router)
app.include_router(trust_router)
app.include_router(billing_router)

# Static mounts
app.mount("/site", StaticFiles(directory="web/landing", html=True), name="site")
app.mount("/ui", StaticFiles(directory="web/ui", html=True), name="ui")

@app.get("/healthz")
def health():
    return {"ok": True}
