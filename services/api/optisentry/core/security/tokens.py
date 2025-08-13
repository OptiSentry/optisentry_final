import os, time, json, hmac, hashlib, base64
from typing import Dict

def _b64url(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).rstrip(b"=").decode()

def _b64url_json(obj: dict) -> str:
    return _b64url(json.dumps(obj, separators=(",",":")).encode())

def _sign_hs256(k: bytes, msg: bytes) -> str:
    return _b64url(hmac.new(k, msg, hashlib.sha256).digest())

def _get_keys() -> Dict[str,str]:
    raw = os.getenv("JWT_KEYS_JSON")
    if raw:
        try: return json.loads(raw)
        except Exception: pass
    sk = os.getenv("SECRET_KEY","dev")
    return {"legacy": sk}

def create_access_token(sub: str, tenant_id: str, role: str, ttl: int = 3600) -> str:
    keys = _get_keys()
    kid = os.getenv("JWT_ACTIVE_KID", next(iter(keys.keys())))
    key = keys.get(kid) or next(iter(keys.values()))
    now = int(time.time())
    header = {"alg":"HS256","typ":"JWT","kid":kid}
    payload = {"sub":sub,"tenant_id":tenant_id,"role":role,"iat":now,"exp":now+ttl}
    msg = ("%s.%s" % (_b64url_json(header), _b64url_json(payload))).encode()
    sig = _sign_hs256(key.encode(), msg)
    return f"{_b64url_json(header)}.{_b64url_json(payload)}.{sig}"

def create_refresh_token(sub: str, tenant_id: str, role: str, ttl: int = 60*60*24*30) -> str:
    return create_access_token(sub=sub, tenant_id=tenant_id, role=role, ttl=ttl)

def decode_token(token: str) -> dict:
    parts = token.split(".")
    if len(parts)!=3: raise ValueError("bad token")
    header = json.loads(base64.urlsafe_b64decode(parts[0] + "==").decode())
    payload = json.loads(base64.urlsafe_b64decode(parts[1] + "==").decode())
    kid = header.get("kid")
    keys = _get_keys()
    key = keys.get(kid) or keys.get("legacy") or next(iter(keys.values()))
    msg = ("%s.%s" % (parts[0], parts[1])).encode()
    exp_sig = _sign_hs256(key.encode(), msg)
    if exp_sig != parts[2]:
        raise ValueError("bad signature")
    if payload.get("exp",0) < int(time.time()):
        raise ValueError("expired")
    return payload
