from fastapi import APIRouter

CertificateRouter = APIRouter(
    prefix="/certificate", tags=["certificate"]
)


@CertificateRouter.get("/")
def get_certificates():
    return {"message": "Hello World"}