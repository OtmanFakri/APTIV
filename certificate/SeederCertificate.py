from datetime import date
import random
from sqlalchemy import create_engine, select

from faker import Faker

from certificate.models.doctor import Doctor
from certificate.schemas.CertificateSchema import PostCertificateSchema, ValidationCertificationEnum
from configs.Database import SessionLocal
from employee.models.Employee import Employee
from employee.repo.EmployeeRepo import EmployeeRepo
from MedicalExamination.models.MedicalExamination import MedicalExamination

def insert_random_certificates(num_certificates=10):
    db = SessionLocal()
    fake = Faker()

    # Fetch all valid employee_ids and doctor_ids
    employee_ids = [id for id in db.execute(select(Employee.id)).scalars().all()]
    doctor_ids = [id for id in db.execute(select(Doctor.id)).scalars().all()]

    if not employee_ids or not doctor_ids:
        print("Employees or Doctors table is empty. Please make sure both have data.")
        db.close()
        return

    for _ in range(num_certificates):
        # Randomly choose an employee_id and doctor_id
        employee_id = random.choice(employee_ids)
        doctor_id = random.choice(doctor_ids)

        # Generate random certificate data
        certificate_info = PostCertificateSchema(
            doctor_id=doctor_id,
            date=fake.date_between(start_date="-2y", end_date="today"),
            date_start=fake.date_between(start_date="-2y", end_date="today"),
            date_end=fake.date_between(start_date="today", end_date="+2y"),
            date_entry=fake.date_between(start_date="-2y", end_date="today"),
            validation=random.choice(list(ValidationCertificationEnum)),
            date_planned=fake.date_between(start_date="today", end_date="+2y"),
            nbr_expected=random.randint(1, 100),
            nbr_days=random.randint(1, 30),
            nbr_gap=random.randint(1, 10)
        )

        # Initialize the repository with the session
        employee_repo = EmployeeRepo(db=db)

        # Use the repository to create a certificate
        try:
            certificate = employee_repo.create_certificate(employee_id, certificate_info)
            print("Certificate created successfully.")
        except Exception as e:
            print(f"An error occurred: {e}")
            # Optionally, break the loop if you don't want to continue after a failure
            break

    db.close()


# Call the function
insert_random_certificates(100)