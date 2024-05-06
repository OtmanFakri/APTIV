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
        total_participating = await service.get_employees_by_MedicalExamination_details(examination.id)
        total_non_participating = await service.employees_by_consultation(examination.id)

        # Create the full examination data expected by the schema
        examination_data = {
            "medical_examinations":[
                examination.id,
                examination.name,
                examination.category,
                examination.seniority,
            ],
            "Department":[nameDep.name for nameDep in examination.departments],
            "Job":[nameJob.name for nameJob in examination.jobs],
            "total_non_participating" : len(total_participating),
            "total_participating" : len(total_non_participating)
        }
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
            job_ids=medical_exam.job_ids,
            date_start=medical_exam.date_start,
            date_end=medical_exam.date_end
        )
        return True
    except HTTPException as e:
        raise HTTPException(status_code=400, detail=f"Error creating the medical examination: {e.detail}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@ConsultationRouter.get("/examination/{examination_id}/employee")
async def list_all_consultations(
        examination_id: int,
        service: ConsultationService = Depends(ConsultationService)):
    total_employees = await service.get_employees_by_MedicalExamination_details(examination_id)  # Get the total number of employees
    rows = await service.get_monthly_participation(examination_id)
    nb_employee = len(total_employees)

    monthly_participation = {}
    for row in rows:
        month = row[2].strip()  # Extract the month and strip any extra whitespace
        if month not in monthly_participation:
            monthly_participation[month] = []
        monthly_participation[month].append({
            "employee_id": row[0],
            "participation_date": row[1].isoformat() if row[1] else None  # Convert date to ISO format string
        })

    # Calculate remaining non-participations for each month
    participation_details = []
    for month, details in sorted(monthly_participation.items()):
        nb_employee = nb_employee - len(details)
        Total_CM=len(details) + nb_employee
        participation_details.append({
            "month": month,
            "participations": details,
            "total_participations": len(details),
            "rest_participations": nb_employee,
            "Total CM":Total_CM,
            "%":(len(details)/Total_CM)*100
        })

    return participation_details

@ConsultationRouter.post("/examination/{examination_id}/employee/{employee_id}")
async def add_employee_examination_association(
        examination_id: int,
        employee_id: int,
        service: ConsultationService = Depends(ConsultationService)
):
    return await service.add_employee_examinaionAssocation(employee_id, examination_id)