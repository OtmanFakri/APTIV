from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from Department.models.Job import Job
from Department.schemas.JobSchema import JobSchema, PostJobSchema
from configs.Database import get_db_connection

JobRouter = APIRouter(
    prefix="/job", tags=["job"]
)

@JobRouter.get("/")
def get_jobs():
    return {"message": "Hello World"}

@JobRouter.get("/{job_id}")
def get_job(job_id: int, db: Session = Depends(get_db_connection)):
    return {"message": "Hello World"}

@JobRouter.post("/", response_model=JobSchema)
def create_job(job: PostJobSchema, db: Session = Depends(get_db_connection)):
    db_job = Job(**job.dict())
    db.add(db_job)
    db.commit()
    db.refresh(db_job)
    return JobSchema(
        id=db_job.id,
        name=db_job.name
    )

@JobRouter.put("/{job_id}", response_model=JobSchema)
def update_job(job_id: int, job: PostJobSchema, db: Session = Depends(get_db_connection)):
    db_job = db.query(Job).filter(Job.id == job_id).first()
    if db_job is None:
        raise HTTPException(status_code=404, detail="Job not found")
    for var, value in job.dict().items():
        setattr(db_job, var, value)
    db.commit()
    db.refresh(db_job)
    return JobSchema(
        id=db_job.id,
        name=db_job.name
    )

@JobRouter.delete("/{job_id}")
def delete_job(job_id: int, db: Session = Depends(get_db_connection)):
    db_job = db.query(Job).filter(Job.id == job_id).first()
    if db_job is None:
        raise HTTPException(status_code=404, detail="Job not found")
    db.delete(db_job)
    db.commit()
    return {"message": "Job deleted successfully"}