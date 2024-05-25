import os
from collections import defaultdict
from typing import List, Optional

from fastapi import Depends, HTTPException, UploadFile, File
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import and_, delete, update, extract
from sqlalchemy.future import select
from datetime import date, timedelta

from sqlalchemy.orm import selectinload, joinedload

from Department.models.Department import Department
from Department.models.Job import Job
from certificate.models.certificate import Certificate
from certificate.schemas.CertificateSchema import PostCertificateSchema
from certificate.service.Doctor_Service import DoctorService
from configs.Database import get_db_connection_async
from employee.models.Employee import Employee
from employee.schemas.EmployeeSchema import EmployeeInfoRequest


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
                           start_year=None,
                           min_seniority_years=None, manger_ids=None, max_seniority_years=None):
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
        if max_seniority_years is not None:
            latest_start_year = date.today().year - max_seniority_years
            query = query.filter(extract('year', Employee.date_start) >= latest_start_year)
        if start_year:
            query = query.filter(extract('year', Employee.date_start) == start_year)

        result = await self.db.execute(query)
        return result.scalars().all()

    async def create_certificate(self, employee_id: int, certificate_info: PostCertificateSchema):
        async with self.db.begin():  # Ensure the transaction context is active
            employee = await self.db.get(Employee, employee_id)

            if not employee:
                raise HTTPException(status_code=404, detail="Employee not found")

            # Get_or_create the doctor
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
        await self.db.refresh(certificate)  # Refresh to get the latest state if needed

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

    async def update_certificate(self, employee_id: int, certificate_id: int,
                                 update_data: PostCertificateSchema) -> bool:
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
                # logging.warning(f"No certificate found with employee_id={employee_id} and certificate_id={certificate_id} to update.")
                return False
        except SQLAlchemyError as e:
            # Log the database error
            # logging.error(f"Database error occurred while updating: {str(e)}")
            raise RuntimeError("Failed to update certification due to a database error.") from e
        except Exception as e:
            # Handle unexpected errors
            # logging.error(f"Unexpected error occurred while updating certification: {str(e)}")
            raise RuntimeError("An unexpected error occurred while updating certifications.") from e

    async def save_avatar(self, employee_id: int, profile_picture: UploadFile):
        avatar_dir = "avatars"
        if not os.path.exists(avatar_dir):
            os.makedirs(avatar_dir)

        file_extension = os.path.splitext(profile_picture.filename)[1]
        file_location = f"{avatar_dir}/{employee_id}{file_extension}"

        with open(file_location, "wb+") as file_object:
            file_object.write(profile_picture.file.read())
        print(f"Avatar saved 1 at: {file_location}")
        return file_location

    async def create_employee(self, employee_info: EmployeeInfoRequest, uploaded_file: UploadFile = File(None)):
        employee_info.convert_dates()
        try:
            employee = Employee(
                department_id=employee_info.department_id,
                job_id=employee_info.job_id,
                manager_id=employee_info.manager_id,
                first_name=employee_info.first_name,
                last_name=employee_info.last_name,
                cin=employee_info.cin,
                cnss=employee_info.cnss,
                phone_number=employee_info.phone_number,
                birth_date=employee_info.birth_date,
                Sexe=employee_info.Sexe,
                city_id=employee_info.city_id,
                date_start=employee_info.date_start,
                date_hiring=employee_info.date_hiring,
                date_visit=employee_info.date_visit if employee_info.date_visit else None,
                profile_picture=None,
                date_end=employee_info.date_end if employee_info.date_end else None,
            )

            self.db.add(employee)
            await self.db.flush()  # Use flush here to send to the DB without committing.
            if uploaded_file:
                profile_picture_path = await self.save_avatar(employee.id, uploaded_file)
                employee.profile_picture = profile_picture_path
                await self.db.flush()  # Use flush here to send the updated employee to the DB.

            await self.db.refresh(employee)  # Refresh to get the latest state if needed.
            await self.db.commit()  # Commit once at the end.

            return employee
        except Exception as e:
            await self.db.rollback()
            raise HTTPException(status_code=400, detail=str(e))

    async def update_employee(self, employee_id: int, employee_info: EmployeeInfoRequest,
                              uploaded_file: UploadFile = File(None)):

        employee_info.convert_dates()
        result = await self.db.execute(select(Employee).where(Employee.id == employee_id))
        employee = result.scalars().first()

        print("employeeUpdate :: ", employee)
        if not employee:
            raise HTTPException(status_code=404, detail="Employee not found")

        # Update employee fields
        employee.department_id = employee_info.department_id
        employee.job_id = employee_info.job_id
        employee.manager_id = employee_info.manager_id
        employee.first_name = employee_info.first_name
        employee.last_name = employee_info.last_name
        employee.cin = employee_info.cin
        employee.cnss = employee_info.cnss
        employee.phone_number = employee_info.phone_number
        employee.birth_date = employee_info.birth_date
        employee.Sexe = employee_info.Sexe
        employee.city_id = employee_info.city_id
        employee.date_start = employee_info.date_start
        employee.date_hiring = employee_info.date_hiring
        employee.date_visit = employee_info.date_visit if employee_info.date_visit else employee.date_visit
        employee.date_end = employee_info.date_end if employee_info.date_end else employee.date_end

        if uploaded_file:
            # Save the new profile picture and update the employee record
            profile_picture_path = await self.save_avatar(employee.id, uploaded_file)
            employee.profile_picture = profile_picture_path

        try:
            await self.db.flush()  # Use flush to send changes to the DB without committing
            await self.db.refresh(employee)  # Refresh to get the latest state if needed
            await self.db.commit()  # Commit once at the end
            return employee
        except Exception as e:
            await self.db.rollback()
            raise HTTPException(status_code=400, detail=str(e))

    async def SearchManager(self, manger_name):
        query = select(Employee).filter(Employee.first_name.ilike(f"%{manger_name}%"))
        result = await self.db.execute(query)
        return result.scalars().all()

    async def employee_visits(self, current_year: int = None):
        # Fetch employees with the calculated max_seniority_years
        employees = await self.get_employee(start_year=current_year)

        # Separate employees based on date_visit being null or not
        null_visits = [employee for employee in employees if employee.date_visit is None]
        not_null_visits = [employee for employee in employees if employee.date_visit is not None]

        # Organize the visits by month
        visits_by_month = defaultdict(lambda: {"null": 0, "not_null": 0})
        for employee in null_visits:
            visits_by_month[employee.date_start.month]["null"] += 1
        for employee in not_null_visits:
            visits_by_month[employee.date_visit.month]["not_null"] += 1

        # Calculate the percentages
        for month, data in visits_by_month.items():
            total_visits = data["null"] + data["not_null"]
            data["CM"] = total_visits
            data["not_null_percentage"] = (data["not_null"] / total_visits * 100) if total_visits > 0 else 0

        return visits_by_month

    async def get_certificates_by_employee(self, employee_id, year: int):
        query = (
            select(Certificate)
            .join(Employee)
            .options(joinedload(Certificate.employee))
            .options(selectinload(Certificate.doctor))
            .where(Employee.id == employee_id)
            .where(extract('year', Certificate.date) == year)

        )
        result = await self.db.execute(query)
        certificates = result.scalars().all()
        if not certificates:
            raise HTTPException(status_code=404, detail="No certificates found for this employee")
        return certificates

    async def calculate_certificate_stats(self, employee_id: int, year: int):
        certificates = await self.get_certificates_by_employee(employee_id, year)
        certificates_nbr = len(certificates)
        illness_days_nbr = sum(cert.nbr_days for cert in certificates)
        average_illness_days = illness_days_nbr / certificates_nbr if certificates_nbr > 0 else 0
        nb_day_abs = sum(cert.nb_day_abs for cert in certificates)

        return [
            {
                "certificates_nbr": certificates_nbr,
                "illness_days_nbr": illness_days_nbr,
                "average_illness_days": average_illness_days,
                "nb_day_abs": abs(nb_day_abs)
            }
        ]

    async def update_date_planned(self, employee_id: int, certificate_id: int, save_current_date: bool):
        query = select(Certificate).where(Certificate.id == certificate_id, Certificate.employee_id == employee_id)
        result = await self.db.execute(query)
        certificate = result.scalar_one_or_none()

        if certificate is None:
            raise HTTPException(status_code=404, detail="Certificate not found")

        if save_current_date:
            certificate.date_planned = date.today()
        else:
            certificate.date_planned = None

        await self.db.commit()
        return {"message": "date_planned updated successfully"}