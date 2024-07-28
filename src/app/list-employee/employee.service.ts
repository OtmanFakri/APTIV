import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {
    City,
    FilterEmployee,
    ListEmployee,
    NewEmployee,
    RegionsResponse,
    SearchManger
} from "../interfaces/ListEmployee";
import {Observable} from "rxjs";
import {EmployeeUpdate} from "../profile/Interfaces";
import {environment} from "../../environments/environment";
import {AuthentificatinService} from "../auth/authentificatin.service";

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    private baseUrl = `${environment.apiUrl}/employee/filter`;

    constructor(private http: HttpClient,
                private userService: AuthentificatinService) {
    }

    updateEmployeeProfile(profile: EmployeeUpdate, employeeId: number): Observable<any> {
        const url = `${environment.apiUrl}/employee/${employeeId}`;
        return this.http.put(url, profile);
    }

    filterEmployees(filterEmployee: FilterEmployee,
                    page: number = 1,
                    size: number = 50): Observable<ListEmployee> {

        const requestBody = {
            department_ids: filterEmployee.department_ids,
            manger_ids: filterEmployee.manger_ids,
            job_ids: filterEmployee.job_ids,
            min_seniority_years: filterEmployee.min_seniority_years,
            page,
            size
        };

        console.log('Request Body:', requestBody);
        let queryParams = new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString());

        if (filterEmployee.min_seniority_years !== null && filterEmployee.min_seniority_years !== undefined) {
            queryParams = queryParams.set('min_seniority_years', filterEmployee.min_seniority_years.toString());
        }

        if (filterEmployee.sex) {
            queryParams = queryParams.set('sex', filterEmployee.sex);
        }

        if (filterEmployee.employee_id) {
            queryParams = queryParams.set('employee_id', filterEmployee.employee_id);
        }


        const options = {
            headers: {'Content-Type': 'application/json'},
            params: queryParams // This sets the query params
        };

        return this.http.post<ListEmployee>(this.baseUrl, requestBody, options);
    }


    filterEmployeesById(employee_id: number): Observable<ListEmployee> {
        return this.http.post<ListEmployee>(`${environment.apiUrl}/employee/filter?employee_id=${employee_id}`, {});
    }


    GETRegions(page: number = 1, size: number = 50): Observable<RegionsResponse> {
        let apiUrl = `${environment.apiUrl}/address/regions`;

        let params = new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString());

        return this.http.get<RegionsResponse>(`${apiUrl}`, {params});
    }

    GETCityByRegion(region_id: Number): Observable<City[]> {
        let apiUrl = `${environment.apiUrl}/address/region/${region_id}`;
        return this.http.get<City[]>(`${apiUrl}`);
    }

    GETSERACHMANGER(query: string): Observable<SearchManger[]> {
        let apiUrl = `${environment.apiUrl}`
        const params = new HttpParams().set('search', query);
        return this.http.post<SearchManger[]>(`${apiUrl}/employee/search?search=${query}`, {params});
    }

    EmployeesImport(file: File) {
        const apiUrl = `${environment.apiUrl}`;
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);

        return this.http.post(`${apiUrl}/exportations/employees`, formData);
    }

    EmployeeExportation() {
        const apiUrl = `${environment.apiUrl}`;
        return this.http.post(`${apiUrl}/employee/${this.UserId}/exportation`, {});
    }

    get UserId() {
        return this.userService.getLoggedUser().employee_id;
    }
}
