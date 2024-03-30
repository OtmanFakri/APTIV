from typing import List

from pydantic import BaseModel

from Department.schemas.JobSchema import JobSchema


class DepartmentSchema(BaseModel):
    name: str
    jobs: List[JobSchema]

class PostDepartmentSchema(BaseModel):
    name: str
