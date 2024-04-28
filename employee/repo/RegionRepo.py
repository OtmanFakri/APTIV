
from fastapi import Depends
from sqlalchemy.orm import Session
from configs.Database import get_db_connection
from employee.models.Region import Region

class RegionRepo:
    db: Session

    def __init__(
        self, db: Session = Depends(get_db_connection)
    ) -> None:
        self.db = db

    def index(self):
        query = self.db.query(Region)
        return query
