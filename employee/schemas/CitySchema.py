from pydantic import BaseModel

from employee.schemas.RegionSchema import RegionSchema


class CitySchema(BaseModel):
    name: str
    class Config:
        orm_mode = True
        from_attributes = True
