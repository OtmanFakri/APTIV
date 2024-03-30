from typing import Optional
from fastapi import APIRouter, Depends, HTTPException
from starlette import status

from employee.schemas.RegionSchema import RegionSchema
from employee.service.RegionService import RegionService
from fastapi_pagination import Page,paginate

AddressRouter = APIRouter(
    prefix="/address", tags=["address"]
)


@AddressRouter.get("/regions", )
def get_Regions(
        regionService: RegionService = Depends()
)->Page[RegionSchema]:
    regions = regionService.index()
    return paginate([{"name": region.name} for region in regions])
@AddressRouter.get("/region/{region}")
def getCityByRegion(region: str):
    return f"City by region {region}"