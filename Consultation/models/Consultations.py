from sqlalchemy import Column, Integer, String, ForeignKey, Enum
from sqlalchemy.orm import relationship

from Consultation.models.ConsultationAssociation import association_table
from Department.models.Association_Consultation import consultation_department, consultation_job
from Department.schemas.DepartmentSchema import CategoryEnum
from configs.BaseModel import EntityMeta


class Consultation(EntityMeta):
    __tablename__ = 'consultations'
    id = Column(Integer, primary_key=True,index=True)
    name = Column(String)
    # Make sure that this relationship is correctly reflecting the association table
    #employees = relationship("ConsultationAssociation", back_populates="consultation")
    employees = relationship("Employee", secondary=association_table, back_populates="consultations")
    categories = Column(Enum(CategoryEnum))  # Storing category as enum
    seniority = Column(Integer)  # Assuming seniority is a string

    # Relationships
    departments = relationship('Department', secondary=consultation_department, back_populates='consultations')
    jobs = relationship('Job', secondary=consultation_job, back_populates='consultations')

