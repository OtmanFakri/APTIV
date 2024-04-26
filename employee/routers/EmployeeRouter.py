from random import randint, choice
from typing import List

from faker.generator import random
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends
from fastapi_pagination import Page, paginate
from starlette import status
from fastapi import BackgroundTasks
from typing import Optional

from certificate.schemas.CertificateSchema import PostCertificateSchema, GetCertificateSchema
from employee.SeederEmployee import fake, generate_unique_id, get_random_manager_id
from employee.models.City import City
from employee.schemas.EmployeeSchema import EmployeeInfoRequest, EmployeeInfoResponse, CategoryEnum
from employee.service.EmployeeService import EmployeeService

EmployeeRouter = APIRouter(
    prefix="/employee", tags=["employee"]
)


@EmployeeRouter.post("/create",
                     status_code=status.HTTP_200_OK)
def create_employee(
        employee_info: EmployeeInfoRequest,
        employeeService: EmployeeService = Depends()
):
    try:
        employeeService.create(employee_info)
        return {"success": True}
    except Exception as e:
        return {"success": False, "error": str(e)}


@EmployeeRouter.get("/{employee_id}")
def get_employee(
        employee_id: int,
        employeeService: EmployeeService = Depends()
):
    try:
        fetched_employee = employeeService.get(employee_id)

        if fetched_employee:
            # Convert fetched_employee dictionary to EmployeeInfoResponse
            # employee_response = EmployeeInfoResponse(**fetched_employee)

            #
            return fetched_employee
        else:
            return {"error": "Employee not found"}

    except Exception as e:
        # Handle exceptions as per your application's error handling strategy
        return {"error": str(e)}


@EmployeeRouter.delete("/{employee_id}")
def delete_employee(
        employee_id: int,
        employeeService: EmployeeService = Depends()
):
    try:
        employeeService.delete(employee_id)
        return {"success": True}
    except Exception as e:
        return {"success": False, "error": str(e)}


@EmployeeRouter.put("/{employee_id}")
def update_employee(
        employee_id: int,
        employee_info: EmployeeInfoRequest,
        employeeService: EmployeeService = Depends()
):
    try:
        employeeService.update(employee_id, employee_info)
        return {"success": True}
    except Exception as e:
        return {"success": False, "error": str(e)}


@EmployeeRouter.post("/filter")
def Filter_Employee(year: int,
                    category: Optional[List[str]] = None,
                    department_ids: Optional[List[int]] = None,
                    manager_ids: Optional[List[int]] = None,
                    employee_ids: Optional[List[int]] = None,
                    is_visited: Optional[bool] = None,
                    employeeService: EmployeeService = Depends()) -> Page[EmployeeInfoResponse]:
    return paginate(
        employeeService.Filter_Employee(year, category, department_ids, manager_ids, employee_ids, is_visited))


@EmployeeRouter.post("/{employee_id}/certificate")
def create_certificate(
        employee_id: int,
        certificate_info: PostCertificateSchema,
        employeeService: EmployeeService = Depends()
):
    try:
        employeeService.create_certificate(employee_id, certificate_info)
        return {"success": True}
    except Exception as e:
        return {"success": False, "error": str(e)}


@EmployeeRouter.get("/{employee_id}/certificate")
def get_certificate_employee(
        employee_id: int,
        employeeService: EmployeeService = Depends()
):
    try:
        fetched_certificate = employeeService.get_certificate_employee(employee_id)
        return fetched_certificate
    except Exception as e:
        return {"success": False, "error": str(e)}


@EmployeeRouter.get("/{employee_id}/certificates")
def get_certificates_employee(
        employee_id: int,
        employeeService: EmployeeService = Depends()
) -> Page[GetCertificateSchema]:
    try:
        fetched_certificate = employeeService.get_certificates_employee(employee_id)
        return paginate([GetCertificateSchema(
            id=certificate.id,
            doctor_name=certificate.doctor.name,
            date=certificate.date,
            date_start=certificate.date_start,
            date_end=certificate.date_end,
            date_entry=certificate.date_entry,
            validation=certificate.validation,
            date_planned=certificate.date_planned,
            nbr_expected=certificate.nbr_expected,
            nbr_days=certificate.nbr_days,
            nbr_gap=certificate.nbr_gap,
        ) for certificate in fetched_certificate])
    except Exception as e:
        return {"success": False, "error": str(e)}




def generate_unique_id():
    return random.randint(1000, 9999)


def seed_employees(employee_service: EmployeeService):
    for _ in range(1000):  # Generating 1000 fake employees
        employee_data = EmployeeInfoRequest(
            id=generate_unique_id(),
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            department_id=fake.random_int(min=1, max=10),
            job_id=fake.random_int(min=1, max=5),
            manager_id=None,
            cin=fake.ssn(),  # Assuming this generates a valid format
            cnss=fake.ssn(),  # Assuming this generates a valid format
            phone_number=fake.random_number(digits=10),
            birth_date=str(fake.date_of_birth()),  # Assuming conversion handled in `convert_dates`
            Sexe=fake.random_element(elements=("Male", "Female")),
            city_id=fake.random_int(min=1, max=20),
            date_start=str(fake.date_this_decade()),  # Assuming conversion handled in `convert_dates`
            date_hiring=str(fake.date_this_decade()),  # Assuming conversion handled in `convert_dates`
            date_end=str(fake.date_this_decade()) if fake.boolean(chance_of_getting_true=25) else None
        )
        try:
            employee_service.create(employee_data)
        except Exception as e:
            print(f"Failed to create employee: {str(e)}")  # Logging the error

@EmployeeRouter.post("/seed_employees", status_code=status.HTTP_201_CREATED)
def create_bulk_employees(
        background_tasks: BackgroundTasks,
        employee_service: EmployeeService = Depends(),
        ):
    background_tasks.add_task(seed_employees, employee_service)
    return {"message": "Initiated seeding of 1000 employees"}