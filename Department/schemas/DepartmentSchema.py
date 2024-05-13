from enum import Enum
from typing import List, Optional

from pydantic import BaseModel
from Department.schemas.JobSchema import JobSchema, PostJobSchema


class CategoryEnum(Enum):
    DH = "DH"
    IH = "IH"
    IS = "IS"

class CategoryEnum2(str, Enum):
    DH = "DH"
    IH = "IH"
    IS = "IS"

class DepartmentSchema(BaseModel):
    id: int
    name: str
    jobs: Optional[List[JobSchema]] = []

    class Config:
        orm_mode = True
        from_attributes = True



class PostDepartmentSchema(BaseModel):
    name: str
    class Config:
        orm_mode = True
        from_attributes = True


class DepartmentBase(BaseModel):
    color: str
    name: str

class DepartmentCreate(DepartmentBase):
    color: str
    name: str
    category: CategoryEnum2
    jobs: List[PostJobSchema]

class DepartmentUpdate(DepartmentCreate):
    pass


class JobItemData(BaseModel):
    id: int
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