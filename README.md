# OptiSentry – Monorepo (Full)

## Struktur
- `services/api` — FastAPI Backend (Stripe, Entitlements, Usage, Reports, Security, CI)
- `apps/site` — Marketing Website (Next.js)
- `apps/app` — Dashboard (Next.js)
- `apps/docs` — Docs Portal
- `infra` — Terraform/Helm Skeleton
- `policies` — Rechtstexte (MD)
- `cmp` — Consent Manager Config
- `design` — Design Tokens & Assets
- `.github/workflows` — CI Templates

## Quick Start (Windows)
### API
```powershell
cd services/api
./run.ps1
# neues Terminal
./migrate.ps1
# http://localhost:8000/api-docs
```

### Site/App (Next.js)
```bash
cd apps/site && npm install && npm run dev
cd apps/app  && npm install && npm run dev
```
Vor Produktion `.env.example` Dateien pflegen.

## Docker (nur API)
```powershell
cd services/api
docker-compose up --build
./migrate.ps1
```
