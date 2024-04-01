from pydantic import BaseModel


class RegionSchema(BaseModel):
    name: str
    class Config:
        orm_mode = True
        from_attributes = True
