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



    async def get_employees_by_consultation_details(self, consultation_id: int):
        return await self.consultationRepo.get_employees_by_consultation_details(consultation_id)

    async def count_employees_by_consultation(self, consultation_id: int):
        return await self.consultationRepo.count_employees_participating(consultation_id)