from faker import Faker
from random import randint, choice
from sqlalchemy.orm import Session

from configs.Database import SessionLocal
from employee.models.City import City
from employee.models.Employee import Employee
from employee.repo.EmployeeRepo import EmployeeRepo
from employee.schemas.EmployeeSchema import CategoryEnum, EmployeeInfoRequest
from employee.service.EmployeeService import EmployeeService
from Consultation.models.Consultations import Consultation
fake = Faker()


def get_random_manager_id(session):
    all_employee_ids = [employee.id for employee in session.query(Employee).all()]

    if not all_employee_ids:
        return None

    return choice(all_employee_ids)

def generate_unique_id(session: Session):
    while True:
        new_id = randint(1, 99999)
        if not session.query(Employee).filter(Employee.id == new_id).first():
            return new_id


def create_employee_with_service(session: Session):
    employee_service = EmployeeService(employeeRepo=EmployeeRepo())

    all_city_ids = [city.id for city in session.query(City.id).all()]

    employee_data = {
        "id": generate_unique_id(session),
        "category": choice(list(CategoryEnum)),
        "department_id": randint(1, 14),
        "job_id": randint(1, 100),
        "manager_id": None if randint(0, 1) == 0 else get_random_manager_id(session),
        "first_name": fake.first_name(),
        "last_name": fake.last_name(),
        "cin": str(fake.random_number(digits=8)),
        "cnss": str(fake.random_number(digits=8)),
        "phone_number": fake.random_number(digits=8),
        "birth_date": fake.date_of_birth(minimum_age=18, maximum_age=65).strftime('%Y-%m-%d'),
        "Sexe": choice(["Male", "Female"]),
        "city_id": choice(all_city_ids),
        "date_start": fake.date_between(start_date='-10y', end_date='today').strftime('%Y-%m-%d'),
        "date_hiring": fake.date_between(start_date='-20y', end_date='-10y').strftime('%Y-%m-%d'),
        "date_end": None
    }

    employee_request = EmployeeInfoRequest(**employee_data)
    employee_request.convert_dates()

    try:
        employee_service.create(employee_request)
        print(f"Created employee with ID: {employee_request.id}")
    except Exception as e:
        print(f"Error creating employee: {e}")


def seed_data():
    session = SessionLocal()
    employee_service = EmployeeService(employeeRepo=EmployeeRepo())  # Create an instance of EmployeeService

    for _ in range(1000):
        create_employee_with_service(session)  # Pass only the session object

    print(f"Created 1000 employees.")


if __name__ == "__main__":
    seed_data()