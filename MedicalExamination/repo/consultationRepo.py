from datetime import datetime
from typing import Union, Any, Sequence

from fastapi import Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from sqlalchemy import func, select, join, outerjoin, and_, not_, exists, distinct, Row, RowMapping
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session, joinedload, selectinload
from datetime import datetime

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
            self, db: AsyncSession = Depends(get_db_connection_async)
    ) -> None:
        self.db = db
        self.employee_repo = EmployeeRepo(db)

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
            .options(selectinload(MedicalExamination.departments), selectinload(MedicalExamination.jobs))
        )
        consultation = result.unique().scalar_one_or_none()  # Use unique to ensure no duplicates are fetched

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
            min_seniority_years=consultation.seniority  # Assumes consultation.seniority maps directly to years
        )
        return employees

    async def employees_participating(self, consultation_id: int):
        stmt = (
            select(Employee)
            .join(association_table, Employee.id == association_table.c.employee_id)
            .where(association_table.c.MedicalExamination_id == consultation_id)
        )
        result = await self.db.execute(stmt)
        count = result.scalars().all()  # This will return the count directly
        return count

    async def create_medical_examination(self, name,
                                         seniority,
                                         category,
                                         date_start:datetime,
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
