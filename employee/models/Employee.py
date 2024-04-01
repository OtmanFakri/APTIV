
from sqlalchemy import Column, BigInteger, String, ForeignKey, Date, Index
from sqlalchemy.orm import relationship
from configs.BaseModel import EntityMeta


class Employee(EntityMeta):
    __tablename__ = 'Employees'
    id = Column(BigInteger, primary_key=True,index=True)
    category = Column(String(255), nullable=False,index=True)
    department_id = Column(BigInteger, ForeignKey('Departments.id'), nullable=False,index=True)
    #certificate_id = Column(BigInteger, ForeignKey('certificates.id'), nullable=False)
    first_name = Column(String(255), nullable=False,index=True)
    last_name = Column(String(255), nullable=False,index=True)
    cin = Column(String(255), nullable=False)
    cnss = Column(String(255), nullable=False)
    phone_number = Column(BigInteger, nullable=False)
    birth_date = Column(Date, nullable=False)
    Sexe = Column(String(255), nullable=False,index=True)
    city_id = Column(BigInteger, ForeignKey('city.id'), nullable=False,index=True)
    date_start = Column(Date, nullable=False,index=True)
    date_hiring = Column(Date, nullable=False,index=True)
    date_visit = Column(Date, nullable=False,index=True)
    manager_id = Column(BigInteger, ForeignKey('Employees.id'), nullable=True,index=True)
    job_id = Column(BigInteger, ForeignKey('Jobs.id'),index=True)

    manager = relationship('Employee', remote_side=[id])
    city = relationship('City')
    department = relationship('Department')
    job = relationship('Job')

# Define indexes
