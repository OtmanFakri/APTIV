from sqlalchemy import Column, BigInteger, String
from configs.BaseModel import EntityMeta


class Job(EntityMeta):
    __tablename__ = 'Jobs'
    id = Column(BigInteger, primary_key=True)
    name = Column(String(255), nullable=False)
