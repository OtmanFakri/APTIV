import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MonthlyCounterVisits} from "../../interfaces/Analyse/ExaminiationInterface";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ConterVisiteService {

  private baseUrl = `${environment.apiUrl}/certificate`;

  constructor(private http: HttpClient) { }

  getMonthlyCounterVisits(year:number): Observable<MonthlyCounterVisits[]> {
    return this.http.post<MonthlyCounterVisits[]>(`${this.baseUrl}/monthly-counter-visits/${year}`,{});
  }


}
