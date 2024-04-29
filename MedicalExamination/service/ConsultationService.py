from fastapi import Depends

from MedicalExamination.repo.consultationRepo import ConsultationRepo


class ConsultationService:
    consultationRepo: ConsultationRepo

    def __init__(
            self, consultationRepo: ConsultationRepo = Depends()
    ) -> None:
        self.consultationRepo = consultationRepo

    async def get_all_MedicalExamination(self):
        return await self.consultationRepo.get_all_MedicalExamination()

    async def get_employees_by_MedicalExamination_details(self, consultation_id: int):
        return await self.consultationRepo.get_employees_by_MedicalExamination_details(consultation_id)

    async def employees_by_consultation(self, consultation_id: int):
        return await self.consultationRepo.employees_participating(consultation_id)

    async def create_medical_examination(self, name, seniority, category,date_start,date_end=None,department_ids=None, job_ids=None):
        return await self.consultationRepo.create_medical_examination(name=name,
                                                                      seniority=seniority,
                                                                      category=category,
                                                                      date_start=date_start,
                                                                      date_end=date_end,
                                                                      department_ids=department_ids,
                                                                      job_ids=job_ids)

    async def get_monthly_participation(self, consultation_id: int):
        return await self.consultationRepo.get_monthly_participation(consultation_id)