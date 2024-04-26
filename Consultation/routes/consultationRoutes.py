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
        }
        for consultation in resulta
    ]
    return consultations_list

@ConsultationRouter.get("/participation")
async def list_all_consultations(service: ConsultationService = Depends(ConsultationService)):
    consultations = await service.get_all_consultations()
    consultations_list = []
    for consultation in consultations:
        # Assuming each consultation has an id, name, and you calculate non-participating employees somehow
        total_participating = await service.count_employees_by_consultation(consultation[0].id)
        consultation_data = {
            "id": consultation[0].id,
            "name": consultation[0].name,
            "total_participating": len(total_participating),
            #"total_non_participating": len(total_participating) - participating_count
            # This assumes you have a way to calculate this
        }
        consultations_list.append(consultation_data)

    return consultations_list