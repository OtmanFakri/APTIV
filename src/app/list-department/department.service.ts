import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CategoryItemData} from "../interfaces/ListDeprtemnt";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private apiUrl = 'http://127.0.0.1:8011/department/';

  constructor(private http: HttpClient) { }

  getDepartments(): Observable<CategoryItemData[]> {
    return this.http.get<CategoryItemData[]>(this.apiUrl);
  }
}
