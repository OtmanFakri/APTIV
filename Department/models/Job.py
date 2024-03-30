from sqlalchemy import Column, BigInteger, String, ForeignKey
from sqlalchemy.orm import relationship

from configs.BaseModel import EntityMeta


class Job(EntityMeta):
    __tablename__ = 'Jobs'
    id = Column(BigInteger, primary_key=True)
    name = Column(String(255), nullable=False)
    department_id = Column(BigInteger, ForeignKey('Departments.id'))

    department = relationship('Department', back_populates='jobs')
