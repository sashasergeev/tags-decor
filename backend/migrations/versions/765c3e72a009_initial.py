"""Initial

Revision ID: 765c3e72a009
Revises: 
Create Date: 2022-01-08 21:23:42.320645

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '765c3e72a009'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('category', sa.Column('description', sa.String(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('category', 'description')
    # ### end Alembic commands ###