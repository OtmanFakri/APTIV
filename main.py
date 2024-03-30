from fastapi import FastAPI
from fastapi_pagination import add_pagination
from sqlalchemy import event

from Department.models.Department import Department
from Department.models.Job import Job
from configs.BaseModel import init
from employee.models.City import City
from employee.models.Region import Region
from employee.routers.AddressRouter import AddressRouter

app = FastAPI()
# Listen to the 'after_create' event on the Department table
try:
    event.listen(Job.__table__, 'after_create')
    event.listen(Department.__table__, 'after_create')
    event.listen(City.__table__, 'after_create')
    event.listen(Region.__table__, 'after_create')
except Exception as e:
    print("An error occurred while attaching event listener:", e)
@app.get("/")
async def root():
    return {"message": "Hello World"}



# Add Routers
app.include_router(AddressRouter)
# Initialise Data Model Attributes
@app.on_event("startup")
def configure():
    init()


add_pagination(app)  # important! add pagination to your app
