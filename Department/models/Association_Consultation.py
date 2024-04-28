from sqlalchemy import Column, Integer, String, ForeignKey, Table
from sqlalchemy.orm import relationship, declarative_base
from sqlalchemy.ext.declarative import declarative_base

from configs.BaseModel import EntityMeta

consultation_department = Table(
    'consultation_department', EntityMeta.metadata,
    Column('consultation_id', Integer, ForeignKey('consultations.id')),
    Column('department_id', Integer, ForeignKey('Departments.id'))
)

consultation_job = Table(
    'consultation_job', EntityMeta.metadata,
    Column('consultation_id', Integer, ForeignKey('consultations.id')),
    Column('job_id', Integer, ForeignKey('Jobs.id'))
)