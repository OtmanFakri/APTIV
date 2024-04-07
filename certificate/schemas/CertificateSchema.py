from pydantic import BaseModel, Field
from datetime import date
from typing import Optional

class CertificateSchema(BaseModel):
    id: Optional[int]
    doctor_name: str
    date: date
    date_start: date
    date_end: date
    date_entry: date
    validation: str = Field(..., max_length=255)
    date_planned: date
    nbr_expected: int
    nbr_days: int
    nbr_gap: int

    class Config:
        orm_mode = True
