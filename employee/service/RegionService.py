from fastapi import Depends
from employee.repo.RegionRepo import RegionRepo


class RegionService:
    regionRepo: RegionRepo

    def __init__(self, regionRepo: RegionRepo = Depends()):
        self.regionRepo = regionRepo

    def index(self, pageSize: int = 100, startIndex: int = 0):
        return self.regionRepo.index(
             pageSize, startIndex
        )
