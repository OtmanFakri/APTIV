from typing import Optional, List

from fastapi import APIRouter, Depends,Request
from fastapi_pagination import Page, paginate
import pdfkit
from starlette import status
from starlette.responses import FileResponse
from starlette.templating import Jinja2Templates

from certificate.schemas.CertificateSchema import PostCertificateSchema, GetCertificateSchema
from employee.repo.v2.EmployeeRepo import EmployeeRepo
from employee.schemas.EmployeeSchema import EmployeeInfoRequest, EmployeeInfoResponse, ExportationSchema
from employee.service.EmployeeService import EmployeeService
from helper.exportation_helper import process_data

EmployeeRouter = APIRouter(
    prefix="/employee", tags=["employee"]
)
templates = Jinja2Templates(directory="templates")


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
async def filter_employee(employee_id: Optional[int] = None,
                          sex: Optional[str] = None,
                          department_ids: Optional[List[int]] = None,
                          manger_ids: Optional[List[int]] = None,
                          job_ids: Optional[List[int]] = None,
                          category: Optional[str] = None,
                          min_seniority_years: Optional[int] = None,
                          employeeService: EmployeeRepo = Depends()) -> Page[EmployeeInfoResponse]:
    responses = await employeeService.get_employee(
        employee_id=employee_id,
        sex=sex,
        department_ids=department_ids,
        job_ids=job_ids,
        category=category,
        min_seniority_years=min_seniority_years,
        manger_ids=manger_ids
    )
    return paginate([
        EmployeeInfoResponse(
            id=response.id,
            first_name=response.first_name,
            last_name=response.last_name,
            manager_name=str(response.manager_id),
            category=response.department.category,
            department_name=response.department.name,
            job_name=response.job.name
        )
        for response in responses
    ])


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


@EmployeeRouter.post("/exporation")
async def exportation(
        request: Request,
        exporation: ExportationSchema,
        columns: Optional[List[str]] = None,
        employee_id: Optional[int] = None,
        sex: Optional[str] = None,
        department_ids: Optional[List[int]] = None,
        manger_ids: Optional[List[int]] = None,
        job_ids: Optional[List[int]] = None,
        category: Optional[str] = None,
        min_seniority_years: Optional[int] = None,
        employeeService: EmployeeRepo = Depends()
):
    responses = await employeeService.get_employee(
        employee_id=employee_id,
        sex=sex,
        department_ids=department_ids,
        job_ids=job_ids,
        category=category,
        min_seniority_years=min_seniority_years,
        manger_ids=manger_ids
    )
    processed_data = process_data(responses, columns)

    if exporation.type == "xlsx":
        return [
            {
                'data': data
            }
            for data in processed_data
        ]
    elif exporation.type == "pdf":
        context = {'processed_data': processed_data}  # Dummy value for "request" key
        # Render the template as HTML string
        template = templates.get_template("testing.html")
        html_content = template.render(request=request, **context)

        # Path to save the PDF
        pdf_path = "hello_world.pdf"

        # Convert HTML to PDF
        pdfkit.from_string(html_content, pdf_path)

        # Return the PDF as a file response
        return FileResponse(path=pdf_path, filename="hello_world.pdf", media_type='application/pdf')