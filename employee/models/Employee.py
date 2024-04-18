
from sqlalchemy import Column, BigInteger, String, ForeignKey, Date, Index, Integer
from sqlalchemy.orm import relationship
from configs.BaseModel import EntityMeta


class Employee(EntityMeta):
    __tablename__ = 'Employees'

    id = Column(BigInteger, primary_key=True,index=True)
    category = Column(String(255), nullable=False, default='',index=True)
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
    date_visit = Column(Date, nullable=True,index=True)
    manager_id = Column(BigInteger, ForeignKey('Employees.id', ondelete='SET NULL'),index=True)
    job_id = Column(BigInteger, ForeignKey('Jobs.id', ondelete='SET NULL'), nullable=True,index=True)
    #certificate_id = Column(BigInteger, ForeignKey('certificates.id'), nullable=True ,index=True)

    manager = relationship("Employee", remote_side=[id],)
    department = relationship("Department",back_populates="employees")
    job = relationship("Job", back_populates="employees")
    city = relationship("City", back_populates="employees")
    certificates = relationship("Certificate", back_populates="employee")
