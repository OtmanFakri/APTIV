import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, shareReplay, throwError} from "rxjs";
import {CategoryItemData, CreateDepartment} from "../interfaces/ListDeprtemnt";
import {CategoryInfo} from "../profile/Interfaces";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private apiUrl = 'http://127.0.0.1:8011/department/';
  private cachedDepartments: Observable<CategoryItemData[]> | null = null;

  constructor(private http: HttpClient) {
  }

  getDepartmentsIndex(): Observable<CategoryInfo[]> {
    return this.http.get<CategoryInfo[]>(this.apiUrl + 'index');
  }

  getDepartments(): Observable<CategoryItemData[]> {
    // If cachedDepartments is not null, return the cached observable
    if (this.cachedDepartments) {
      return this.cachedDepartments;
    }
    // Otherwise, fetch the data from the API
    this.cachedDepartments = this.http.get<CategoryItemData[]>(this.apiUrl).pipe(
      shareReplay(1),
      catchError((error) => {
        console.error('Error fetching departments:', error);
        this.cachedDepartments = null;  // Reset cache on error
        return throwError(() => new Error('Error fetching departments'));
      })
    );
    return this.cachedDepartments;
  }

  POSTDepartment(createDepartment: CreateDepartment) {
    return this.http.post(this.apiUrl, createDepartment);
  }

  UPDATEDepartment(id: number, createDepartment: CreateDepartment) {
    return this.http.put(this.apiUrl + id + '/', createDepartment);
  }

  clearCache() {
    this.cachedDepartments = null;
  }

}
