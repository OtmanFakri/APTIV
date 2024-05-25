from fastapi import FastAPI, HTTPException, Depends
from fastapi_pagination import add_pagination
from sqlalchemy import event
from starlette.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from MedicalExamination.models.MedicalExamination import MedicalExamination
from MedicalExamination.route.consultationRoutes import ConsultationRouter
from Department.models.Department import Department
from Department.models.Job import Job
from Department.routers.DepartmentRouter import DepartmentRouter
from Department.routers.JobRouter import JobRouter
from certificate.models.certificate import Certificate
from certificate.models.doctor import Doctor
from certificate.repo.Certificate_Repository import CertificateRepository
from certificate.router.certificateRouter import CertificateRouter
from certificate.router.doctorRouter import DoctorRouter
from configs.BaseModel import init
from employee.models.City import City
from employee.models.Region import Region
from employee.routers.AddressRouter import AddressRouter
from employee.routers.EmployeeRouter import EmployeeRouter
import mailslurp_client


app = FastAPI(
)

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
app.mount("/avatars", StaticFiles(directory="avatars"), name="avatars")

# Listen to the 'after_create' event on the Department table
try:
    event.listen(Job.__table__, 'after_create')
    event.listen(Department.__table__, 'after_create')
    event.listen(City.__table__, 'after_create')
    event.listen(Region.__table__, 'after_create')
    event.listen(Doctor.__table__, 'after_create')
    event.listen(Certificate.__table__, 'after_create')
    event.listen(MedicalExamination.__table__, 'after_create')
except Exception as e:
    print("An error occurred while attaching event listener:", e)
@app.get("/")
async def root():
    return {"message": "Hello World"}

api_key = "b827aaf04393003ae960b7dd0d2039fd0d750b6cb51a90194f2581190e565c0c"
configuration = mailslurp_client.Configuration()
configuration.api_key['x-api-key'] = api_key
inbox_id = "d5af15ae-32c2-4621-ac5d-34445eb1f915"


@app.post("/send-email/")
async def filter_and_send_emails(certificate_repo: CertificateRepository = Depends(CertificateRepository)):
    certificates = await certificate_repo.filter_certificates(include_today=True)

    with mailslurp_client.ApiClient(configuration) as api_client:
        inbox_controller = mailslurp_client.InboxControllerApi(api_client)

        for certificate in certificates:
            employee = certificate.employee
            to_email = "otmanhero00@mailslurp.com"  # Assuming the Employee model has an email field
            subject = "Action Required: Update Certificate"
            body = f"""
            <html>
            <body>
                <p>Dear {employee.full_name()},</p>
                <p>Please update the date planned for your certificate.</p>
                <a href="http://localhost:8011/update-date-planned/{employee.id}/{certificate.id}?save_current_date=true" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #4CAF50; text-align: center; text-decoration: none; border-radius: 5px;">Set Date Planned to Today</a>
                <br><br>
                <a href="http://localhost:8011/update-date-planned/{employee.id}/{certificate.id}?save_current_date=false" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #f44336; text-align: center; text-decoration: none; border-radius: 5px;">Clear Date Planned</a>
            </body>
            </html>
            """

            send_email_options = mailslurp_client.SendEmailOptions(
                to=[to_email],
                subject=subject,
                body=body
            )
            inbox_controller.send_email(inbox_id, send_email_options)

    return {"message": "Emails sent successfully"}

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