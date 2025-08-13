import os, datetime as dt
import redis

REDIS_URL = os.getenv("REDIS_URL","redis://localhost:6379/0")
_r = redis.from_url(REDIS_URL, decode_responses=True)

def _k(tenant_id: str, metric: str) -> str:
    day = dt.datetime.utcnow().strftime("%Y-%m-%d")
    return f"use:{tenant_id}:{metric}:{day}"

def incr(tenant_id: str, metric: str, by: int = 1):
    key = _k(tenant_id, metric)
    _r.incrby(key, by)
    _r.expire(key, 60*60*48)

def get(tenant_id: str, metric: str) -> int:
    val = _r.get(_k(tenant_id, metric))
    return int(val or 0)
