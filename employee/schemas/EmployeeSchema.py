from enum import Enum
from datetime import date
from typing import Optional

from pydantic import BaseModel
from Department.schemas.DepartmentSchema import DepartmentSchema
from employee.schemas.CitySchema import CitySchema


# Define the category enum
class CategoryEnum(str, Enum):
    DH = "DH"
    IH = "IH"
    IS = "IS"

class EmployeeInfo(BaseModel):
    id: int
    category: CategoryEnum
    department_id: int
    #certificate_id: int
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
    date_visit: str  # This should be converted to Date in the application logic
    manager_id: Optional[int]
    def convert_dates(self):
        # Convert string dates to date objects
        self.birth_date = date.fromisoformat(self.birth_date)
        self.date_start = date.fromisoformat(self.date_start)
        self.date_hiring = date.fromisoformat(self.date_hiring)
        self.date_visit = date.fromisoformat(self.date_visit)


class EmployeeSchema(BaseModel):
    info: EmployeeInfo
    city: CitySchema
    department: DepartmentSchema