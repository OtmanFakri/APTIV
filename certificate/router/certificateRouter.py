from fastapi import APIRouter

from certificate.schemas.CertificateSchema import testShcema

CertificateRouter = APIRouter(
    prefix="/certificate", tags=["certificate"]
)


@CertificateRouter.post("/")
def get_certificates(test:testShcema):
    return test