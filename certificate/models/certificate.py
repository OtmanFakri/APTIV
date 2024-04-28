from sqlalchemy import Column, BigInteger, String, Date, Integer, ForeignKey
from sqlalchemy.orm import relationship
from certificate.models.doctor import Doctor
from configs.BaseModel import EntityMeta


class Certificate(EntityMeta):
    __tablename__ = 'certificates'
    id = Column(BigInteger, primary_key=True , autoincrement=True ,index=True)
    doctor_id = Column(Integer, ForeignKey('Doctors.id'), nullable=False , index=True)
    date = Column(Date, nullable=False , index=True)
    date_start = Column(Date, nullable=False , index=True)
    date_end = Column(Date, nullable=False , index=True)
    date_entry = Column(Date, nullable=False , index=True)
    validation = Column(String(255), nullable=False , index=True)
    date_planned = Column(Date, nullable=True , index=True) ##imta hwa dkhal
    nbr_expected = Column(BigInteger, nullable=False , index=True)
    nbr_days = Column(BigInteger, nullable=False)
    nbr_gap = Column(BigInteger, nullable=False)
    doctor = relationship(Doctor, back_populates='certificates')


    employee_id = Column(Integer, ForeignKey("Employees.id"))
    employee = relationship("Employee", back_populates="certificates")