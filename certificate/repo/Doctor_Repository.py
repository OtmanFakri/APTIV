from fastapi import Depends
from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from certificate.models.doctor import Doctor
from configs.Database import get_db_connection_async
from sqlalchemy.ext.asyncio import AsyncSession


class DoctorRepository:
    db: AsyncSession

    def __init__(
            self,
            db: AsyncSession = Depends(get_db_connection_async)
    ) -> None:
        self.db = db

    async def get_or_create(self, name: str, specialty: str):
        result = await self.db.execute(
            select(Doctor).filter_by(name=name, specialty=specialty)
        )
        doctor = result.scalars().first()

        if doctor:
            return doctor
        else:
            new_doctor = Doctor(name=name, specialty=specialty)
            self.db.add(new_doctor)
            await self.db.commit()  # commit needs to be awaited
            await self.db.refresh(new_doctor)  # Refresh to get the new doctor with ID
        return new_doctor
