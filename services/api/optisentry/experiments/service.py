import os, hashlib, math
from dataclasses import dataclass

@dataclass
class Variant:
    key: str
    weight: int

def _hash_bucket(user_id: str, experiment_key: str, salt: str | None = None) -> int:
    salt = salt or os.getenv("EXPERIMENT_SALT","exp-salt")
    h = hashlib.sha256(f"{salt}:{experiment_key}:{user_id}".encode()).hexdigest()
    return int(h[:8], 16) % 10000

def choose_variant(user_id: str, experiment_key: str, variants: list[Variant]) -> str:
    total = sum(max(0, v.weight) for v in variants) or 1
    bucket = _hash_bucket(user_id, experiment_key)
    acc = 0
    for v in variants:
        span = int(10000 * (max(0, v.weight) / total))
        if bucket < acc + span:
            return v.key
        acc += span
    return variants[-1].key

def srm_pvalue(observed: list[int], weights: list[int]) -> float:
    n = sum(observed)
    if n == 0: return 1.0
    wsum = sum(weights) or 1
    expected = [n * (w / wsum) for w in weights]
    chi2 = 0.0
    for o, e in zip(observed, expected):
        if e > 0:
            chi2 += (o - e) ** 2 / e
    return math.exp(-chi2 / 2)
