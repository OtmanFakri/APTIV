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
            employee_response = EmployeeInfoResponse(**fetched_employee)

            # Convert string dates to date objects
            employee_response.convert_dates()

            return employee_response.dict()
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

@EmployeeRouter.get("/year/{datehire}")
def list_BY_Hiring_Date(
        datehire: int,
        employeeService: EmployeeService = Depends()
) -> Page[EmployeeInfoResponse]:

    return paginate(employeeService.list_BY_Hiring_Date(datehire))
