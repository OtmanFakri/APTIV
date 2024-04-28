from enum import Enum
from typing import List, Optional

from pydantic import BaseModel

from Department.schemas.JobSchema import JobSchema

class CategoryEnum(Enum):
    DH = "DH"
    IH = "IH"
    IS = "IS"

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


class JobItemData(BaseModel):
    job: str
    nbEmployees: int

class DepartmentItemData(BaseModel):
    key: int
    department: str
    nbEmployees: int
    expand: bool
    jobs: List[JobItemData]

class CategoryItemData(BaseModel):
    key: int
    category: CategoryEnum
    nbEmployees: int
    expand: bool
    departments: List[DepartmentItemData]