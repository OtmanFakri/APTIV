from pydantic import BaseModel

from employee.schemas.RegionSchema import RegionSchema


class CitySchema(BaseModel):
    id: int
    name: str
    class Config:
        orm_mode = True
        from_attributes = True
