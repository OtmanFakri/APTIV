from collections import defaultdict
from typing import Optional, List, Union

from fastapi import APIRouter, Depends, Request, HTTPException, UploadFile, File, Body
from fastapi_pagination import Page, paginate
import pdfkit
from starlette import status
from starlette.responses import FileResponse
from starlette.templating import Jinja2Templates
import pandas as pd
from certificate.schemas.CertificateSchema import PostCertificateSchema, GetCertificateSchema
from employee.repo.v2.EmployeeRepo import EmployeeRepo
from employee.schemas.EmployeeSchema import EmployeeInfoRequest, EmployeeInfoResponse, ExportationSchema
from employee.service.EmployeeService import EmployeeService
from helper.exportation_helper import process_data, generate_excel, generate_pdf

EmployeeRouter = APIRouter(
    prefix="/employee", tags=["employee"]
)
templates = Jinja2Templates(directory="templates")


@EmployeeRouter.post("/create")
async def create_employee(
        employee_info: EmployeeInfoRequest = Depends(),
        uploaded_file: UploadFile = File(None),
        employeeService: EmployeeRepo = Depends()

):
    try:
        await employeeService.create_employee(employee_info=employee_info, uploaded_file=uploaded_file)
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
async def update_employee(
        employee_id: int,
        employee_info: EmployeeInfoRequest = Depends(),
        uploaded_file: UploadFile = File(None),
        employeeService: EmployeeRepo = Depends()
):
    try:
        await employeeService.update_employee(employee_id, employee_info, uploaded_file)
        return {"success": True}
    except Exception as e:
        return {"success": False, "error": str(e)}


@EmployeeRouter.post("/search")
async def search_manger(
        search: str,
        employeeService: EmployeeRepo = Depends()
):
    responses = await employeeService.SearchManager(search)
    return [
        {
            "id": response.id,
            "full_name": response.full_name()
        }
        for response in responses
    ]


@EmployeeRouter.post("/filter")
async def filter_employee(employee_id: Optional[int] = None,
                          sex: Optional[str] = None,
                          department_ids: Optional[List[int]] = None,
                          manger_ids: Optional[List[int]] = None,
                          job_ids: Optional[List[int]] = None,
                          category: Optional[List[str]] = None,
                          min_seniority_years: Optional[int] = None,
                          max_seniority_years: Optional[int] = None,
                          start_year: Optional[int] = None,
                          employeeService: EmployeeRepo = Depends()) -> Page[EmployeeInfoResponse]:
    responses = await employeeService.get_employee(
        employee_id=employee_id,
        sex=sex,
        department_ids=department_ids,
        job_ids=job_ids,
        category=category,
        min_seniority_years=min_seniority_years,
        manger_ids=manger_ids,
        max_seniority_years=max_seniority_years,
        start_year=start_year
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
async def create_certificate(
        employee_id: int,
        certificate_info: PostCertificateSchema,
        employeeService: EmployeeRepo = Depends()
):
    try:
        certificate = await employeeService.create_certificate(employee_id, certificate_info)
        return {"success": True, "certificate": certificate}
    except Exception as e:
        return {"success": False, "error": str(e)}


@EmployeeRouter.put("/{employee_id}/certificate/{certificate_id}")
async def update_certificate(
        employee_id: int,
        certificate_id: int,
        update_data: PostCertificateSchema,
        employeeService: EmployeeRepo = Depends()
):
    try:
        certificate = await employeeService.update_certificate(employee_id=employee_id,
                                                               update_data=update_data,
                                                               certificate_id=certificate_id, )
        return {"success": True, "certificate": certificate}
    except Exception as e:
        return {"success": False, "error": str(e)}


@EmployeeRouter.delete("/{employee_id}/certificate")
async def delete_certificate(
        employee_id: int,
        certificate_ids: List[int],
        employeeService: EmployeeRepo = Depends()
):
    try:
        success = await employeeService.delete_certification_by_employee_id(employee_id, certificate_ids)
        return {"success": success}
    except RuntimeError as e:
        # Catch custom runtime errors and return appropriate HTTP responses
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        # Log and return generic error message
        raise HTTPException(status_code=500, detail="An internal server error occurred.")


@EmployeeRouter.get("/{employee_id}/certificate")
async def get_certificate_employee(
        employee_id: int,
        employeeService: EmployeeRepo = Depends()
):
    try:
        fetched_certificate = await employeeService.get_certificates_by_employee(employee_id)
        return fetched_certificate
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


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


@EmployeeRouter.post("/visit/{current_year}")
async def get_visit(
        current_year: int,
        employeeService: EmployeeRepo = Depends()):
    is_null_visits = await employeeService.employee_visits(current_year=current_year)

    return is_null_visits


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
        max_seniority_years: Optional[int] = None,

        employeeService: EmployeeRepo = Depends()
):
    # Get responses from the service
    responses = await employeeService.get_employee(
        employee_id=employee_id,
        sex=sex,
        department_ids=department_ids,
        job_ids=job_ids,
        category=category,
        min_seniority_years=min_seniority_years,
        manger_ids=manger_ids,
        max_seniority_years=max_seniority_years
    )

    # Process data
    processed_data = process_data(responses, columns)

    if exporation.type == "xlsx":
        # Generate Excel file
        excel_path = generate_excel(processed_data, columns)
        # Return the Excel file as a response
        return FileResponse(path=excel_path, filename="hello_world.xlsx",
                            media_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    elif exporation.type == "pdf":
        context = {'processed_data': processed_data}  # Dummy value for "request" key
        # Render the template as HTML string
        template = templates.get_template("testing.html")
        html_content = template.render(request=request, **context)
        # Generate PDF
        pdf_path = generate_pdf(html_content)
        # Return the PDF as a file response
        return FileResponse(path=pdf_path, filename="hello_world.pdf", media_type='application/pdf')
