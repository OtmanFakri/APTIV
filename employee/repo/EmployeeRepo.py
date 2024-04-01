from fastapi import Depends
from sqlalchemy import func
from sqlalchemy.orm import Session, lazyload, aliased

from Department.models.Department import Department
from Department.models.Job import Job
from configs.Database import get_db_connection
from employee.models.City import City
from employee.models.Employee import Employee
from employee.models.Region import Region
from employee.schemas.EmployeeSchema import EmployeeSchemaRequest, EmployeeInfoRequest


class EmployeeRepo:
    db: Session

    def __init__(
            self, db: Session = Depends(get_db_connection)
    ) -> None:
        self.db = db

    def create(self, employee_info: EmployeeInfoRequest) -> Employee:
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
            manager_id=employee_info.manager_id,
            job_id=employee_info.job_id
        )

        # Add employee to the database
        self.db.add(employee)
        self.db.commit()
        self.db.refresh(employee)

        return employee

    def get(self, employee_id: int):
        manager_alias = aliased(Employee)
        city_alias = aliased(City)
        region_alias = aliased(Region)
        query = (self.db.query(
            Employee,
            Department.name.label('DepartmentName'),
            Job.name.label('JobName'),
            city_alias.name.label('CityName'),
            region_alias.name.label('RegionName'),
            func.concat(manager_alias.first_name, ' ', manager_alias.last_name).label('ManagerName')
        ).join(
            Job, Employee.job_id == Job.id
        ).join(
            Department, Job.department_id == Department.id
        ).join(
            city_alias, Employee.city_id == city_alias.id
        ).join(
            region_alias, city_alias.region_id == region_alias.id
        )
        .outerjoin(
            manager_alias, Employee.manager_id == manager_alias.id
        ).filter(
            Employee.id == employee_id
        ).first())

        if query:
            # Convert query result to a dictionary
            return query
        else:
            return None


    def list(self):
        pass
