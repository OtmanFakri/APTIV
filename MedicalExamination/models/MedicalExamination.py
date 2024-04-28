from sqlalchemy import Column, Integer, String, ForeignKey,Enum
from sqlalchemy.orm import relationship

from MedicalExamination.models.MedicalExaminationAssociation import association_table
from employee.schemas.EmployeeSchema import CategoryEnum
from configs.BaseModel import EntityMeta


class MedicalExamination(EntityMeta):
    __tablename__ = 'MedicalExaminations'
    id = Column(Integer, primary_key=True)
    name = Column(String,nullable=False)
    seniority = Column(Integer,nullable=True)
    departments_id = Column(Integer, ForeignKey('Departments.id'),index=True,nullable=False)
    department = relationship("Department")
    #category_id = Column(Integer, ForeignKey('departments.id'),index=True,nullable=False)
    job_id = Column(Integer, ForeignKey('Jobs.id'),index=True,nullable=False)
    job = relationship("Job")
    category = Column(Enum(CategoryEnum), nullable=False)  # Added enum category
    # Make sure that this relationship is correctly reflecting the association table
    employees = relationship("Employee", secondary=association_table, back_populates="consultations")