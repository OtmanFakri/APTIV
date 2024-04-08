from pydantic import BaseModel


class DoctorSchema(BaseModel):
    id: int
    name: str
    specialty: str

    class Config:
        orm_mode = True
        from_attributes = True