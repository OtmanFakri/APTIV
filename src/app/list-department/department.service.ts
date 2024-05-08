import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, shareReplay, throwError} from "rxjs";
import {CategoryItemData} from "../interfaces/ListDeprtemnt";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private apiUrl = 'http://127.0.0.1:8011/department/';

  constructor(private http: HttpClient) { }

  getDepartments(): Observable<CategoryItemData[]> {
    return this.http.get<CategoryItemData[]>(this.apiUrl).pipe(
      shareReplay(1),
      catchError((error) => {
        console.error('Error fetching departments:', error);
        return throwError(() => new Error('Error fetching departments'));
      })
    );
  }

}
