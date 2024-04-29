
from sqlalchemy import Table, Column, Integer, ForeignKey, String, Enum, BigInteger
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

from configs.BaseModel import EntityMeta

# Association table for the many-to-many relationship between MedicalExaminations and Departments
medical_examination_department_association = Table(
    'medical_examination_department', EntityMeta.metadata,
    Column('medical_examination_id', Integer, ForeignKey('MedicalExaminations.id')),
    Column('department_id', BigInteger, ForeignKey('Departments.id'))
)

# Association table for the many-to-many relationship between MedicalExaminations and Jobs
medical_examination_job_association = Table(
    'medical_examination_job', EntityMeta.metadata,
    Column('medical_examination_id', Integer, ForeignKey('MedicalExaminations.id')),
    Column('job_id', BigInteger, ForeignKey('Jobs.id'))
)
