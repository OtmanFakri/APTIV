from pydantic import BaseModel


class RegionSchema(BaseModel):
    id: int
    name: str
    class Config:
        orm_mode = True
        from_attributes = True
