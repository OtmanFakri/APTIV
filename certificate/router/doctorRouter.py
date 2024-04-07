from typing import List

from fastapi import APIRouter, Depends, HTTPException
from fastapi_pagination import Page, paginate
from sqlalchemy.orm import Session

from certificate.models.certificate import Certificate
from certificate.schemas.CertificateSchema import CertificateSchema, CertificateByDoctorSchema
from configs.Database import get_db_connection

DoctorRouter = APIRouter(
    prefix="/doctor", tags=["doctor"]
)


@DoctorRouter.get("/")
def get_doctors(db: Session = Depends(get_db_connection)):
    return {"message": "Hello World"}

@DoctorRouter.get("/{doctor_id}/certifications")
def get_certifications(doctor_id: int,
                       db: Session = Depends(get_db_connection)
                       ) -> Page[CertificateByDoctorSchema]:
    print('2certificates')
    certificates = db.query(Certificate).filter(Certificate.doctor_id == doctor_id).all()
    print('certificates')
    if not certificates:
        raise HTTPException(status_code=404, detail="No certificates found for the given doctor ID")

    return paginate([CertificateByDoctorSchema.from_orm(certificate) for certificate in certificates])
