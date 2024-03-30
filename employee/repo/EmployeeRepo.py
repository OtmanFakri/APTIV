from fastapi import Depends
from sqlalchemy.orm import Session, lazyload

from configs.Database import get_db_connection
from employee.models.Employee import Employee
from employee.schemas.EmployeeSchema import EmployeeInfo


class EmployeeRepo:
    db: Session

    def __init__(
            self, db: Session = Depends(get_db_connection)
    ) -> None:
        self.db = db

    def create(self, employee_info: EmployeeInfo) -> Employee:
        # Convert string dates to date objects
        employee_info.convert_dates()

        # Create Employee object from EmployeeInfo
        employee = Employee(
            id=employee_info.id,
            category=employee_info.category.value,
            department_id=employee_info.department_id,
            # certificate_id=employee_info.certificate_id,
            first_name=employee_info.first_name,
            last_name=employee_info.last_name,
            cin=employee_info.cin,
            cnss=employee_info.cnss,
            phone_number=employee_info.phone_number,
            birth_date=employee_info.birth_date,
            Sexe=employee_info.Sexe,
            city_id=employee_info.city_id,
            date_start=employee_info.date_start,
            date_hiring=employee_info.date_hiring,
            date_visit=employee_info.date_visit,
            manager_id=employee_info.manager_id
        )

        # Add employee to the database
        self.db.add(employee)
        self.db.commit()
        self.db.refresh(employee)

        return employee

    def get(self, employee: Employee):
        return self.db.get(
            Employee,
            employee.id,
            options=[lazyload(Employee.department), lazyload(Employee.city)],
        )

    def list(self):
        pass
