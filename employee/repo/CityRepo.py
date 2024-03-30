from fastapi import Depends
from sqlalchemy.orm import Session

from configs.Database import get_db_connection


class CityRepo:
    db: Session

    def __init__(
        self, db: Session = Depends(get_db_connection)
    ) -> None:
        self.db = db

    def get_City_by_Region(self, region: str):
        return f"City by region {region}"