from pydantic import BaseModel


class CitySchema(BaseModel):
    name: str
    region: RegionSchema