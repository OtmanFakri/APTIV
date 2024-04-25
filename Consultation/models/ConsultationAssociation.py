from sqlalchemy import Column, Integer, Date, ForeignKey, Boolean, Table
from sqlalchemy.orm import relationship
from configs.BaseModel import EntityMeta


association_table = Table('employee_consultation_association', EntityMeta.metadata,
    Column('employee_id', Integer, ForeignKey('Employees.id'),index=True),
    Column('consultation_id', Integer, ForeignKey('consultations.id'),index=True),
    Column('is_do', Boolean),
    Column('date_do', Date, nullable=True),
)


