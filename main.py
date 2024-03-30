from fastapi import FastAPI
from sqlalchemy import event

from Department.Seeder_data import initialize_table
from Department.models.Job import Job
from Department.models.Department import Department
from configs.BaseModel import init, EntityMeta
from configs.Database import Engine


# Listen to the 'after_create' event on the Department table
try:
    event.listen(Job.__table__, 'after_create', initialize_table)
    event.listen(Department.__table__, 'after_create', initialize_table)
except Exception as e:
    print("An error occurred while attaching event listener:", e)

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}

# This will create the DB schema and trigger the "after_create" event
@app.on_event("startup")
def configure():
    EntityMeta.metadata.create_all(bind=Engine)

# Initialise Data Model Attributes
init()

