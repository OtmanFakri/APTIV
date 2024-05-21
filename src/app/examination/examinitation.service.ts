import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {POSTExamination} from "../interfaces/ExaminitionInterface";
import {Observable} from "rxjs";
import {EmployeeExaminition} from "./InterfacesExaminitaion";

@Injectable({
  providedIn: 'root'
})
export class ExaminitationService {


  constructor(private http: HttpClient) {
  }

  // URL to the endpoint - adjust this URL to your actual endpoint
  private apiUrl = 'http://127.0.0.1:8011';

  NewConsulation(PostExamination: POSTExamination): Observable<POSTExamination> {
    return this.http.post<POSTExamination>(`${this.apiUrl}/consultation/`, PostExamination);
  }

  GetConsulation(): Observable<any> {
    return this.http.get(`${this.apiUrl}/consultation/`)
  }

  GetEmployeeExamination(id_Examination: number, associated: boolean,page=1): Observable<EmployeeExaminition> {
    return this.http.post<EmployeeExaminition>(`${this.apiUrl}/consultation/examination/${id_Examination}/employee?associated=${associated}&page=${page}`, {});
  }

  PostEmployeeExamination(id_Examination: number, id_Employee: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/consultation/examination/${id_Examination}/employee/${id_Employee}`, {});
  }
  DeleteEmployeeExamination(id_Examination: number, id_Employee: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/consultation/examination/${id_Examination}/employee/${id_Employee}`, {});
  }

}
