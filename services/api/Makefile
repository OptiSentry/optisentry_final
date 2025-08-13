.PHONY: dev-up migrate test format

dev-up:
	uvicorn optisentry.apps.api.main:app --reload

migrate:
	alembic upgrade head

format:
	ruff check --fix . || true

test:
	pytest -q
