from collections import defaultdict
from typing import List

from fastapi import APIRouter, Depends, HTTPException
from fastapi_pagination import Page, paginate

from Department.schemas.DepartmentSchema import DepartmentSchema
from Department.schemas.JobSchema import JobSchema
from MedicalExamination.schemas.MedicalExaminationSchema import PostMedicalExaminationSchema, \
    responseMedicalExaminationSchema
from MedicalExamination.service.ConsultationService import ConsultationService
from employee.schemas.EmployeeSchema import EmployeeInfoResponse

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
            "medical_examinations": [
                examination.id,
                examination.name,
                examination.category,
                examination.seniority,
            ],
            "Department": [nameDep.name for nameDep in examination.departments],
            "Job": [nameJob.name for nameJob in examination.jobs],
            "total_non_participating": len(total_participating),
            "total_participating": len(total_non_participating)
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
    total_employees = await service.get_employees_by_MedicalExamination_details(
        examination_id)  # Get the total number of employees
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
        Total_CM = len(details) + nb_employee
        participation_details.append({
            "month": month,
            "participations": details,
            "total_participations": len(details),
            "rest_participations": nb_employee,
            "Total CM": Total_CM,
            "%": (len(details) / Total_CM) * 100
        })

    return participation_details


@ConsultationRouter.post("/examination/{examination_id}/employee/{employee_id}")
async def add_employee_examination_association(
        examination_id: int,
        employee_id: int,
        service: ConsultationService = Depends(ConsultationService)
):
    return await service.add_employee_examinaionAssocation(employee_id, examination_id)


@ConsultationRouter.post("/examination/{examination_id}/employee")
async def get_exmanination_by_id(examination_id: int,
                                 associated: bool = False,
                                 service: ConsultationService = Depends(ConsultationService)) -> Page[
    EmployeeInfoResponse]:
    if associated:
        employees = await service.employees_by_consultation(examination_id)
    else:
        employees = await service.get_employees_by_MedicalExamination_details(examination_id)

    return paginate([
        EmployeeInfoResponse(
            id=res.id,
            first_name=res.first_name,
            avatar=res.profile_picture if res.profile_picture else None,
            last_name=res.last_name,
            manager_name=str(res.manager_id),
            category=res.department.category,
            department_name=res.department.name,
            job_name=res.job.name
        )
        for res in employees
    ])


@ConsultationRouter.delete("/examination/{examination_id}/employee/{employee_id}")
async def delete_employee_examinition(examination_id: int,
                                      employee_id: int,
                                      service: ConsultationService = Depends(ConsultationService)):
    return await service.delete(employee_id=employee_id, consultation_id=examination_id)


@ConsultationRouter.get("/search")
async def search_employee(
        employee_id: int,
        consultation_id: int,
        service: ConsultationService = Depends(ConsultationService)
) -> Page[EmployeeInfoResponse]:
    rsulta = await service.search_employee(employee_id=employee_id, consultation_id=consultation_id)

    if rsulta is None:
        rsulta = []

    return paginate([
        EmployeeInfoResponse(
            id=res.id,
            avatar=res.avatar if res.avatar else None,
            first_name=res.first_name,
            last_name=res.last_name,
            manager_name=str(res.manager_id),
            category=res.department.category,
            department_name=res.department.name,
            job_name=res.job.name
        )
        for res in rsulta
    ])


