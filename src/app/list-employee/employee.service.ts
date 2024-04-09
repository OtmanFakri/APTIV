import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ListEmployee} from "../interfaces/ListEmployee";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'http://127.0.0.1:8011/employee/filter';

  constructor(private http: HttpClient) {
  }

  filterEmployees(year: number, category: string | null, departmentName: string | null, managerId: number | null, page: number = 1, size: number = 50): Observable<ListEmployee> {
    const requestBody = {
      year,
      category,
      departmentName,
      managerId,
      page,
      size
    };

    let queryParams = new HttpParams()
      .set('year', year.toString())
      .set('page', page.toString())
      .set('size', size.toString());

    if (category !== null) {
      queryParams = queryParams.set('category', category);
    }
    if (departmentName !== null) {
      queryParams = queryParams.set('department_name', departmentName);
    }
    if (managerId !== null) {
      queryParams = queryParams.set('manager_id', managerId.toString());
    }

    const options = {
      headers: {'Content-Type': 'application/json'},
      params: queryParams // This sets the query params
    };

    return this.http.post<ListEmployee>(this.baseUrl, requestBody, options);
  }
}
