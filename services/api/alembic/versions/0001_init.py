from alembic import op
import sqlalchemy as sa

revision = "0001_init"
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    pass  # Using SQLAlchemy create_all at app startup for simplicity

def downgrade():
    pass
