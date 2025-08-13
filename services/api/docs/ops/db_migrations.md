# DB Migrations (Alembic)

## Create initial revision
```bash
alembic revision --autogenerate -m "initial"
```

## Apply
```bash
alembic upgrade head
```

## Rollback (one step)
```bash
alembic downgrade -1
```
