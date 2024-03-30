from pydantic import BaseModel


class RegionSchema(BaseModel):
    name: str