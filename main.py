from fastapi import FastAPI
from fastapi_pagination import add_pagination
from sqlalchemy import event
from starlette.middleware.cors import CORSMiddleware

from Consultation.models.Consultations import Consultation
from Consultation.routes.consultationRoutes import ConsultationRouter
from Department.models.Department import Department
from Department.models.Job import Job
from Department.routers.DepartmentRouter import DepartmentRouter
from Department.routers.JobRouter import JobRouter
from certificate.models.certificate import Certificate
from certificate.models.doctor import Doctor
from certificate.router.certificateRouter import CertificateRouter
from certificate.router.doctorRouter import DoctorRouter
from configs.BaseModel import init
from employee.models.City import City
from employee.models.Region import Region
from employee.routers.AddressRouter import AddressRouter
from employee.routers.EmployeeRouter import EmployeeRouter

app = FastAPI()

origins = [
    "http://localhost:4200",  # Adjust the port if necessary
    "http://127.0.0.1:4200",  # You can add more origins as needed
]

# Add CORSMiddleware to the application instance
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows the origins listed in the origins list
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, DELETE, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Listen to the 'after_create' event on the Department table
try:
    event.listen(Job.__table__, 'after_create')
    event.listen(Department.__table__, 'after_create')
    event.listen(City.__table__, 'after_create')
    event.listen(Region.__table__, 'after_create')
    event.listen(Doctor.__table__, 'after_create')
    event.listen(Certificate.__table__, 'after_create')
    event.listen(Consultation.__table__, 'after_create')
except Exception as e:
    print("An error occurred while attaching event listener:", e)
@app.get("/")
async def root():
    return {"message": "Hello World"}




# Add Routers
app.include_router(AddressRouter)
app.include_router(EmployeeRouter)
app.include_router(DepartmentRouter)
app.include_router(JobRouter)
app.include_router(DoctorRouter)
app.include_router(CertificateRouter)
app.include_router(ConsultationRouter)
# Initialise Data Model Attributes
@app.on_event("startup")
def configure():
    init()


add_pagination(app)  # important! add pagination to your app