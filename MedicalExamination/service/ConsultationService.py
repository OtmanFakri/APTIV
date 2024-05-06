import datetime

from fastapi import Depends, HTTPException

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

    async def add_employee_examinaionAssocation(self, employee_id: int, consultation_id: int):
        valid_employees = await self.get_employees_by_MedicalExamination_details(consultation_id)
        employee_found = False
        invalid_employee = None  # This will hold the reference to the problematic employee

        for emp in valid_employees:
            print(f"Checking employee: {emp.id}")
            if emp.id == employee_id:
                print(f"Employee found: {emp.id}")
                employee_found = True
                break
            invalid_employee = emp  # Keep updating this with the current emp

        if not employee_found:
            print(f"Invalid employee: {employee_id}")  # Print details of the last checked employee
            raise HTTPException(
                status_code=400,
                detail=f"Invalid employee ID {employee_id} for the given consultation"
            )

        return await self.consultationRepo.add_employee_examinaionAssocation(employee_id=employee_id,
                                                                             consultation_id=consultation_id,
                                                                             )
