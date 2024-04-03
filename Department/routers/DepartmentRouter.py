from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload

from Department.models.Department import Department
from Department.models.Job import Job
from Department.schemas.DepartmentSchema import DepartmentCreate, DepartmentUpdate, DepartmentBase
from configs.Database import get_db_connection

DepartmentRouter = APIRouter(
    prefix="/department", tags=["department"]
)



@DepartmentRouter.get("/", response_model=List[DepartmentBase] )
def get_departments(db: Session = Depends(get_db_connection)):
    return db.query(Department).all()


@DepartmentRouter.get("/{department_id}", )
def get_department(department_id: int, db: Session = Depends(get_db_connection)):
    department = db.query(Department).options(joinedload(Department.jobs)).filter(Department.id == department_id).first()
    if department is None:
        raise HTTPException(status_code=404, detail="Department not found")
    return department

@DepartmentRouter.post("/", )
def create_department(department: DepartmentCreate, db: Session = Depends(get_db_connection)):
    db_department = Department(**department.dict())
    db.add(db_department)
    db.commit()
    db.refresh(db_department)
    return db_department

@DepartmentRouter.put("/{department_id}", )
def update_department(department_id: int, department: DepartmentUpdate, db: Session = Depends(get_db_connection)):
    db_department = db.query(Department).filter(Department.id == department_id).first()
    if db_department is None:
        raise HTTPException(status_code=404, detail="Department not found")
    for key, value in department.dict().items():
        setattr(db_department, key, value)
    db.commit()
    db.refresh(db_department)
    return db_department

@DepartmentRouter.delete("/{department_id}", )
def delete_department(department_id: int, db: Session = Depends(get_db_connection)):
    db_department = db.query(Department).filter(Department.id == department_id).first()
    if db_department is None:
        raise HTTPException(status_code=404, detail="Department not found")
    db.delete(db_department)
    db.commit()
    return db_department


@DepartmentRouter.put("/{department_id}/jobs/{job_id}")
def associate_job_to_department(department_id: int, job_id: int, db: Session = Depends(get_db_connection)):
    db_department = get_department(department_id, db)
    if db_department is None:
        raise HTTPException(status_code=404, detail="Department not found")

    db_job = db.query(Job).filter(Job.id == job_id).first()
    if db_job is None:
        raise HTTPException(status_code=404, detail="Job not found")

    # Associate the job to the department
    db_department.jobs.append(db_job)
    db.commit()
    return {"message": f"Job {job_id} associated with Department {department_id} successfully"}
