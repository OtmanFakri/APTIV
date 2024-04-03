from sqlalchemy import Column, BigInteger, String, ForeignKey
from sqlalchemy.orm import relationship

from configs.BaseModel import EntityMeta


class Department(EntityMeta):
    __tablename__ = 'Departments'
    id = Column(BigInteger, primary_key=True,index=True ,autoincrement=True)
    color = Column(String(255), nullable=False)
    name = Column(String(255), nullable=False,index=True)

    jobs = relationship('Job', back_populates='department')
    employees = relationship('Employee', back_populates='department')