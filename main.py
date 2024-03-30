from fastapi import FastAPI
from pydantic import BaseModel

from configs.BaseModel import init

app = FastAPI()

class Region(BaseModel):
    name: str

class City(BaseModel):
    name: str
    region: Region

class Job(BaseModel):
    name: str

class Department(BaseModel):
    name: str
    job: Job

class EmployeeInfo(BaseModel):
    city: City

class Employee(BaseModel):
    info: EmployeeInfo
    department: Department


@app.get("/")
async def root():
    region = Region(name="Test Region")
    city = City(name="Test City", region=region)
    job = Job(name="Test Job")
    department = Department(name="Test Department", job=job)
    employee_info = EmployeeInfo(city=city)
    employee = Employee(info=employee_info, department=department)

    print(employee.json())

    return employee


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}



# Initialise Data Model Attributes
init()