from typing import Optional

from fastapi import Depends

from certificate.schemas.CertificateSchema import  PostCertificateSchema
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


    def Filter_Employee(self, year: Optional[int] = None,
                        category: Optional[str] = None,
                        department_name: Optional[str] = None,
                        manager_id: Optional[int] = None):
        query = self.employeeRepo.Filter_Employee(year, category, department_name, manager_id)


        return query

    def create_certificate(self, employee_id: int, certificate_info: PostCertificateSchema):
        self.employeeRepo.create_certificate(employee_id, certificate_info)
        return {"success": True}

    def get_certificate_employee(self, employee_id: int):
        query = self.employeeRepo.get_certificate_employee(employee_id)
        return query

    def get_certificates_employee(self, employee_id: int):
        query = self.employeeRepo.get_certificates_employee(employee_id)
        return query