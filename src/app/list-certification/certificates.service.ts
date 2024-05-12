import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {CertificateEmployee} from "../interfaces/CertificateEmployee";
import {CertificationsRequestInterface} from "../interfaces/ListCertificationInterface";

@Injectable({
  providedIn: 'root'
})
export class CertificatesService {

  private baseUrl = 'http://127.0.0.1:8011/employee'; // Base URL for the API

  constructor(private http: HttpClient) { }
  getCertificates(employee_id: number, page: number = 1, size: number = 50): Observable<any> {
    // Prepare HTTP parameters
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    // Construct the URL
    const url = `${this.baseUrl}/${employee_id}/certificates`;

    // Make the GET request
    return this.http.get<CertificateEmployee>(url, { params });
  }


  createCertification(employee_id: number, certificate: CertificationsRequestInterface): Observable<any> {
    // Construct the URL with the employee ID
    const url = `${this.baseUrl}/${employee_id}/certificate`;

    // Make the POST request
    return this.http.post(url, certificate);
  }
}
