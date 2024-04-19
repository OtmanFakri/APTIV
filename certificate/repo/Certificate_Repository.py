from fastapi import Depends
from sqlalchemy.orm import Session, joinedload
import logging

from certificate.models.certificate import Certificate
from certificate.models.doctor import Doctor
from configs.Database import get_db_connection
from employee.models.Employee import Employee



# Configure logging
logging.basicConfig(level=logging.DEBUG, filename='debug.log', filemode='w',
                    format='%(asctime)s - %(levelname)s - %(message)s')
class CertificateRepository:
    db: Session

    def __init__(self, db: Session = Depends(get_db_connection)) -> None:
        self.db = db

    def _apply_doctor_filter(self, query, doctor_id):
        if doctor_id:
            query = query.filter(Certificate.id == doctor_id)
        return query

    def _apply_manager_filter(self, query, manager_id):
        if manager_id:
            query = query.join(Employee, Certificate.employee).join(Employee.manager, aliased=True).filter(Employee.id == manager_id)
        return query

    def _apply_date_range(self, query, date_attr, from_date, to_date):
        if from_date and to_date:
            query = query.filter(getattr(Certificate, date_attr).between(from_date, to_date))
        return query

    def _apply_nbr_days(self, query, nbr_days):
        if nbr_days:
            query = query.filter(Certificate.nbr_days == nbr_days)
        return query

    def _apply_validation(self, query, validation):
        if validation:
            query = query.filter(Certificate.validation == validation)
        return query

    def filter_certificates(self, doctor_id: int = None, manager_id: int = None,
                            from_date: str = None, to_date: str = None,
                            nbr_days: int = None, validation: str = None):

        query = self.db.query(Certificate)

        # Filter by doctor_id if provided
        if doctor_id is not None:
            query = query.filter(Certificate.doctor_id == doctor_id)

        # Filter by manager_id if provided
        if manager_id is not None:
            query = query.join(Employee, Certificate.employee_id == Employee.id) \
                .filter(Employee.manager_id == manager_id)

        # Filter by date range if both from_date and to_date are provided
        if from_date and to_date:
            query = query.filter(Certificate.date.between(from_date, to_date))

        # Filter by number of days if provided
        if nbr_days is not None:
            query = query.filter(Certificate.nbr_days == nbr_days)

        # Filter by validation status if provided
        if validation is not None:
            query = query.filter(Certificate.validation == validation)

        return query.all()


