from pydantic import BaseModel


class JobSchema(BaseModel):
    name: str