from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import and_
from sqlalchemy.future import select
from datetime import date, timedelta

from Department.models.Department import Department
from Department.models.Job import Job
from configs.Database import get_db_connection_async
from employee.models.Employee import Employee


class EmployeeRepo:
    db: AsyncSession

    def __init__(
            self, db: AsyncSession = Depends(get_db_connection_async)
    ) -> None:
        self.db = db

    async def get_employee(self, employee_id=None, sex=None,
                           department_ids=None, job_ids=None, category=None,
                           min_seniority_years=None,manger_ids=None):
        query = select(Employee).join(Employee.department).join(Employee.job).order_by(Employee.id.desc())

        # Apply filters based on the input parameters
        if employee_id:
            query = query.filter(Employee.id == employee_id)
        if sex:
            query = query.filter(Employee.Sexe == sex)  # Changed 'Sexe' to 'sex', adjust as per your model
        if department_ids:
            query = query.filter(Department.id.in_(department_ids))
        if job_ids:
            query = query.filter(Job.id.in_(job_ids))
        if manger_ids:
            query = query.filter(Employee.manager_id.in_(manger_ids))
        if category:
            query = query.filter(Department.category.in_(category))
        if min_seniority_years is not None:
            earliest_start_date = date.today() - timedelta(days=min_seniority_years * 365)
            query = query.filter(Employee.date_start <= earliest_start_date)

        result = await self.db.execute(query)
        return result.scalars().all()