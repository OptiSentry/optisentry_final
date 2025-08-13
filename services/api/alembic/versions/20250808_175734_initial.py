from alembic import op
import sqlalchemy as sa

revision = "20250808_175734_initial"
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    # schema created via migrations, keep minimal to avoid drift
    pass

def downgrade():
    pass