@ConsultationRouter.get("/participation/department/{consultation_id}")
async def get_Dep_participation(
        consultation_id: int,
        service: ConsultationService = Depends(ConsultationService)
):
    employees = await service.employees_by_consultation(consultation_id)
    employees_dont = await service.get_employees_by_MedicalExamination_details(consultation_id)

    # Group employees by department
    departments = defaultdict(lambda: {'participating': [], 'non_participating': []})
    for employee in employees:
        departments[employee.department.name]['participating'].append(employee)
    for employee in employees_dont:
        departments[employee.department.name]['non_participating'].append(employee)

    # Create the response
    response = []
    for department_name, department_employees in departments.items():
        total_participating = len(department_employees['participating'])
        total_non_participating = len(department_employees['non_participating']) - total_participating

        response.append({
            "department": {
                "id": department_employees['participating'][0].department.id if department_employees[
                    'participating'] else department_employees['non_participating'][0].department.id,
                "name": department_name,
                "category": department_employees['participating'][0].department.category if department_employees[
                    'participating'] else department_employees['non_participating'][0].department.category,
            },
            "total_participating": total_participating,
            "total_non_participating": total_non_participating,
            "Total CM": total_participating + total_non_participating,
            "%": round(
                (total_participating / (total_participating + total_non_participating)) * 100,
                2) if (total_participating + total_non_participating) > 0 else 0,
            "participating_employees": [
                {
                    "id": employee.id,
                    "first_name": employee.first_name,
                    "last_name": employee.last_name,
                    "manager_name": str(employee.manager_id),
                    "category": employee.department.category,
                    "department_name": employee.department.name,
                    "job_name": employee.job.name
                }
                for employee in department_employees['participating']
            ],
            "non_participating_employees": [
                {
                    "id": employee.id,
                    "first_name": employee.first_name,
                    "last_name": employee.last_name,
                    "manager_name": str(employee.manager_id),
                    "category": employee.department.category,
                    "department_name": employee.department.name,
                    "job_name": employee.job.name
                }
                for employee in department_employees['non_participating']
            ]
        })

    return response


@ConsultationRouter.get("/test")
async def testing(
        consultation_id: int,
        sort_by: str = None,
        service: ConsultationService = Depends(ConsultationService)
):
    # Get participating employees
    participating_employees = await service.employees_participating2(consultation_id, sort_by)
    # Get non-participating employees
    non_participating_employees = await service.get_employees_by_MedicalExamination_details2(consultation_id, sort_by)

    # Group employees by the sorting criteria
    grouped_data = defaultdict(lambda: {'participating': [], 'non_participating': []})

    for emp in participating_employees:
        if sort_by == "Sexe":
            key = emp.Sexe
        elif sort_by == "category":
            key = emp.department.category
        elif sort_by == "department":
            key = emp.department.name
        grouped_data[key]['participating'].append(emp)

    participating_employee_ids = {emp.id for emp in participating_employees}

    for emp in non_participating_employees:
        if emp.id not in participating_employee_ids:
            if sort_by == "Sexe":
                key = emp.Sexe
            elif sort_by == "category":
                key = emp.department.category
            elif sort_by == "department":
                key = emp.department.name
            grouped_data[key]['non_participating'].append(emp)

    # Create the response
    response = []
    for key, group in grouped_data.items():
        total_participating = len(group['participating'])
        total_non_participating = len(group['non_participating'])
        total_cm = total_participating + total_non_participating
        participation_percentage = round((total_participating / total_cm) * 100, 2) if total_cm > 0 else 0

        response.append({
            sort_by: key,
            "total_participating": total_participating,
            "total_non_participating": total_non_participating,
            "Total CM": total_cm,
            "%": participation_percentage,
            "participating_employees": [
                {
                    "id": emp.id,
                    "first_name": emp.first_name,
                    "last_name": emp.last_name,
                    "manager_name": str(emp.manager_id),
                    "category": emp.department.category,
                    "department_name": emp.department.name,
                    "job_name": emp.job.name
                }
                for emp in group['participating']
            ],
            "non_participating_employees": [
                {
                    "id": emp.id,
                    "first_name": emp.first_name,
                    "last_name": emp.last_name,
                    "manager_name": str(emp.manager_id),
                    "category": emp.department.category,
                    "department_name": emp.department.name,
                    "job_name": emp.job.name
                }
                for emp in group['non_participating']
            ]
        })

    return response


@ConsultationRouter.get("/me/{employee_id}")
async def get_examination_by_employee(employee_id: int,
                                      service: ConsultationService = Depends(ConsultationService)
                                      ):
    result = await service.get_examination_by_employee(employee_id)
    return result