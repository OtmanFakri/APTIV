from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from starlette import status

from employee.service.RegionService import RegionService

AddressRouter = APIRouter(
    prefix="/address", tags=["address"]
)


@AddressRouter.get("/regions", )
def get_Regions(
        pageSize: Optional[int] = 100,
        startIndex: Optional[int] = 0,
        regionService: RegionService = Depends()
):
    if pageSize < 1 or startIndex < 0:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid pageSize or startIndex")

    regions = regionService.index(pageSize, startIndex)
    return [{"name": region.name} for region in regions]
@AddressRouter.get("/region/{region}")
def getCityByRegion(region: str):
    return f"City by region {region}"