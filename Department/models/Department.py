from sqlalchemy import Column, BigInteger, String, ForeignKey, Enum
from sqlalchemy.orm import relationship

from Department.models.Assosation_MedicalExamination import medical_examination_department_association
from configs.BaseModel import EntityMeta
from employee.schemas.EmployeeSchema import CategoryEnum


class Department(EntityMeta):
    __tablename__ = 'Departments'
    id = Column(BigInteger, primary_key=True,index=True ,autoincrement=True)
    color = Column(String(255), nullable=False)
    name = Column(String(255), nullable=False,index=True)
    category = Column(Enum(CategoryEnum), nullable=False,index=True)

    jobs = relationship('Job', back_populates='department')
    employees = relationship('Employee', back_populates='department')
    medical_examinations = relationship(
        "MedicalExamination",
        secondary=medical_examination_department_association,
        back_populates="departments",
        lazy="selectin"
    )