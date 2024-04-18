from pydantic import BaseModel, Field, validator, root_validator
from datetime import date, timedelta, datetime
from typing import Optional

class PostCertificateSchema(BaseModel):
    doctor_id: int
    date: date
    date_start: date
    date_end: date
    validation: str = Field(..., max_length=255)
    date_planned: date
    nbr_days: int = Field(...)
    nbr_expected: int = Field(0, alias="nbr_expected_days")
    nbr_gap: int = Field(0, alias="nbr_gap_days")
    date_entry: date = None

    @root_validator(pre=True)
    def calculate_fields(cls, values):
        date_start_str = values.get('date_start')
        date_end_str = values.get('date_end')
        nbr_days = values.get('nbr_days', 0)

        # Convert date_start and date_end from string to date if necessary
        if isinstance(date_start_str, str) and isinstance(date_end_str, str):
            try:
                date_start = datetime.strptime(date_start_str, '%Y-%m-%d').date()
                date_end = datetime.strptime(date_end_str, '%Y-%m-%d').date()
            except ValueError:
                raise ValueError("Incorrect data format, should be YYYY-MM-DD")
        else:
            date_start = date_start_str
            date_end = date_end_str

        if date_start and date_end:
            nbr_expected = (date_end - date_start).days
            values['nbr_expected_days'] = nbr_expected
            nbr_gap =  nbr_days - nbr_expected
            values['nbr_gap_days'] = nbr_gap
            values['date_entry'] = date_start + timedelta(days=nbr_days)

        return values

    class Config:
        allow_population_by_field_name = True
class GetCertificateSchema(BaseModel):
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
        from_attributes = True


class CertificateByDoctorSchema(BaseModel):
    id: Optional[int]
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
        from_attributes = True


