import datetime
from typing import Union, Any, Sequence, List

from fastapi import Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from sqlalchemy import func, select, Date, insert, delete
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session, joinedload, selectinload
from employee.schemas.EmployeeSchema import CategoryEnum
from Department.models.Job import Job
from MedicalExamination.models import MedicalExaminationAssociation
from MedicalExamination.models.MedicalExaminationAssociation import association_table
from MedicalExamination.models.MedicalExamination import MedicalExamination
from Department.models.Department import Department
from configs.Database import get_db_connection_async
from employee.models.Employee import Employee
from employee.repo.v2.EmployeeRepo import EmployeeRepo


class ConsultationRepo:
    db: AsyncSession
    employee_repo: EmployeeRepo

    def __init__(
            self, db: AsyncSession = Depends(get_db_connection_async),
            employee_repo: EmployeeRepo = Depends()

    ) -> None:
        self.db = db
        self.employee_repo = employee_repo

    async def get_all_MedicalExamination(self):
        stmt = select(MedicalExamination)

        result = await self.db.execute(stmt)
        consultations = result.scalars().all()
        return consultations

    async def get_employees_by_MedicalExamination_details(self, consultation_id: int):
        # Fetch the consultation first to get the related attributes
        result = await self.db.execute(
            select(MedicalExamination)
            .where(MedicalExamination.id == consultation_id)
            .options(selectinload(MedicalExamination.departments), selectinload(MedicalExamination.jobs)))

        consultation = result.unique().scalar_one_or_none()

        if not consultation:
            return []

        # Extract department and job IDs from the consultation
        department_ids = [dept.id for dept in consultation.departments]
        job_ids = [job.id for job in consultation.jobs]

        # Use the enhanced get_employee method
        employees = await self.employee_repo.get_employee(
            department_ids=department_ids,
            job_ids=job_ids,
            category=consultation.category,
            min_seniority_years=consultation.seniority,
            # max_seniority_years=consultation.seniority
        )
        return employees

    async def employees_participating(self, consultation_id: int):
        stmt = (
            select(Employee)
            .join(association_table, Employee.id == association_table.c.employee_id)
            .where(association_table.c.MedicalExamination_id == consultation_id)
        )
        result = await self.db.execute(stmt)
        employee = result.scalars().all()
        return employee

    async def create_medical_examination(self, name,
                                         seniority,
                                         category: List[CategoryEnum],
                                         date_start: datetime,
                                         department_ids=None,
                                         job_ids=None,
                                         date_end: datetime = None
                                         ):
        """
                Creates a new medical examination record with the given details and links to departments and jobs.

                :param name: str - The name of the medical examination
                :param seniority: int - The seniority level required for the examination
                :param category: Enum - The category of the examination
                :param department_ids: List[int] - List of department IDs to associate with the examination
                :param job_ids: List[int] - List of job IDs to associate with the examination
                :return: MedicalExamination - The newly created medical examination instance
        """
        try:
            new_medical_examination = MedicalExamination(
                name=name,
                seniority=seniority,
                category=category,
                date_start=date_start,
                date_end=date_end
            )
            # Link to departments and jobs if applicable
            if department_ids:
                departments = await self.db.execute(select(Department).where(Department.id.in_(department_ids)))
                new_medical_examination.departments = departments.scalars().all()
            if job_ids:
                jobs = await self.db.execute(select(Job).where(Job.id.in_(job_ids)))
                new_medical_examination.jobs = jobs.scalars().all()

            self.db.add(new_medical_examination)
            await self.db.commit()
            return new_medical_examination
        except SQLAlchemyError as e:
            await self.db.rollback()
            raise HTTPException(status_code=500, detail=str(e))

    async def get_monthly_participation(self, consultation_id: int):
        # Define an expression to extract the year and month as a string "Month YYYY"
        month_expr = func.to_char(association_table.c.date, 'Month YYYY').label('month')

        # Build the query to fetch employee details and the associated date, ordered by the date
        stmt = (
            select(
                Employee.id.label('employee_id'),
                association_table.c.date.label('participation_date'),
                month_expr
            )
            .select_from(MedicalExamination)  # Start from MedicalExaminations table
            .join(association_table,
                  MedicalExamination.id == association_table.c.MedicalExamination_id)  # Correctly join association table
            .join(Employee, Employee.id == association_table.c.employee_id)  # Join Employee to fetch details
            .where(MedicalExamination.id == consultation_id)  # Filter by MedicalExamination ID
            .order_by(association_table.c.date)  # Ordering by participation date
        )

        # Execute the query
        result = await self.db.execute(stmt)
        rows = result.fetchall()
        # Organize the data into a structured format
        return rows

    async def add_employee_examinaionAssocation(self, employee_id: int, consultation_id: int):
        date_value = datetime.date.today()
        try:
            check_employee = await self.db.execute(
                select(association_table).where(
                    (association_table.c.employee_id == employee_id) &
                    (association_table.c.MedicalExamination_id == consultation_id)
                )
            )
            result = check_employee.fetchone()

            if result is None:
                stmt = insert(association_table).values(
                    employee_id=employee_id,
                    MedicalExamination_id=consultation_id,
                    date=date_value
                )
                await self.db.execute(stmt)
                await self.db.commit()
                return True
        except SQLAlchemyError as e:
            await self.db.rollback()
            raise HTTPException(status_code=500, detail=str(e))

    async def delete_employee_examinaionAssocation(self, employee_id: int, consultation_id: int):
        try:
            # Check if the association exists
            check_employee = await self.db.execute(
                select(association_table).where(
                    (association_table.c.employee_id == employee_id) &
                    (association_table.c.MedicalExamination_id == consultation_id)
                )
            )
            result = check_employee.fetchone()

            if result is not None:
                stmt = delete(association_table).where(
                    (association_table.c.employee_id == employee_id) &
                    (association_table.c.MedicalExamination_id == consultation_id)
                )
                await self.db.execute(stmt)
                await self.db.commit()
                return True
            else:
                raise HTTPException(status_code=404, detail="Association not found")
        except SQLAlchemyError as e:
            await self.db.rollback()
            raise HTTPException(status_code=500, detail=str(e))

    async def search_employee(self, employee_id: int, consultation_id: int):
        employees = await self.get_employees_by_MedicalExamination_details(consultation_id)

        # Search for the employee by ID in the returned list
        for employee in employees:
            if employee.id == employee_id:
                return [employee]

        return None

    async def employees_participating2(self, consultation_id: int, sort_by: str = None):
        stmt = (
            select(Employee)
            .join(association_table, Employee.id == association_table.c.employee_id)
            .join(Employee.department)
            .where(association_table.c.MedicalExamination_id == consultation_id)
        )

        # Determine the sorting criteria
        if sort_by == "Sexe":
            stmt = stmt.order_by(Employee.Sexe)
        elif sort_by == "category":
            stmt = stmt.order_by(Department.category)  # Correctly reference Department.category
        elif sort_by == "department":
            stmt = stmt.order_by(Employee.department_id)

        result = await self.db.execute(stmt)
        employees = result.scalars().all()
        return employees

    async def get_employees_by_MedicalExamination_details2(self, consultation_id: int, sort_by: str = None):
        # Fetch the consultation first to get the related attributes
        result = await self.db.execute(
            select(MedicalExamination)
            .where(MedicalExamination.id == consultation_id)
            .options(selectinload(MedicalExamination.departments), selectinload(MedicalExamination.jobs))
        )

        consultation = result.unique().scalar_one_or_none()

        if not consultation:
            return []

        # Extract department and job IDs from the consultation
        department_ids = [dept.id for dept in consultation.departments]
        job_ids = [job.id for job in consultation.jobs]

        # Use the enhanced get_employee method
        employees = await self.employee_repo.get_employee(
            department_ids=department_ids,
            job_ids=job_ids,
            category=consultation.category,
            min_seniority_years=consultation.seniority,
            # max_seniority_years=consultation.seniority
        )

        # Sort employees if sort_by is provided
        if sort_by == "Sexe":
            employees.sort(key=lambda emp: emp.Sexe)
        elif sort_by == "category":
            employees.sort(key=lambda emp: emp.department.category)
        elif sort_by == "department":
            employees.sort(key=lambda emp: emp.department_id)

        return employees

    async def get_examination_by_employee(self, employee_id: int):
        stmt = (
            select(MedicalExamination)
            .join(association_table, MedicalExamination.id == association_table.c.MedicalExamination_id)
            .where(association_table.c.employee_id == employee_id)
        )
        result = await self.db.execute(stmt)
        examinations = result.scalars().all()
        return examinations
