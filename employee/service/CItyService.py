from fastapi import Depends
from employee.repo.CityRepo import CityRepo



class CityService:
    cityRepository: CityRepo

    def __init__(
        self, cityRepository: CityRepo = Depends()
    ):
        self.cityRepository = cityRepository

    def get_City_by_Region(self, region_id: int):
        return self.cityRepository.get_City_by_Region(region_id)