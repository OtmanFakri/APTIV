from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, Table, Date
from sqlalchemy.orm import relationship

from configs.BaseModel import EntityMeta

association_table = Table('employee_consultation_association', EntityMeta.metadata,
                          Column('employee_id', Integer, ForeignKey('Employees.id'), index=True, nullable=False),
                          Column('consultation_id', Integer, ForeignKey('consultations.id'), index=True,
                                 nullable=False),
                          Column('date', Date, nullable=True, index=True),
                          )
