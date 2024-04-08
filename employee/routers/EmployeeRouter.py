from typing import Optional

from fastapi import APIRouter, Depends
from fastapi_pagination import Page, paginate
from starlette import status

from certificate.schemas.CertificateSchema import PostCertificateSchema, GetCertificateSchema
from employee.schemas.EmployeeSchema import EmployeeInfoRequest, EmployeeInfoResponse
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
            #employee_response = EmployeeInfoResponse(**fetched_employee)

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
                    category: Optional[str] = None,
                    department_name: Optional[str] = None,
                    manager_id: Optional[int] = None,
                    employeeService: EmployeeService = Depends()) -> Page[EmployeeInfoResponse] :
    return paginate(employeeService.Filter_Employee(year, category, department_name, manager_id))


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
        return paginate( [GetCertificateSchema(
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