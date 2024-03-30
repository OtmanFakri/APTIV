from pydantic import BaseModel

from Department.schemas.JobSchema import JobSchema


class DepartmentSchema(BaseModel):
    name: str
    job: JobSchema

class PostDepartmentSchema(BaseModel):
    name: str
