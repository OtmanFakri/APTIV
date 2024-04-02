from fastapi import Depends

from employee.models.Employee import Employee
from employee.repo.CityRepo import CityRepo
from employee.repo.EmployeeRepo import EmployeeRepo
from employee.schemas.EmployeeSchema import EmployeeSchemaRequest, EmployeeInfoRequest, EmployeeInfoResponse, \
    CategoryEnum


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

        return query

    def delete(self, employee_id: int):
        self.employeeRepo.delete(employee_id)
        return {"success": True}

    def update(self, employee_id: int, employee_info: EmployeeInfoRequest):
        employee_info.convert_dates()  # Convert string dates to date objects

        employee = Employee(**employee_info.dict())
        employee.id = employee_id

        updated_employee = self.employeeRepo.update(employee)

        return {"success": True, "data": updated_employee}

    def list_BY_Hiring_Date(self,datehire:int):
        query = self.employeeRepo.list_BY_Hiring(datehire)
        formatted_results = [
            EmployeeInfoResponse(
                id=result[0],
                first_name=result[1],
                last_name=result[2],
                manager_name=(result[3] or '') + ' ' + (result[4] or ''),
                category=CategoryEnum(result[5]),
                department_name=result[6],
            ).dict()
            for result in query
        ]
        return formatted_results