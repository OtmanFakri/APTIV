from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, Table
from sqlalchemy.orm import relationship

from configs.BaseModel import EntityMeta


association_table = Table('employee_consultation_association', EntityMeta.metadata,
    Column('employee_id', Integer, ForeignKey('Employees.id')),
    Column('consultation_id', Integer, ForeignKey('consultations.id'))
)


