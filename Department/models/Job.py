from sqlalchemy import Column, BigInteger, String, ForeignKey
from sqlalchemy.orm import relationship

from configs.BaseModel import EntityMeta


class Job(EntityMeta):
    __tablename__ = 'Jobs'

    id = Column(BigInteger, primary_key=True, index=True)
    name = Column(String(255), nullable=False, index=True)
    department_id = Column(BigInteger, ForeignKey('Departments.id'), index=True)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.employees = relationship('Employee', back_populates='job')

    department = relationship('Department', back_populates='jobs')
