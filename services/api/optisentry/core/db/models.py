from __future__ import annotations
import sqlalchemy as sa
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func
from . import Base

class TimestampMixin:
    created_at: Mapped["sa.DateTime"] = mapped_column(sa.DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped["sa.DateTime"] = mapped_column(sa.DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

class Tenant(TimestampMixin, Base):
    __tablename__ = "tenants"
    id: Mapped[str] = mapped_column(sa.String(36), primary_key=True)
    name: Mapped[str] = mapped_column(sa.String(128))

class User(TimestampMixin, Base):
    __tablename__ = "users"
    id: Mapped[str] = mapped_column(sa.String(36), primary_key=True)
    tenant_id: Mapped[str] = mapped_column(sa.String(36), index=True)
    email: Mapped[str] = mapped_column(sa.String(255), unique=True)
    password_hash: Mapped[str] = mapped_column(sa.String(255))
    role: Mapped[str] = mapped_column(sa.String(16), default="owner")  # owner|admin|member

class AuditLog(TimestampMixin, Base):
    __tablename__ = "audit_log"
    id: Mapped[int] = mapped_column(sa.Integer, primary_key=True, autoincrement=True)
    tenant_id: Mapped[str] = mapped_column(sa.String(36), index=True)
    actor_id: Mapped[str] = mapped_column(sa.String(36), index=True)
    action: Mapped[str] = mapped_column(sa.String(64))
    meta: Mapped[str] = mapped_column(sa.Text)

# Feature flags & Experiments
class FeatureFlag(TimestampMixin, Base):
    __tablename__ = "feature_flags"
    id: Mapped[int] = mapped_column(sa.Integer, primary_key=True, autoincrement=True)
    tenant_id: Mapped[str] = mapped_column(sa.String(36), index=True)
    key: Mapped[str] = mapped_column(sa.String(64), index=True)
    enabled: Mapped[bool] = mapped_column(sa.Boolean, default=False)

class Experiment(TimestampMixin, Base):
    __tablename__ = "experiments"
    id: Mapped[str] = mapped_column(sa.String(36), primary_key=True)
    tenant_id: Mapped[str] = mapped_column(sa.String(36), index=True)
    key: Mapped[str] = mapped_column(sa.String(64), index=True)
    description: Mapped[str | None] = mapped_column(sa.String(255))
    status: Mapped[str] = mapped_column(sa.String(16), default="running")
    guardrails: Mapped[dict | None] = mapped_column(sa.JSON, nullable=True)

class ExperimentVariant(TimestampMixin, Base):
    __tablename__ = "experiment_variants"
    id: Mapped[str] = mapped_column(sa.String(36), primary_key=True)
    experiment_id: Mapped[str] = mapped_column(sa.String(36), index=True)
    key: Mapped[str] = mapped_column(sa.String(32))
    weight: Mapped[int] = mapped_column(sa.Integer, default=50)

class ExperimentAssignment(TimestampMixin, Base):
    __tablename__ = "experiment_assignments"
    id: Mapped[int] = mapped_column(sa.Integer, primary_key=True, autoincrement=True)
    experiment_id: Mapped[str] = mapped_column(sa.String(36), index=True)
    user_id: Mapped[str] = mapped_column(sa.String(36), index=True)
    variant_key: Mapped[str] = mapped_column(sa.String(32))

class ProductEvent(TimestampMixin, Base):
    __tablename__ = "product_events"
    id: Mapped[int] = mapped_column(sa.Integer, primary_key=True, autoincrement=True)
    tenant_id: Mapped[str] = mapped_column(sa.String(36), index=True)
    user_id: Mapped[str | None] = mapped_column(sa.String(36), index=True)
    event: Mapped[str] = mapped_column(sa.String(64))
    properties: Mapped[dict | None] = mapped_column(sa.JSON)
    ts: Mapped["sa.DateTime"] = mapped_column(sa.DateTime(timezone=True), server_default=sa.text("CURRENT_TIMESTAMP"))

# ML & metering
class ModelRegistry(TimestampMixin, Base):
    __tablename__ = "model_registry"
    id: Mapped[str] = mapped_column(sa.String(36), primary_key=True)
    tenant_id: Mapped[str] = mapped_column(sa.String(36), index=True)
    name: Mapped[str] = mapped_column(sa.String(128))
    version: Mapped[str] = mapped_column(sa.String(64), default="v1")
    status: Mapped[str] = mapped_column(sa.String(32), default="active")

class ModelRun(TimestampMixin, Base):
    __tablename__ = "model_runs"
    id: Mapped[str] = mapped_column(sa.String(36), primary_key=True)
    tenant_id: Mapped[str] = mapped_column(sa.String(36), index=True)
    model_id: Mapped[str] = mapped_column(sa.String(36), index=True)
    run_key: Mapped[str] = mapped_column(sa.String(128), index=True)
    env: Mapped[str] = mapped_column(sa.String(32), default="prod")
    status: Mapped[str] = mapped_column(sa.String(32), default="running")

class PredictionLog(TimestampMixin, Base):
    __tablename__ = "prediction_logs"
    id: Mapped[int] = mapped_column(sa.Integer, primary_key=True, autoincrement=True)
    tenant_id: Mapped[str] = mapped_column(sa.String(36), index=True)
    model_id: Mapped[str] = mapped_column(sa.String(36), index=True)
    run_id: Mapped[str] = mapped_column(sa.String(36), index=True)
    user_id: Mapped[str | None] = mapped_column(sa.String(36), index=True)
    y_pred: Mapped[float] = mapped_column(sa.Float)
    y_true: Mapped[float | None] = mapped_column(sa.Float, nullable=True)
    latency_ms: Mapped[int | None] = mapped_column(sa.Integer, nullable=True)
    tags: Mapped[dict | None] = mapped_column(sa.JSON)

class DriftEvent(TimestampMixin, Base):
    __tablename__ = "drift_events"
    id: Mapped[int] = mapped_column(sa.Integer, primary_key=True, autoincrement=True)
    tenant_id: Mapped[str] = mapped_column(sa.String(36), index=True)
    model_id: Mapped[str] = mapped_column(sa.String(36), index=True)
    run_id: Mapped[str] = mapped_column(sa.String(36), index=True)
    metric: Mapped[str] = mapped_column(sa.String(64))
    value: Mapped[float] = mapped_column(sa.Float)
    threshold: Mapped[float | None] = mapped_column(sa.Float)
    direction: Mapped[str | None] = mapped_column(sa.String(8))

class UsageCounter(TimestampMixin, Base):
    __tablename__ = "usage_counters"
    id: Mapped[int] = mapped_column(sa.Integer, primary_key=True, autoincrement=True)
    day: Mapped[str] = mapped_column(sa.String(10), index=True)  # YYYY-MM-DD
    tenant_id: Mapped[str] = mapped_column(sa.String(36), index=True)
    metric: Mapped[str] = mapped_column(sa.String(64), index=True)  # predictions|models
    value: Mapped[int] = mapped_column(sa.Integer, default=0)

class StripeEvent(TimestampMixin, Base):
    __tablename__ = "stripe_events"
    id: Mapped[str] = mapped_column(sa.String(128), primary_key=True)
    type: Mapped[str] = mapped_column(sa.String(64))
    payload: Mapped[dict | None] = mapped_column(sa.JSON, nullable=True)

