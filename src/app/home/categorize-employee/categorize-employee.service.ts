import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {CategorizeEmployeeInterface} from "./CategorizeEmployeeServiceInterface";

@Injectable({
  providedIn: 'root'
})
export class CategorizeEmployeeService {
  private apiUrl = 'http://127.0.0.1:8011/employee';
  initialCategorizedEmployee: CategorizeEmployeeInterface = {
    red: 0,
    yellow: 0,
    green: 0,
    red_percentage: 0,
    yellow_percentage: 0,
    green_percentage: 0
  };
  categorizedEmployees = new BehaviorSubject<CategorizeEmployeeInterface>(this.initialCategorizedEmployee);

  constructor(private http: HttpClient) {}

  getCategorizedEmployees(year: number): void {
    this.http.post<CategorizeEmployeeInterface>(`${this.apiUrl}/categorize/${year}`,{}).subscribe(
      (data) => this.categorizedEmployees.next(data),
      (error) => console.error('Error fetching data', error)
    );
  }
}
