from datetime import date

from pydantic import BaseModel, Field
from typing import List, Optional, Any

from Department.schemas.DepartmentSchema import DepartmentSchema
from Department.schemas.JobSchema import JobSchema
from employee.schemas.EmployeeSchema import CategoryEnum


class PostMedicalExaminationSchema(BaseModel):
    name: str
    seniority: int
    category: CategoryEnum
    department_ids: Optional[List[int]]
    job_ids: Optional[List[int]]
    date_start: date
    date_end : date


class responseMedicalExaminationSchema(BaseModel):
    name :str
    seniority: int
    category: CategoryEnum
    departments: Optional[List[DepartmentSchema]]
    jobs: Optional[List[JobSchema]]
    total_participating: int
    total_non_participating: int

