from sqlalchemy import Column, Integer, String, ForeignKey,Enum
from sqlalchemy.orm import relationship

from Department.models.Assosation_MedicalExamination import medical_examination_department_association, \
    medical_examination_job_association
from MedicalExamination.models.MedicalExaminationAssociation import association_table
from employee.schemas.EmployeeSchema import CategoryEnum
from configs.BaseModel import EntityMeta



class MedicalExamination(EntityMeta):
    __tablename__ = 'MedicalExaminations'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    seniority = Column(Integer, nullable=True)
    category = Column(Enum(CategoryEnum), nullable=False)
    # Relationships
    departments = relationship(
        "Department",
        secondary=medical_examination_department_association,
        back_populates="medical_examinations",
        lazy="selectin"
    )
    jobs = relationship(
        "Job",
        secondary=medical_examination_job_association,
        back_populates="medical_examinations",
        lazy="selectin"
    )
    employees = relationship("Employee", secondary=association_table, back_populates="consultations")