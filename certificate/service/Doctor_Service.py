

import calendar
from datetime import date

from fastapi import Depends

from certificate.repo.Certificate_Repository import CertificateRepository
from certificate.repo.Doctor_Repository import DoctorRepository


class DoctorService:
    doctorRepository: DoctorRepository

    def __init__(
            self, doctorRepository: DoctorRepository = Depends()
    ):
        self.doctorRepository = doctorRepository

    async def get_or_create_doctor(self, name: str, specialty: str):
        return await self.doctorRepository.get_or_create(name, specialty)