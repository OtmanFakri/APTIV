from fastapi import Depends
from sqlalchemy.orm import Session
from configs.Database import get_db_connection
from employee.models.City import City


class CityRepo:
    db: Session

    def __init__(
        self, db: Session = Depends(get_db_connection)
    ) -> None:
        self.db = db

    def get_City_by_Region(self, region_id: int):
        return self.db.query(City).filter(City.region_id == region_id).all()
