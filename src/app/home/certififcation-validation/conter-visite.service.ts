import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MonthlyCounterVisits} from "../../interfaces/Analyse/ExaminiationInterface";

@Injectable({
  providedIn: 'root'
})
export class ConterVisiteService {

  private baseUrl = 'http://127.0.0.1:8011/certificate';

  constructor(private http: HttpClient) { }

  getMonthlyCounterVisits(year:number): Observable<MonthlyCounterVisits[]> {
    return this.http.post<MonthlyCounterVisits[]>(`${this.baseUrl}/monthly-counter-visits/${year}`,{});
  }


}
