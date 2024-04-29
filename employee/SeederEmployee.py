from datetime import date
import random
from faker import Faker

from Department.schemas.DepartmentSchema import CategoryEnum
from configs.Database import SessionLocal
from employee.models.City import City
from employee.models.Employee import Employee
from employee.repo.EmployeeRepo import EmployeeRepo
from employee.schemas.EmployeeSchema import EmployeeInfoRequest
from MedicalExamination.models.MedicalExamination import MedicalExamination

def get_random_manager_id(session):
    all_employee_ids = [employee.id for employee in session.query(Employee).all()]
    if not all_employee_ids:
        return None
    return random.choice(all_employee_ids)

def generate_unique_id(session):
    while True:
        new_id = random.randint(1, 99999)
        if not session.query(Employee).filter(Employee.id == new_id).first():
            return new_id

def insert_random_employees(num_employees=10):
    db = SessionLocal()  # Create a database session
    fake = Faker()       # Faker library for generating fake data
    all_city_ids = [city.id for city in db.query(City.id).all()]

    for _ in range(num_employees):
        # Generate random employee data
        employee_data = {
            "id": generate_unique_id(db),
            "category": random.choice(list(CategoryEnum)),
            "department_id": random.randint(1, 14),
            "job_id": random.randint(1, 100),
            "manager_id": None if random.randint(0, 1) == 0 else get_random_manager_id(db),
            "first_name": fake.first_name(),
            "last_name": fake.last_name(),
            "cin": str(fake.random_number(digits=8)),
            "cnss": str(fake.random_number(digits=8)),
            "phone_number": fake.random_number(digits=8),
            "birth_date": fake.date_of_birth(minimum_age=18, maximum_age=65).strftime('%Y-%m-%d'),
            "Sexe": random.choice(["Male", "Female"]),
            "city_id": random.choice(all_city_ids),
            "date_start": fake.date_between(start_date='-10y', end_date='today').strftime('%Y-%m-%d'),
            "date_hiring": fake.date_between(start_date='-20y', end_date='-10y').strftime('%Y-%m-%d'),
            "date_end": None
        }

        # Initialize the repository with the session
        employee_repo = EmployeeRepo(db=db)
        employee_request = EmployeeInfoRequest(**employee_data)

        # Use the repository to create an employee
        try:
            employee = employee_repo.create(employee_request)
            print(f"Employee created successfully with ID: {employee.id}")
        except Exception as e:
            print(f"An error occurred: {e}")
            # Optionally, break the loop if you don't want to continue after a failure
            break

    db.close()

# Call the function to insert random employees
insert_random_employees(100)
