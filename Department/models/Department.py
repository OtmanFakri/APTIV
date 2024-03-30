from sqlalchemy import Column, BigInteger, String, ForeignKey
from sqlalchemy.orm import relationship

from configs.BaseModel import EntityMeta


class Department(EntityMeta):
    __tablename__ = 'Departments'
    id = Column(BigInteger, primary_key=True)
    job_id = Column(BigInteger, ForeignKey('Jobs.id'), nullable=False)
    color = Column(String(255), nullable=False)
    name = Column(String(255), nullable=False)

    job = relationship('Job')