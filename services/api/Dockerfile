FROM python:3.11-slim

WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1

RUN pip install --no-cache-dir --upgrade pip && useradd -m app
COPY pyproject.toml /app/
RUN pip install --no-cache-dir -e .[dev]

COPY . /app
USER app

EXPOSE 8000
CMD ["uvicorn","optisentry.apps.api.main:app","--host","0.0.0.0","--port","8000"]
