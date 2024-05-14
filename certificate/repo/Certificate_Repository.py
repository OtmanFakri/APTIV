import calendar
from datetime import date
from typing import Optional

from sqlalchemy import select, func, and_, extract, distinct, case, or_

from fastapi import Depends
from sqlalchemy.orm import Session, joinedload
import logging

from Department.models.Department import Department
from certificate.models.certificate import Certificate
from certificate.schemas.CertificateSchema import EmployeeVisit
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

    async def get_certificates_by_month(self, year: int = None, month: int = None):
        query = (
            select(
                extract('month', Certificate.date_start).label("month"),
                extract('year', Certificate.date_start).label("year"),
                func.count(Certificate.id).label("certificates_nbr"),
                func.sum(Certificate.nbr_days).label("illness_days_nbr"),
                (func.sum(Certificate.nbr_days) / func.count(Certificate.id)).label("average_illness_days"),
                func.count(distinct(Employee.id)).label("headcount"),
                (func.count(Certificate.id) / func.count(distinct(Employee.id))).label("certificate_rate")
            )
            .select_from(Certificate)
            .join(Employee, Certificate.employee_id == Employee.id)  # Correctly applying join on the query object
            .group_by(extract('year', Certificate.date_start), extract('month', Certificate.date_start))
        )

        # Filter by year and month if provided
        if year and month:
            query = query.filter(
                extract('year', Certificate.date_start) == year,
                extract('month', Certificate.date_start) == month
            )
        elif year:
            query = query.filter(extract('year', Certificate.date_start) == year)
        elif month:
            query = query.filter(extract('month', Certificate.date_start) == month)

        result = await self.db.execute(query)
        return result.fetchall()

    async def get_certificates_by_category(self, category_name: str = None, year: int = None, month: int = None):
        # Construct the query
        query = (
            select(
                Department.category.label("category"),
                func.count(distinct(Employee.id)).label("headcount"),
                func.count(Certificate.id).label("certificates_nbr"),
                func.sum(Certificate.nbr_days).label("illness_days_nbr"),
                (func.count(Certificate.id) / func.count(distinct(Employee.id))).label("certificate_rate"),
                (func.sum(Certificate.nbr_days) / func.count(Certificate.id)).label("average_illness_days")
            )
            .select_from(Department)
            .join(Employee, Department.id == Employee.department_id)  # Assuming a direct relationship
            .join(Certificate,
                  Employee.id == Certificate.employee_id)  # Assuming Certificate has a foreign key to Employee
            .group_by(Department.category)
        )

        # Apply filter if category_name is provided
        if category_name:
            query = query.filter(Department.category == category_name)

        # Apply filters for year and month if provided
        if year:
            query = query.filter(extract('year', Certificate.date_start) == year)
        if month:
            query = query.filter(extract('month', Certificate.date_start) == month)

        # Execute the query
        result = await self.db.execute(query)
        return result.fetchall()



    async def fetch_employee_visits(self, year: int):
        # SQL query to count visits per month, separating null and non-null visits
        from sqlalchemy import func, case

        # Inside the fetch_employee_visits method in Certificate_Repository:
        stmt = select(
            func.extract('month', Employee.date_visit).label('month'),
            func.sum(case((Employee.date_visit != None, 1), else_=0)).label('count_visit_not_null'),
            func.sum(case((Employee.date_visit == None, 1), else_=0)).label('count_visit_null')
        ).where(
            func.extract('year', Employee.date_visit) == year
        ).group_by('month').order_by('month')

        # Execute and process as before

        result = await self.db.execute(stmt)
        visits_data = result.all()

        # Formulate the response based on the EmployeeVisit model
        response = [
            EmployeeVisit(
                month=calendar.month_name[int(month)],
                count_visit_not_null=visits_not_null,
                count_visit_null=visits_null
            )
            for month, visits_not_null, visits_null in visits_data
        ]
        return response

    async def get_certificates_by_validation_per_month(self, year: int, validation_status: Optional[str] = None):
        # Build the basic SQL statement
        stmt = (
            select(
                func.extract('month', Certificate.date).label('month'),
                func.count().label('count')
            )
            .where(
                func.extract('year', Certificate.date) == year
            )
            .group_by(func.extract('month', Certificate.date))
            .order_by(func.extract('month', Certificate.date))
        )

        # Conditionally add where clause for validation_status if provided
        if validation_status is not None:
            stmt = stmt.where(Certificate.validation == validation_status)

        results = await self.db.execute(stmt)
        return results.all()

    async def get_average_days_per_month(self, year: int):
        stmt = (
            select(
                func.extract('month', Certificate.date).label('month'),
                func.count().label('cert_count'),
                func.sum(Certificate.nbr_days).label('total_days'),
                case(
                    (func.count() == 0, 0),  # Change here: removed the list
                    else_=func.sum(Certificate.nbr_days) / func.count()
                ).label('average_days')
            )
            .where(func.extract('year', Certificate.date) == year)
            .group_by(func.extract('month', Certificate.date))
            .order_by(func.extract('month', Certificate.date))
        )
        results = await self.db.execute(stmt)
        return results.fetchall()
