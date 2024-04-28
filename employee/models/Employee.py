from datetime import date

from sqlalchemy import Column, BigInteger, String, ForeignKey, Date, Index, Integer, func, case
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import relationship

from MedicalExamination.models.MedicalExaminationAssociation import association_table
from configs.BaseModel import EntityMeta


class Employee(EntityMeta):
    __tablename__ = 'Employees'

    id = Column(BigInteger, primary_key=True,index=True)
    department_id = Column(BigInteger, ForeignKey('Departments.id'), nullable=False,index=True)
    first_name = Column(String(255), nullable=False)

    last_name = Column(String(255), nullable=False)
    cin = Column(String(255), nullable=False)
    cnss = Column(String(255), nullable=False)
    phone_number = Column(BigInteger, nullable=False)
    birth_date = Column(Date, nullable=False)
    Sexe = Column(String(255), nullable=False, default='',index=True)
    city_id = Column(Integer, ForeignKey('city.id'), nullable=False)
    date_start = Column(Date, nullable=False,index=True)
    date_hiring = Column(Date, nullable=False,index=True)
    #date_visit = Column(Date, nullable=True,index=True)
    date_end = Column(Date, nullable=True,index=True)
    manager_id = Column(BigInteger, ForeignKey('Employees.id', ondelete='SET NULL'),index=True)
    job_id = Column(BigInteger, ForeignKey('Jobs.id', ondelete='SET NULL'), nullable=True,index=True)
    #certificate_id = Column(BigInteger, ForeignKey('certificates.id'), nullable=True ,index=True)

    manager = relationship("Employee", remote_side=[id],)
    department = relationship("Department",back_populates="employees")
    job = relationship("Job", back_populates="employees")
    city = relationship("City", back_populates="employees")
    certificates = relationship("Certificate", back_populates="employee")
    #consultations = relationship("ConsultationAssociation", back_populates="employee")
    consultations = relationship("MedicalExamination", secondary=association_table, back_populates="employees")

    def full_name(self) -> str:
        """
        Return the full name of the employee by combining first and last name.
        """
        return f"{self.first_name} {self.last_name}"

    def full_name(self) -> str:
        """
        Return the full name of the employee by combining first and last name.
        """
        return f"{self.first_name} {self.last_name}"

    def calculate_seniority(self) -> int:
        if self.date_start:
            today = date.today()
            # Calculate the full years of service
            seniority = (today.year - self.date_start.year) - (
                    (today.month, today.day) < (self.date_start.month, self.date_start.day))
            return seniority
        return 0
