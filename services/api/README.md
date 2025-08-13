# OptiSentry – Superfinal

## Run (local)
```bash
python -m venv .venv && . .venv/bin/activate
pip install -e .[dev]
make dev-up
# open http://localhost:8000/api-docs and /ui
```

## Migrate
```bash
make migrate
```

## ENV
See `.env.example` and `GO-LIVE.md`.


## Windows Quick Start (PowerShell)
```powershell
# 1) Start per PowerShell ohne make/pip editable
./run.ps1

# 2) In neuem Terminal (Migrationen)
./migrate.ps1

# 3) Aufrufen
# http://localhost:8000/api-docs
# http://localhost:8000/ui
```

## Docker Desktop (optional)
```powershell
docker-compose up --build
# in anderem Terminal:
./migrate.ps1
```
