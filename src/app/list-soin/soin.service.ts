import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {CreateSoin, Last10, ReadSoinInterface} from "./InterfaceSoin";
import {Observable} from "rxjs";

interface ReadSoinParams {
  page?: number;
  size?: number;
  year?: number | null;
  month?: number | null;
  day?: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class SoinService {

  private apiUrl = 'http://127.0.0.1:8011/soins';

  constructor(private http: HttpClient) {
  }

  CreateSoin(soinData: CreateSoin): Observable<any> {
    return this.http.post(`${this.apiUrl}`, soinData);
  }

  ReadSoin(queryParams: ReadSoinParams = {}): Observable<ReadSoinInterface> {
    console.log("ReadSoin : ", queryParams)
    return this.http.post<ReadSoinInterface>(`${this.apiUrl}/filter`, {
      year: queryParams.year,
      month: queryParams.month,
      day: queryParams.day,
    });
  }

  Last10soinAndDig(): Observable<Last10> {
    return this.http.post<Last10>(`${this.apiUrl}/last-10-soins-and-diagnostics`, {});
  }

  UpdateSoin(id: number, soinData: CreateSoin): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, soinData);
  }
}
