from datetime import date
from typing import List

from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi.encoders import jsonable_encoder
from fastapi_pagination import paginate, Page
from sqlalchemy.orm import Session, joinedload
from starlette.responses import JSONResponse

from certificate.models.certificate import Certificate
from certificate.schemas.CertificateSchema import GetCertificateSchema, FilterCertificatesRequest, \
    DepartmentCertificates, MonthCertificates, CategoryCertificates, EmployeeVisit
from certificate.service.Certificate_Service import CertificateService
from configs.Database import get_db_connection
from helper.int_to_month import int_to_month

CertificateRouter = APIRouter(
    prefix="/certificate", tags=["certificate"]
)


@CertificateRouter.get("/")
def get_certificates(db: Session = Depends(get_db_connection)) -> Page[GetCertificateSchema]:
    certificates = db.query(Certificate).options(
        joinedload(Certificate.doctor),
        joinedload(Certificate.employee),
    ).all()
    if not certificates:
        raise HTTPException(status_code=404, detail="No certificates found")
    # Transform the data to include 'doctor_name'
    results = []
    for cert in certificates:
        cert_data = {
            "id": cert.id,
            "doctor_name": cert.doctor.name,  # Assuming the doctor's name is stored in the 'name' attribute
            "nameEmployee": cert.employee.full_name(),
            "department": cert.employee.department.name,
            "job": cert.employee.job.name,  # Assuming the job's name is stored in the 'name' attribute
            "date": cert.date,
            "date_start": cert.date_start,
            "date_end": cert.date_end,
            "date_entry": cert.date_entry,
            "validation": cert.validation,
            "date_planned": cert.date_planned,
            "nbr_expected": cert.nbr_expected,
            "nbr_days": cert.nbr_days,
            "nbr_gap": cert.nbr_gap
        }
        results.append(cert_data)
    return paginate(results)


@CertificateRouter.post("/filter")
async def filter_certificates(
        filter_params: FilterCertificatesRequest,
        service: CertificateService = Depends(CertificateService)
) -> Page[GetCertificateSchema]:
    certificates = await service.get_filtered_certificates(filter_params.doctor_id,
                                                           filter_params.manager_id,
                                                           filter_params.from_date,
                                                           filter_params.to_date,
                                                           filter_params.nbr_days,
                                                           filter_params.validation)

    return paginate(certificates)


@CertificateRouter.get("/by_department")
async def certificates_per_department(
        department_id: int = None,
        year: int = None,
        month: int = None,
        service: CertificateService = Depends(CertificateService)
) -> List[DepartmentCertificates]:
    try:
        data = await service.get_department_data(department_id, year, month)
        return data
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@CertificateRouter.get("/by_month")
async def certificates_per_month(
        year: int = None,
        month: int = None,
        service: CertificateService = Depends(CertificateService)
) -> List[MonthCertificates]:
    try:
        data = await service.get_department_month(year, month)
        formatted_data = [
            MonthCertificates(
                month=str(item.month),
                year=item.year,
                certificates_nbr=item.certificates_nbr,
                illness_days_nbr=item.illness_days_nbr,
                headcount=item.headcount,  # Ensure headcount is correctly retrieved and calculated
                certificate_rate=item.certificate_rate,
                average_illness_days=item.average_illness_days
            )
            for item in data
        ]
        return formatted_data
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@CertificateRouter.get("/by_category")
async def certificates_per_category(
        category: str = None,
        year: int = None,
        month: int = None,
        service: CertificateService = Depends(CertificateService)
) -> List[CategoryCertificates]:
    try:
        data = await service.get_certificates_by_category(category, year, month)
        return data
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@CertificateRouter.get("/by_validation")
async def by_validation(
        year: int = None,
        validation_status: str = None,
        service: CertificateService = Depends(CertificateService)):
    results = await service.get_certificates_nb_validation(year, validation_status)
    return [
        {
            "month": int_to_month(int(item[0])),
            "count": item[1],
        }
        for item in results
    ]


@CertificateRouter.get("/average-days/{year}")
async def get_average_days_per_month(
        year: int,
        service: CertificateService = Depends(CertificateService)):
    results = await service.get_average_days_per_month(year=year)
    print("xxx", results)
    return [
        {
            "month": result[0],
            "number_of_days": result[1],
            "total_days": result[2],
            "average_days": result[3]

        }
        for result in results
    ]


@CertificateRouter.get("/validation-itt/{year}")
async def get_validation_itt_per_month(
        year: int,
        service: CertificateService = Depends(CertificateService)):
    results = await service.get_certificates_by_validation_itt(year=year)
    return results