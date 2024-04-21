from datetime import date

from sqlalchemy import select, func, and_, extract, distinct

from fastapi import Depends
from sqlalchemy.orm import Session, joinedload
import logging

from Department.models.Department import Department
from certificate.models.certificate import Certificate
from certificate.models.doctor import Doctor
from configs.Database import get_db_connection, get_db_connection_async, AsyncSessionLocal
from employee.models.Employee import Employee



# Configure logging
logging.basicConfig(level=logging.DEBUG, filename='debug.log', filemode='w',
                    format='%(asctime)s - %(levelname)s - %(message)s')
class CertificateRepository:
    db: Session

    def __init__(
            self, db: Session = Depends(get_db_connection_async)
    ) -> None:
        self.db = db

    async def filter_certificates(self, doctor_id=None, manager_id=None, from_date=None, to_date=None, nbr_days=None, validation=None):
        async with self.db as session:
            query = select(Certificate).options(
                joinedload(Certificate.doctor),
                joinedload(Certificate.employee).joinedload(Employee.department),
                joinedload(Certificate.employee).joinedload(Employee.job)
                # Correct path through Employee to Department
            )

            # Filter by doctor_id if provided
            if doctor_id is not None:
                query = query.where(Certificate.doctor_id == doctor_id)

            # Filter by manager_id if provided
            if manager_id is not None:
                query = query.join(Employee, Certificate.employee_id == Employee.id).where(Employee.manager_id == manager_id)

            # Filter by date range if provided
            if from_date and to_date:
                query = query.where(Certificate.date.between(from_date, to_date))

            # Filter by number of days if provided
            if nbr_days is not None:
                query = query.where(Certificate.nbr_days == nbr_days)

            # Filter by validation status if provided
            if validation is not None:
                query = query.where(Certificate.validation == validation)

            result = await session.execute(query)  # Execute the query asynchronously
            certificates = result.scalars().all()  # Fetch the results
            return certificates

    async def get_certificates_by_department(
            self, department_id: int = None,
            year: int = None, month: int = None
    ):
        query = select(
            Department.name.label("department"),
            func.count(distinct(Employee.id)).label("headcount"),
            func.count(Certificate.id).label("certificates_nbr"),
            func.sum(Certificate.nbr_days).label("illness_days_nbr"),
            (func.count(Certificate.id) / func.count(distinct(Employee.id))).label("certificate_rate"),
            (func.sum(Certificate.nbr_days) / func.count(Certificate.id)).label("average_illness_days")
        ).select_from(Employee
                      ).join(Department, Employee.department_id == Department.id
                             ).outerjoin(Certificate, Certificate.employee_id == Employee.id
                                         ).group_by(Department.name)

        # Filter by department if department_id is provided
        if department_id:
            query = query.where(Department.id == department_id)

        # Filter by year and month if provided
        if year:
            query = query.where(extract('year', Certificate.date_start) == year)
        if month:
            query = query.where(extract('month', Certificate.date_start) == month)

        result = await self.db.execute(query)
        return result.fetchall()
