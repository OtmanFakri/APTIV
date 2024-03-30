from pydantic import BaseModel

from employee.schemas.RegionSchema import RegionSchema


class CitySchema(BaseModel):
    name: str
