from datetime import datetime
from typing import Union, Any, Sequence

from fastapi import Depends
from fastapi.encoders import jsonable_encoder
from sqlalchemy import func, select, join, outerjoin, and_, not_, exists, distinct, Row, RowMapping
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session, joinedload
from datetime import datetime

from MedicalExamination.models import MedicalExaminationAssociation
from MedicalExamination.models.MedicalExaminationAssociation import association_table
from MedicalExamination.models.MedicalExamination import MedicalExamination
from Department.models.Department import Department
from configs.Database import get_db_connection_async
from employee.models.Employee import Employee


class ConsultationRepo:
    db: AsyncSession

    def __init__(
            self, db: AsyncSession = Depends(get_db_connection_async)
    ) -> None:
        self.db = db

    async def get_all_consultations(self):
        # Directly select all consultations without any join conditions
        stmt = select(MedicalExamination)

        result = await self.db.execute(stmt)
        consultations = result.scalars().all()  # Fetch all consultation records as objects
        return consultations

    async def get_employees_by_consultation_details(self, consultation_id: int):
        """
        Retrieve all employees who are in the same department, have the same job, seniority, and category
        as the department linked to a given consultation.
        """
        # Fetch the consultation first to get the related attributes
        result = await self.db.execute(
            select(MedicalExamination).where(MedicalExamination.id == consultation_id)
        )
        consultation = result.scalar_one()
        # If no consultation is found, return an empty list
        if not consultation:
            return []
        # Now query for employees who match the department, job, seniority, and category of the consultation
        stmt = (
            select(Employee)
            .join(Employee.department)  # Ensure Employee has a 'department' relationship
            .join(Employee.job)  # Ensure Employee has a 'job' relationship
            .where(Employee.department_id == consultation.departments_id)
            .where(Employee.job_id == consultation.job_id)
            .where(Department.category == consultation.category)
                     # This assumes Employee has a 'category' attribute
        )


        result = await self.db.execute(stmt)
        employees = result.scalars().all()
        # Filter employees in Python based on seniority
        matching_employees = [emp for emp in employees if emp.calculate_seniority() >= consultation.seniority]
        return matching_employees

    async def employees_participating(self, consultation_id: int):
        stmt = (
            select(Employee)
            .join(association_table, Employee.id == association_table.c.employee_id)
            .where(association_table.c.MedicalExamination_id == consultation_id)
        )
        result = await self.db.execute(stmt)
        count = result.scalars().all()  # This will return the count directly
        return count
