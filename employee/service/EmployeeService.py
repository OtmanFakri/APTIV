from fastapi import Depends

from employee.models.Employee import Employee
from employee.repo.CityRepo import CityRepo
from employee.repo.EmployeeRepo import EmployeeRepo
from employee.schemas.EmployeeSchema import EmployeeInfo


class EmployeeService:
    employeeRepo: EmployeeRepo

    def __init__(
        self, employeeRepo: EmployeeRepo = Depends()
    ):
        self.employeeRepo = employeeRepo

    def create(self, employee_info: EmployeeInfo) -> Employee:
        # Create employee using EmployeeRepo
        employee = self.employeeRepo.create(employee_info)
        return employee

