from fastapi import Depends
from employee.repo.RegionRepo import RegionRepo


class RegionService:
    regionRepo: RegionRepo

    def __init__(self, regionRepo: RegionRepo = Depends()):
        self.regionRepo = regionRepo

    def index(self):
        return self.regionRepo.index()
