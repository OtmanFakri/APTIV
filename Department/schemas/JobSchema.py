from pydantic import BaseModel

class JobSchema(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True
