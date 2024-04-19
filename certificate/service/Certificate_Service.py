from fastapi import Depends

from certificate.repo.Certificate_Repository import CertificateRepository


class CertificateService:
    certificationRepository: CertificateRepository

    def __init__(
            self, certificationRepository: CertificateRepository = Depends()
    ) -> None:
        self.certificationRepository = certificationRepository

    def get_filtered_certificates(self, doctor_id: int = None,
                                  manager_id: int = None,
                                  from_date: str = None,
                                  to_date: str = None,
                                  nbr_days: int = None,
                                  validation: str = None
                                  ):
        certificates = self.certificationRepository.filter_certificates(doctor_id,
                                                                        manager_id,
                                                                        from_date,
                                                                        to_date,
                                                                        nbr_days,
                                                                        validation)
        return [
            {
                "id": cert.id,
                "doctor_name": cert.doctor.name,
                "nameEmployee": cert.employee.full_name(),
                "department": cert.employee.department.name,
                "job": cert.employee.job.name,
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
            for cert in certificates
        ]
