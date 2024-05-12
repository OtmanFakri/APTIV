import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ListdoctorInterface} from "../interfaces/ListdoctorInterface";
import {CertificationsResponseInterface} from "../interfaces/ListCertificationInterface";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private apiUrl = 'http://127.0.0.1:8011/doctor/';
  constructor(private http: HttpClient) {}


  getDoctors(): Observable<{items: ListdoctorInterface[], total: number, page: number, size: number, pages: number}> {
    return this.http.get<{items: ListdoctorInterface[], total: number, page: number, size: number, pages: number}>(this.apiUrl);
  }

  getCertifications(doctor_id: number, page: number = 1, size: number = 50): Observable<CertificationsResponseInterface> {
    const url = `${this.apiUrl}${doctor_id}/certifications?page=${page}&size=${size}`;
    return this.http.get<CertificationsResponseInterface>(url);
  }

  searchDoctors(query: string): Observable<ListdoctorInterface[]> {
    return this.http.get<ListdoctorInterface[]>(`${this.apiUrl}search_doctors`, { params: { query } });
  }
  searchSpecialties(query: string): Observable<ListdoctorInterface[]> {
    return this.http.get<ListdoctorInterface[]>(`${this.apiUrl}search_specialty`, { params: { query } });
  }


}
