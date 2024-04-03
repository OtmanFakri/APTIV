from typing import List, Optional

from pydantic import BaseModel

from Department.schemas.JobSchema import JobSchema


class DepartmentSchema(BaseModel):
    id: int
    name: str
    jobs: Optional[List[JobSchema]] = None

    class Config:
        orm_mode = True


class PostDepartmentSchema(BaseModel):
    name: str
    class Config:
        orm_mode = True
        from_attributes = True


class DepartmentBase(BaseModel):
    color: str
    name: str

class DepartmentCreate(DepartmentBase):
    pass

class DepartmentUpdate(DepartmentBase):
    pass