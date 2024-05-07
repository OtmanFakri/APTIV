from typing import Optional
from datetime import date
from pydantic import BaseModel, Field
from enum import Enum

from Department.schemas.DepartmentSchema import DepartmentSchema
from employee.schemas.CitySchema import CitySchema


class CategoryEnum(str, Enum):
    DH = "DH"
    IH = "IH"
    IS = "IS"


class EmployeeInfoRequest(BaseModel):
    id: Optional[int]
    department_id: int
    job_id: int
    manager_id: Optional[int]
    first_name: str
    last_name: str
    cin: str
    cnss: str
    phone_number: int
    birth_date: str  # This should be converted to Date in the application logic
    Sexe: str
    city_id: int
    date_start: str  # This should be converted to Date in the application logic
    date_hiring: str  # This should be converted to Date in the application logic
    # date_visit: Optional[str] = None  # This should be converted to Date in the application logic
    date_end: Optional[str] = None

    def convert_dates(self):
        # Convert string dates to date objects
        self.birth_date = date.fromisoformat(self.birth_date)
        self.date_start = date.fromisoformat(self.date_start)
        self.date_hiring = date.fromisoformat(self.date_hiring)
        # self.date_visit = date.fromisoformat(self.date_visit)
        if self.date_end:
            self.date_end = date.fromisoformat(self.date_end)

    class Config:
        orm_mode = True
        from_attributes = True


class EmployeeInfoResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    manager_name: Optional[str]
    category: CategoryEnum
    department_name: str
    job_name: str

    class Config:
        orm_mode = True
        from_attributes = True


class EmployeeSchemaRequest(BaseModel):
    info: EmployeeInfoRequest
    city: CitySchema
    department: DepartmentSchema


class EmployeeSchemaResponse(BaseModel):
    info: EmployeeInfoResponse
    city: CitySchema
    department: DepartmentSchema


class ExportType(str, Enum):
    xlsx = "xlsx"
    pdf = "pdf"


class ExportationSchema(BaseModel):
    type: ExportType
