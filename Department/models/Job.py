from sqlalchemy import Column, BigInteger, String, ForeignKey
from sqlalchemy.orm import relationship

from Department.models.Association_Consultation import consultation_job
from configs.BaseModel import EntityMeta


class Job(EntityMeta):
    __tablename__ = 'Jobs'

    id = Column(BigInteger, primary_key=True, index=True,autoincrement=True)
    name = Column(String(255), nullable=False, index=True)
    department_id = Column(BigInteger, ForeignKey('Departments.id'), index=True)

    department = relationship('Department', back_populates='jobs')
    employees = relationship('Employee', back_populates='job',)
    consultations = relationship('Consultation', secondary=consultation_job, back_populates='jobs')
