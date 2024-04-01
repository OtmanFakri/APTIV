from fastapi import Depends

from employee.models.Employee import Employee
from employee.repo.CityRepo import CityRepo
from employee.repo.EmployeeRepo import EmployeeRepo
from employee.schemas.EmployeeSchema import EmployeeSchemaRequest, EmployeeInfoRequest


class EmployeeService:
    employeeRepo: EmployeeRepo

    def __init__(
        self, employeeRepo: EmployeeRepo = Depends()
    ):
        self.employeeRepo = employeeRepo

    def create(self, employee_info: EmployeeInfoRequest) -> Employee:
        # Create employee using EmployeeRepo
        employee = self.employeeRepo.create(employee_info)
        return employee

    def get(self, employee_id: int,):
        query= self.employeeRepo.get(employee_id)
        employee_data = {
            "id": query.Employee.id,
            "category": query.Employee.category,  # This assumes 'category' is an attribute of Employee
            "department_name": query.DepartmentName,
            "job_name": query.JobName,
            "manager_name": query.ManagerName,
            "first_name": query.Employee.first_name,
            "last_name": query.Employee.last_name,
            "cin": query.Employee.cin,
            "cnss": query.Employee.cnss,
            "phone_number": query.Employee.phone_number,
            "birth_date": query.Employee.birth_date.isoformat(),
            "Sexe": query.Employee.Sexe,
            "city_name": query.CityName,
            "region_name": query.RegionName,
            "date_start": query.Employee.date_start.isoformat(),
            "date_hiring": query.Employee.date_hiring.isoformat(),
            "date_visit": query.Employee.date_visit.isoformat()
        }
        return employee_data