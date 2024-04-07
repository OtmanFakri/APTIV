from fastapi import APIRouter

DoctorRouter = APIRouter(
    prefix="/doctor", tags=["doctor"]
)


@DoctorRouter.get("/")
def get_doctors():
    return {"message": "Hello World"}