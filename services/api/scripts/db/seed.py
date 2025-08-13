import uuid
from optisentry.core.db import SessionLocal, Base, engine
from optisentry.core.db.models import Tenant, User, FeatureFlag

def seed():
    Base.metadata.create_all(bind=engine)  # only for dev seed bootstrap
    s = SessionLocal()
    tid = str(uuid.uuid4()); uid = str(uuid.uuid4())
    s.add(Tenant(id=tid, name="Demo"))
    s.add(User(id=uid, tenant_id=tid, email="owner@example.com", password_hash="dev", role="owner"))
    s.add(FeatureFlag(tenant_id=tid, key="paywall_v2", enabled=True))
    s.commit(); s.close()
    print("Seeded tenant:", tid)

if __name__ == "__main__":
    seed()
