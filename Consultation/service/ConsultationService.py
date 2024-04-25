from fastapi import Depends

from Consultation.repo.ConsultationRepo import ConsultationRepo


class ConsultationService:
    consultationRepo:ConsultationRepo

    def __init__(
            self, consultationRepo: ConsultationRepo = Depends()
    ) -> None:
        self.consultationRepo = consultationRepo

    async def get_all_consultations(self):
        return await self.consultationRepo.get_all_consultations()

    async def list_all_consultations(self):
        return await self.consultationRepo.list_all_consultations()

    async def count_participation(self, consultation_id: int):
        return await self.consultationRepo.get_employees_by_consultation_details(consultation_id)