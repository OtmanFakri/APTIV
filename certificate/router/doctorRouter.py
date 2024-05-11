from typing import List

from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi_pagination import Page, paginate
from sqlalchemy.orm import Session
from sqlalchemy import or_

from certificate.models.certificate import Certificate
from certificate.models.doctor import Doctor
from certificate.schemas.CertificateSchema import CertificateByDoctorSchema
from certificate.schemas.DoctorSchema import DoctorSchema
from configs.Database import get_db_connection

DoctorRouter = APIRouter(
    prefix="/doctor", tags=["doctor"]
)


@DoctorRouter.get("/")
def get_doctors(db: Session = Depends(get_db_connection))->Page[DoctorSchema]:
    doctors=db.query(Doctor).all()
    return  paginate([DoctorSchema.from_orm(doctor) for doctor in doctors])

@DoctorRouter.get("/{doctor_id}/certifications")
def get_certifications(doctor_id: int,
                       db: Session = Depends(get_db_connection)
                       ) -> Page[CertificateByDoctorSchema]:
    certificates = db.query(Certificate).filter(Certificate.doctor_id == doctor_id).all()
    if not certificates:
        raise HTTPException(status_code=404, detail="No certificates found for the given doctor ID")

    return paginate([CertificateByDoctorSchema.from_orm(certificate) for certificate in certificates])


@DoctorRouter.get('/search_doctors')
def search_doctors(query: str = Query(default=""),db: Session = Depends(get_db_connection)):
    doctors = db.query(Doctor).filter(
        or_(Doctor.name.ilike(f'%{query}%'))
    ).all()
    db.close()

    return [{'id': doctor.id, 'name': doctor.name, 'specialty': doctor.specialty} for doctor in doctors]

@DoctorRouter.get('/search_specialty')
def search_specialty(query: str = Query(default=""),db: Session = Depends(get_db_connection)):
    doctors = db.query(Doctor).filter(
        or_(Doctor.specialty.ilike(f'%{query}%'))
    ).all()
    db.close()

    return [{'id': doctor.id, 'name': doctor.name, 'specialty': doctor.specialty} for doctor in doctors]