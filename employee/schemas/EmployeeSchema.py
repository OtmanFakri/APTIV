from pydantic import BaseModel

from Department.schemas import DepartmentSchema
from employee.schemas import CitySchema


class EmployeeInfo(BaseModel):
    id: int
    category: str
    department_id: int
    certificate_id: int
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
    manager_id: int
class EmployeeSchema(BaseModel):
    info: EmployeeInfo
    city: CitySchema
    department: DepartmentSchema