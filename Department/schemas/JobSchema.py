from pydantic import BaseModel

class JobSchema(BaseModel):
    name: str

    class Config:
        orm_mode = True