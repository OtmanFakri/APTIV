from fastapi import APIRouter, Depends

from MedicalExamination.service.ConsultationService import ConsultationService

ConsultationRouter = APIRouter(
    prefix="/consultation", tags=["consultation"]
)


@ConsultationRouter.get("/")
async def get_all_consultations(
        service: ConsultationService = Depends(ConsultationService)
):

    resulta = await service.get_all_consultations()
    consultations_list = [
        {
            "medicalExamination": consultation,
        }
        for consultation in resulta
    ]
    return consultations_list

@ConsultationRouter.get("/participation")
async def list_all_consultations(service: ConsultationService = Depends(ConsultationService)):
    MedicalExaminations = await service.get_all_consultations()
    medicalExamination_list = []
    for medicalExamination in MedicalExaminations:
        # Assuming each consultation has an id, name, and you calculate non-participating employees somehow
        total_participating = await service.get_employees_by_consultation_details(medicalExamination.id)
        total_non_participating = await service.employees_by_consultation(medicalExamination.id)

        consultation_data = {
            "id": medicalExamination.id,
            "name": medicalExamination.name,
            "total_non_participating": len(total_participating),
            "total_participating": len(total_non_participating),
        }
        medicalExamination_list.append(consultation_data)

    return medicalExamination_list