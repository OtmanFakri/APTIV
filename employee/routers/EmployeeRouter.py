from fastapi import APIRouter, Depends
from starlette import status

from employee.schemas.EmployeeSchema import EmployeeInfo
from employee.service.EmployeeService import EmployeeService

EmployeeRouter = APIRouter(
    prefix="/employee", tags=["employee"]
)

@EmployeeRouter.post("/create",
                     status_code=status.HTTP_200_OK)
def create_employee(
        employee_info: EmployeeInfo,
        employeeService: EmployeeService = Depends()
):
    try:
        employeeService.create(employee_info)
        return {"success": True}
    except Exception as e:
        return {"success": False, "error": str(e)}