from fastapi import APIRouter, Depends
from starlette import status

from Department.schemas.DepartmentSchema import DepartmentSchema
from employee.schemas.CitySchema import CitySchema
from employee.schemas.EmployeeSchema import EmployeeInfo, EmployeeSchema
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


@EmployeeRouter.get("/{employee_id}", response_model=EmployeeSchema)
def get_employee(
        employee_id: int,
        employeeService: EmployeeService = Depends()
):
    try:
        fetched_employee = employeeService.get(employee_id)

        employee_info = EmployeeInfo(
            id=fetched_employee.id,
            category=fetched_employee.category,
            department_id=fetched_employee.department_id,
            first_name=fetched_employee.first_name,
            last_name=fetched_employee.last_name,
            cin=fetched_employee.cin,
            cnss=fetched_employee.cnss,
            phone_number=fetched_employee.phone_number,
            birth_date=str(fetched_employee.birth_date),  # Convert date to string
            Sexe=fetched_employee.Sexe,
            city_id=fetched_employee.city_id,
            date_start=str(fetched_employee.date_start),  # Convert date to string
            date_hiring=str(fetched_employee.date_hiring),  # Convert date to string
            date_visit=str(fetched_employee.date_visit),  # Convert date to string
            manager_id=fetched_employee.manager_id if fetched_employee.manager_id else None
        )

        city = CitySchema(
            name=fetched_employee.city.name) if fetched_employee.city else None  # Provide the city name if exists
        department = DepartmentSchema(
            name=fetched_employee.department.name if fetched_employee.department else None,
            # Provide the department name if exists
            jobs=[{"name": job.name, "department_id": job.department_id} for job in
                  fetched_employee.department.jobs] if fetched_employee.department else []
            # Provide the job name if exists
        ) if fetched_employee.department else None

        return {
            "info": employee_info,
            "city": city,
            "department": department
        }
    except Exception as e:
        return {"success": False, "error": str(e)}
