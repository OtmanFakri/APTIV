
from sqlalchemy import Column, BigInteger, String, ForeignKey, Date, Index, Integer
from sqlalchemy.orm import relationship
from configs.BaseModel import EntityMeta


class Employee(EntityMeta):
    __tablename__ = 'Employees'

    id = Column(BigInteger, primary_key=True)
    category = Column(String(255), nullable=False, default='')
    department_id = Column(BigInteger, ForeignKey('Departments.id'), nullable=False)
    first_name = Column(String(255), nullable=False)
    last_name = Column(String(255), nullable=False)
    cin = Column(String(255), nullable=False)
    cnss = Column(String(255), nullable=False)
    phone_number = Column(BigInteger, nullable=False)
    birth_date = Column(Date, nullable=False)
    Sexe = Column(String(255), nullable=False, default='')
    city_id = Column(Integer, ForeignKey('city.id'), nullable=False)
    date_start = Column(Date, nullable=False)
    date_hiring = Column(Date, nullable=False)
    date_visit = Column(Date, nullable=False)
    manager_id = Column(BigInteger, ForeignKey('Employees.id'))
    job_id = Column(BigInteger, ForeignKey('Jobs.id'), nullable=False)


    manager = relationship("Employee", remote_side=[id])
    department = relationship("Department",back_populates="employees")
    job = relationship("Job", back_populates="employees")
    city = relationship("City", back_populates="employees")