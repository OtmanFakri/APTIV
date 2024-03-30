from pydantic import BaseModel

from Department.schemas.JobSchema import JobSchema


class Department(BaseModel):
    name: str
    job: JobSchema
