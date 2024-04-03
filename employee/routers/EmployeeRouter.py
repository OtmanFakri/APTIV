from typing import Optional

from fastapi import APIRouter, Depends
from starlette import status
from fastapi_pagination import Page, paginate

from employee.schemas.EmployeeSchema import EmployeeInfoRequest, EmployeeInfoResponse, \
    EmployeeSchemaResponse, CategoryEnum
from employee.service.EmployeeService import EmployeeService

EmployeeRouter = APIRouter(
    prefix="/employee", tags=["employee"]
)


@EmployeeRouter.post("/create",
                     status_code=status.HTTP_200_OK)
def create_employee(
        employee_info: EmployeeInfoRequest,
        employeeService: EmployeeService = Depends()
):
    try:
        employeeService.create(employee_info)
        return {"success": True}
    except Exception as e:
        return {"success": False, "error": str(e)}


@EmployeeRouter.get("/{employee_id}")
def get_employee(
        employee_id: int,
        employeeService: EmployeeService = Depends()
):
    try:
        fetched_employee = employeeService.get(employee_id)

        if fetched_employee:
            # Convert fetched_employee dictionary to EmployeeInfoResponse
            #employee_response = EmployeeInfoResponse(**fetched_employee)

            #
            return fetched_employee
        else:
            return {"error": "Employee not found"}

    except Exception as e:
        # Handle exceptions as per your application's error handling strategy
        return {"error": str(e)}

@EmployeeRouter.delete("/{employee_id}")
def delete_employee(
        employee_id: int,
        employeeService: EmployeeService = Depends()
):
    try:
        employeeService.delete(employee_id)
        return {"success": True}
    except Exception as e:
        return {"success": False, "error": str(e)}

@EmployeeRouter.put("/{employee_id}")
def update_employee(
        employee_id: int,
        employee_info: EmployeeInfoRequest,
        employeeService: EmployeeService = Depends()
):
    try:
        employeeService.update(employee_id, employee_info)
        return {"success": True}
    except Exception as e:
        return {"success": False, "error": str(e)}






@EmployeeRouter.post("/filter")
def Filter_Employee(year: int,
                    category: Optional[str] = None,
                    department_name: Optional[str] = None,
                    manager_id: Optional[int] = None,
                    employeeService: EmployeeService = Depends()) -> Page[EmployeeInfoResponse] :
    return paginate(employeeService.Filter_Employee(year, category, department_name, manager_id))


@EmployeeRouter.post("/test")
def test():
    return {"message": "Hello, World!"}
