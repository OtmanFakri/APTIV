from fastapi import FastAPI
from sqlalchemy import event

from Department.models.Department import Department
from Department.models.Job import Job
from configs.BaseModel import init


app = FastAPI()
# Listen to the 'after_create' event on the Department table
try:
    event.listen(Job.__table__, 'after_create')
    event.listen(Department.__table__, 'after_create')
except Exception as e:
    print("An error occurred while attaching event listener:", e)
@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}

# Initialise Data Model Attributes
@app.on_event("startup")
def configure():
    init()