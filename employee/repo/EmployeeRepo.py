from fastapi import Depends, HTTPException
from pydantic import json
from sqlalchemy import func, extract, case
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

    def list_BY_Hiring(self, year_hiring: int):
        try:
            manager_alias = aliased(Employee)
            results = (
                self.db.query(
                    Employee.id.label("Employee ID"),
                    Employee.first_name.label("First Name"),
                    Employee.last_name.label("Last Name"),
                    func.concat(manager_alias.first_name, ' ', manager_alias.last_name).label("Manager Name"),
                    Employee.category.label("Category"),
                    Department.name.label("Department Name")
                )
                .join(Department, Employee.department_id == Department.id)
                .join(manager_alias, Employee.manager_id == manager_alias.id, isouter=True)
                .with_entities(
                    Employee.id,
                    Employee.first_name,
                    Employee.last_name,
                    manager_alias.first_name,
                    manager_alias.last_name,
                    Employee.category,
                    Department.name
                )
                .filter(func.extract('year', Employee.date_hiring) == year_hiring)
                .all()
            )




            return results
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))

    def delete(self, employee_id: int):
        employee = self.db.query(Employee).filter(Employee.id == employee_id).first()
        if not employee:
            raise Exception("Employee not found")
        self.db.delete(employee)
        self.db.commit()
        return employee

    def update(self, employee: Employee) -> Employee:
        existing_employee = self.db.query(Employee).filter(Employee.id == employee.id).first()

        if existing_employee:
            # Merge the existing_employee with the new employee data
            self.db.merge(employee)
            self.db.commit()
            self.db.refresh(existing_employee)
            return existing_employee
        else:
            raise ValueError("Employee not found")
