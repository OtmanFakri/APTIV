from typing import List

from fastapi import APIRouter, Depends, HTTPException

from Department.schemas.DepartmentSchema import DepartmentSchema
from Department.schemas.JobSchema import JobSchema
from MedicalExamination.schemas.MedicalExaminationSchema import PostMedicalExaminationSchema, \
    responseMedicalExaminationSchema
from MedicalExamination.service.ConsultationService import ConsultationService

ConsultationRouter = APIRouter(
    prefix="/consultation", tags=["consultation"]
)


@ConsultationRouter.get("/")
async def get_all_consultations(
        service: ConsultationService = Depends(ConsultationService)
):
    resulta = await service.get_all_MedicalExamination()
    consultations_list = [
        {
            "medicalExamination": consultation,
        }
        for consultation in resulta
    ]
    return consultations_list


@ConsultationRouter.get("/participation")
async def list_all_consultations(service: ConsultationService = Depends(ConsultationService)
                                 ):
    medical_examinations = await service.get_all_MedicalExamination()
    medical_examination_list = []

    for examination in medical_examinations:
        # Assuming examination already includes department and job information
        total_participating = await service.get_employees_by_MedicalExamination_details(examination.id)
        total_non_participating = await service.employees_by_consultation(examination.id)

        # Create the full examination data expected by the schema
        examination_data = responseMedicalExaminationSchema(
            id=examination.id,
            name=examination.name,
            seniority=examination.seniority,
            category=examination.category,
            departments=[DepartmentSchema.from_orm(dept) for dept in examination.departments],
            jobs=[JobSchema.from_orm(job) for job in examination.jobs],
            total_participating=len(total_participating),
            total_non_participating=len(total_non_participating)
        )
        medical_examination_list.append(examination_data)

    return medical_examination_list


@ConsultationRouter.post("/", response_model=bool)
async def create(
        medical_exam: PostMedicalExaminationSchema,
        service: ConsultationService = Depends()
) -> bool:
    try:
        created = await service.create_medical_examination(
            name=medical_exam.name,
            seniority=medical_exam.seniority,
            category=medical_exam.category,
            department_ids=medical_exam.department_ids,
            job_ids=medical_exam.job_ids
        )
        return created
    except HTTPException as e:
        raise HTTPException(status_code=400, detail=f"Error creating the medical examination: {e.detail}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
