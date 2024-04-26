from datetime import datetime

from fastapi import Depends
from fastapi.encoders import jsonable_encoder
from sqlalchemy import func, select, join, outerjoin, and_, not_, exists, distinct
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session, joinedload
from datetime import datetime

from Consultation.models import ConsultationAssociation
from Consultation.models.ConsultationAssociation import association_table
from Consultation.models.Consultations import Consultation
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
        join_condition = Consultation.id == association_table.c.consultation_id

        # Update the select statement to pass arguments without using a list
        stmt = select(
            Consultation,
        ).select_from(
            join(Consultation, association_table, join_condition)
        ).group_by(
            Consultation.id
        )

        result = await self.db.execute(stmt)
        consultations = result.fetchall()
        return consultations

    async def get_employees_by_consultation_details(self, consultation_id: int):
        result = await self.db.execute(
            select(Consultation).where(Consultation.id == consultation_id)
        )
        consultation_record = result.scalar_one()

        consultation_category = consultation_record.categories
        consultation_seniority = consultation_record.seniority

        stmt = (
            select(Employee)
            .join(Employee.department)  # Join to access department details
            .join(Employee.consultations)  # Join to access consultations of each employee
            .where(Employee.department.has(Department.category == consultation_category))
        )

        result = await self.db.execute(stmt)
        all_employees = result.scalars().all()

        # Filter employees in Python based on seniority
        matching_employees = [emp for emp in all_employees if emp.calculate_seniority() >= consultation_seniority]
        return matching_employees

    async def count_employees_participating(self, consultation_id: int):
        # Initialize a dictionary to store participation counts
        participation_counts = {}

        # Get the list of employees participating in the specific consultation
        employees = await self.get_employees_by_consultation_details(consultation_id)

        # If 'employees' is a list of Employee objects, we can't directly use 'employees.consultation.id'.
        # Since we already know the consultation_id, we use it directly:
        participation_counts[consultation_id] = len(employees)

        return participation_counts
