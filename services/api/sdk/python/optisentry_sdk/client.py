import requests

class OptiSentry:
    def __init__(self, base_url: str, token: str | None = None):
        self.base = base_url.rstrip("/"); self.token = token
    def _h(self): return {"Authorization": f"Bearer {self.token}"} if self.token else {}
    def signup(self, tenant_name: str, email: str, password: str) -> dict:
        r = requests.post(self.base + "/auth/signup", json={"tenant_name": tenant_name, "email": email, "password": password}); r.raise_for_status(); return r.json()
