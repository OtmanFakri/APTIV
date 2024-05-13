from typing import List

from fastapi import Depends, HTTPException
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import and_, delete, update
from sqlalchemy.future import select
from datetime import date, timedelta

from Department.models.Department import Department
from Department.models.Job import Job
from certificate.models.certificate import Certificate
from certificate.schemas.CertificateSchema import PostCertificateSchema
from certificate.service.Doctor_Service import DoctorService
from configs.Database import get_db_connection_async
from employee.models.Employee import Employee


class EmployeeRepo:
    db: AsyncSession
    doctorService: DoctorService

    def __init__(
            self,
            doctorService: DoctorService = Depends(),
            db: AsyncSession = Depends(get_db_connection_async)
    ) -> None:
        self.db = db
        self.DoctorService = doctorService

    async def get_employee(self, employee_id=None, sex=None,
                           department_ids=None, job_ids=None, category=None,
                           min_seniority_years=None, manger_ids=None):
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

    async def create_certificate(self, employee_id: int, certificate_info: PostCertificateSchema):
        employee = await self.db.get(Employee, employee_id)

        if not employee:
            raise HTTPException(status_code=404, detail="Employee not found")

        #Get_or_create the doctor
        doctor = await self.DoctorService.get_or_create_doctor(
            name=certificate_info.doctor.name,
            specialty=certificate_info.doctor.specialty
        )

        # Create the certificate object
        certificate = Certificate(
            doctor_id=doctor.id,
            date=certificate_info.date,
            date_start=certificate_info.date_start,
            date_end=certificate_info.date_end,
            date_entry=certificate_info.date_entry,
            validation=certificate_info.validation,
            date_planned=certificate_info.date_planned,
            nbr_expected=certificate_info.nbr_expected,
            nbr_days=certificate_info.nbr_days,
            nbr_gap=certificate_info.nbr_gap,
            employee_id=employee_id
        )

        self.db.add(certificate)
        await self.db.flush()  # Flush to get the generated ID
        await self.db.commit()  # Commit the changes

        return certificate

    async def delete_certification_by_employee_id(self, employee_id: int, certificate_id: List[int]) -> bool:
        try:
            # Execute the deletion query
            await self.db.execute(delete(Certificate).where(
                and_(Certificate.employee_id == employee_id, Certificate.id.in_(certificate_id))))
            await self.db.commit()
            return True
        except SQLAlchemyError as e:
            # Log the error and re-raise as a custom exception or handle it as needed
            raise RuntimeError("Failed to delete certification due to a database error.") from e
        except Exception as e:
            # Handle unexpected errors
            raise RuntimeError("An unexpected error occurred while deleting certifications.") from e

    async def update_certificate(self, employee_id: int, certificate_id: int, update_data: PostCertificateSchema) -> bool:
        try:
            # Execute the update query

            doctor = await self.DoctorService.get_or_create_doctor(
                name=update_data.doctor.name,
                specialty=update_data.doctor.specialty
            )
            query = (
                update(Certificate)
                .where(
                    and_(
                        Certificate.employee_id == employee_id,
                        Certificate.id == certificate_id
                    )
                )
                .values(
                    doctor_id=doctor.id,
                    date=update_data.date,
                    date_start=update_data.date_start,
                    date_end=update_data.date_end,
                    date_entry=update_data.date_entry,
                    validation=update_data.validation,
                    date_planned=update_data.date_planned,
                    nbr_expected=update_data.nbr_expected,
                    nbr_days=update_data.nbr_days,
                    nbr_gap=update_data.nbr_gap,
                    employee_id=employee_id
                )
            )
            result = await self.db.execute(query)
            await self.db.commit()

            # Check if any row is actually updated
            if result.rowcount > 0:
                return True
            else:
                #logging.warning(f"No certificate found with employee_id={employee_id} and certificate_id={certificate_id} to update.")
                return False
        except SQLAlchemyError as e:
            # Log the database error
            #logging.error(f"Database error occurred while updating: {str(e)}")
            raise RuntimeError("Failed to update certification due to a database error.") from e
        except Exception as e:
            # Handle unexpected errors
            #logging.error(f"Unexpected error occurred while updating certification: {str(e)}")
            raise RuntimeError("An unexpected error occurred while updating certifications.") from e
