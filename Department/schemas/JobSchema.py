from typing import Optional

from pydantic import BaseModel

class JobSchema(BaseModel):
    id: Optional[int]
    name: str
    class Config:
        orm_mode = True
        from_attributes = True
