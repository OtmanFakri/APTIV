from fastapi import APIRouter, Depends

from Consultation.service.ConsultationService import ConsultationService

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
            "consultation": consultation[0],
            "employee_count": consultation[1]
        }
        for consultation in resulta
    ]
    return consultations_list

@ConsultationRouter.get("/participation")
async def list_all_consultations(service: ConsultationService = Depends(ConsultationService)):
    consultations = await service.list_all_consultations()
    total_participating = await service.count_participation(1)

    consultation_data = {
            "id": consultations[0].id,
            #"title": consultation.name,  # Assuming there's a title or similar field
            #"total_participating": total_participating,
            #"total_non_participating": total_non_participating
        }
        #consultations_list.append(consultation_data)
    return consultation_data