from sqlalchemy import Column, Integer, String, ForeignKey, Enum, Date
from sqlalchemy.orm import relationship

from Department.models.Assosation_MedicalExamination import medical_examination_department_association, \
    medical_examination_job_association
from MedicalExamination.models.MedicalExaminationAssociation import association_table
from employee.schemas.EmployeeSchema import CategoryEnum
from configs.BaseModel import EntityMeta
from sqlalchemy.dialects.postgresql import ARRAY


class MedicalExamination(EntityMeta):
    __tablename__ = 'MedicalExaminations'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    seniority = Column(Integer, nullable=True)
    category = Column(ARRAY(Enum(CategoryEnum)), nullable=False)
    date_start= Column(Date, nullable=False,index=True)
    date_end= Column(Date, nullable=True,index=True)
    # Relationships
    departments = relationship(
        "Department",
        secondary=medical_examination_department_association,
        back_populates="medical_examinations",
        lazy="selectin",

    )
    jobs = relationship(
        "Job",
        secondary=medical_examination_job_association,
        back_populates="medical_examinations",
        lazy="selectin"
    )
    employees = relationship("Employee", secondary=association_table, back_populates="consultations")