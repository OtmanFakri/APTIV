import calendar
from datetime import date, datetime
from typing import Optional

from fastapi import Depends

from certificate.repo.Certificate_Repository import CertificateRepository


class CertificateService:
    certificationRepository: CertificateRepository

    def __init__(
            self, certificationRepository: CertificateRepository = Depends()
    ) -> None:
        self.certificationRepository = certificationRepository

    async def get_filtered_certificates(self, doctor_id: Optional[int] = None,
                                        manager_id: Optional[int] = None,
                                        from_date: Optional[date] = None,
                                        to_date: Optional[date] = None,
                                        nbr_days: Optional[int] = None,
                                        validation: Optional[str] = None,
                                        year: Optional[int] = None,
                                        include_today: bool = False,
                                        exclude_date_planned: bool = False):
        certificates = await self.certificationRepository.filter_certificates(
            doctor_id=doctor_id,
            manager_id=manager_id,
            from_date=from_date,
            to_date=to_date,
            nbr_days=nbr_days,
            validation=validation,
            year=year,
            include_today=include_today,
            exclude_date_planned=exclude_date_planned
        )
        return certificates

    async def get_department_data(self, department_id: int = None, year: int = None, month: int = None):
        return await self.certificationRepository.get_certificates_by_department(department_id,
                                                                                 year,
                                                                                 month)

    async def get_department_month(self, year: int = None, month: int = None):
        return await self.certificationRepository.get_certificates_by_month(
            year,
            month)

    async def get_certificates_by_category(self, category: str = None, year: int = None, month: int = None):
        return await self.certificationRepository.get_certificates_by_category(category, year, month)

    async def get_certificates_by_doctor(self, doctor_id: int = None, year: int = None, month: int = None):
        pass

    async def get_certificates_nb_validation(self, year: int, validation_status: str):
        return await self.certificationRepository.get_certificates_by_validation_per_month(year=year,
                                                                                           validation_status=validation_status)

    async def get_average_days_per_month(self, year: int):
        return await self.certificationRepository.get_average_days_per_month(year=year)

    async def get_certificates_by_validation_itt(self, year: int):
        # Fetch ITT and all certificates
        certificates_itt = await self.certificationRepository.get_certificates_by_validation_per_month(year=year,
                                                                                                       validation_status="ITT")
        certificates_all = await self.certificationRepository.get_certificates_by_validation_per_month(year=year)

        month_names = {i: calendar.month_name[i] for i in range(1, 13)}

        # Convert tuples to dictionaries with month as the key
        itt_dict = {month_names[int(cert[0])]: cert[1] for cert in certificates_itt}
        all_dict = {month_names[int(cert[0])]: cert[1] for cert in certificates_all}

        # List to hold the combined results
        combined_results = []

        # Iterate through all months from the all_dict
        for month, count_all in all_dict.items():
            count_itt = itt_dict.get(month, 0)  # Get ITT count for the month, default to 0 if not found
            itt_rate = (count_itt / count_all) if count_all != 0 else 0  # Calculate ITT rate, handle division by zero

            # Add the combined data for each month
            combined_results.append({
                "month": month,
                "count_itt": count_itt,
                "count_all": count_all,
                "itt_rate": itt_rate
            })

        return combined_results

    async def analyze_certificates_by_gender_and_year(self, year: int):
        return await self.certificationRepository.analyze_certificates_by_gender_and_year(year=year)

    async def analyze_certificates_by_week_and_year(self, year: int, week: int):
        return await self.certificationRepository.analyze_certificates_by_week_and_year(year=year, week=week)
