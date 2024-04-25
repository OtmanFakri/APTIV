from datetime import datetime

from fastapi import Depends
from fastapi.encoders import jsonable_encoder
from sqlalchemy import func, select, join, outerjoin, and_, not_, exists
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

    async def list_all_consultations(self):
        consultations = await self.db.execute(select(Consultation))
        return consultations.scalars().all()

    async def get_employees_by_consultation_details(self, consultation_id: int):
        current_date = datetime.now().date()
        async with self.db as session:
            consultation = await session.get(Consultation, consultation_id)
            if not consultation:
                return []  # Or handle the case where the consultation is not found

            employees = await session.execute(
                select(Employee)
                .join(Employee.department)
                .where(
                    and_(
                        Department.category == consultation.categories,
                        Employee.department_id.in_(consultation.departments),
                        Employee.job_id == consultation.job_id,
                        ((current_date - Employee.date_start).days / 365.25) >= consultation.seniority
                    )
                )
            )
            print(employees.scalars().all())  # Move this line inside the context manager
            return employees.scalars().all()


    async def count_participation(self, consultation_id: int):
        consultation = await self.db.get(Consultation, consultation_id)
        all_related_employees = await self.get_employees_by_consultation_details(consultation_id)

        return 1, 2


    async def get_all_consultations(self):
        join_condition = Consultation.id == association_table.c.consultation_id

        # Update the select statement to pass arguments without using a list
        stmt = select(
            Consultation,
            func.count(association_table.c.employee_id).label('employee_count')
        ).select_from(
            join(Consultation, association_table, join_condition)
        ).group_by(
            Consultation.id
        )

        result = await self.db.execute(stmt)
        consultations = result.fetchall()
        return consultations
