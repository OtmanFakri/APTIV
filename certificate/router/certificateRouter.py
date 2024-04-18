from typing import List

from fastapi import APIRouter, Depends, HTTPException
from fastapi_pagination import paginate, Page
from sqlalchemy.orm import Session, joinedload

from certificate.models.certificate import Certificate
from certificate.schemas.CertificateSchema import GetCertificateSchema
from configs.Database import get_db_connection

CertificateRouter = APIRouter(
    prefix="/certificate", tags=["certificate"]
)

@CertificateRouter.get("/")
def get_certificates(db: Session = Depends(get_db_connection))-> Page[GetCertificateSchema]:
    certificates = db.query(Certificate).options(joinedload(Certificate.doctor)).all()
    if not certificates:
        raise HTTPException(status_code=404, detail="No certificates found")
    # Transform the data to include 'doctor_name'
    results = []
    for cert in certificates:
        cert_data = {
            "id": cert.id,
            "doctor_name": cert.doctor.name,  # Assuming the doctor's name is stored in the 'name' attribute
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