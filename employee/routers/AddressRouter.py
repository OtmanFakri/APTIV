from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException
from starlette import status

from employee.schemas.CitySchema import CitySchema
from employee.schemas.RegionSchema import RegionSchema
from employee.service.CItyService import CityService
from employee.service.RegionService import RegionService
from fastapi_pagination import Page, paginate

AddressRouter = APIRouter(
    prefix="/address", tags=["address"]
)


@AddressRouter.get("/regions", )
def get_Regions(
        regionService: RegionService = Depends()
) -> Page[RegionSchema]:
    regions = regionService.index()
    return paginate([{"name": region.name} for region in regions])


@AddressRouter.get("/region/{region_id}")
def getCityByRegion(
        region_id: int,
        cityService: CityService = Depends(),
)->List[CitySchema]:
    citys = cityService.get_City_by_Region(region_id)
    return [{"name": city.name} for city in citys]


@AddressRouter.get("/test")
def test():
    return {"message": "Hello, World!"}