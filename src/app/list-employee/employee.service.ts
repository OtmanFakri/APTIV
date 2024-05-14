import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {City, FilterEmployee, ListEmployee, RegionsResponse, SearchManger} from "../interfaces/ListEmployee";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'http://127.0.0.1:8011/employee/filter';

  constructor(private http: HttpClient) {
  }

  filterEmployees(filterEmployee: FilterEmployee,
                  page: number = 1,
                  size: number = 50): Observable<ListEmployee> {

    const requestBody = {
      department_ids: filterEmployee.department_ids,
      manger_ids: filterEmployee.manger_ids,
      job_ids: filterEmployee.job_ids,
      page,
      size
    };

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

  GETRegions(page: number = 1, size: number = 50): Observable<RegionsResponse> {
    let apiUrl = 'http://127.0.0.1:8011/address/regions';

    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<RegionsResponse>(`${apiUrl}`, {params});
  }
  GETCityByRegion(region_id:Number): Observable<City[]> {
    let apiUrl = `http://127.0.0.1:8011/address/region/${region_id}`;
    return this.http.get<City[]>(`${apiUrl}`);
  }
  GETSERACHMANGER(query:string):Observable<SearchManger[]> {
    let apiUrl = 'http://127.0.0.1:8011'
    const params = new HttpParams().set('search', query);
    return this.http.post<SearchManger[]>(`${apiUrl}/employee/search?search=${query}`, { params });
  }
}