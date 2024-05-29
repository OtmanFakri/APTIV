import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {CertificateEmployee} from "../interfaces/CertificateEmployee";
import {
  CertificationAnalysEmployee,
  CertificationsRequestInterface,
  CertificationsResponseInterface
} from "../interfaces/ListCertificationInterface";

@Injectable({
  providedIn: 'root'
})
export class CertificatesService {

  private baseUrl = 'http://127.0.0.1:8011/employee'; // Base URL for the API

  constructor(private http: HttpClient) {
  }

  getCertificates(employee_id: number, page: number = 1, size: number = 50, year: number): Observable<any> {
    // Prepare HTTP parameters
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    // Construct the URL
    const url = `${this.baseUrl}/${employee_id}/certificates/${year}`;

    // Make the GET request
    return this.http.get<CertificateEmployee>(url, {params});
  }


  createCertification(employee_id: number, certificate: CertificationsRequestInterface): Observable<any> {
    // Construct the URL with the employee ID
    const url = `${this.baseUrl}/${employee_id}/certificate`;

    // Make the POST request
    return this.http.post(url, certificate);
  }

  DeleteCertification(employee_id: number, certificate_ids: number[]) {
    // Construct the URL with the employee ID
    const url = `${this.baseUrl}/${employee_id}/certificate`;

    // Make the DELETE request
    return this.http.delete(url, {body: certificate_ids});

  }

  updateCertificate(employeeId: number, certificateId: number, data: CertificationsRequestInterface) {
    // Construct the URL with template literals
    const url = `${this.baseUrl}/${employeeId}/certificate/${certificateId}`;

    // Make the HTTP PUT request
    return this.http.put(url, data);
  }

  analyseEMployeeCertficaes(employeeId: number, year: number): Observable<CertificationAnalysEmployee[]> {
    return this.http.get<CertificationAnalysEmployee[]>(`${this.baseUrl}/${employeeId}/certificates/${year}/analyse`);
  }

  FilterCertificates(filterParams: any, page: number = 1): Observable<CertificationsResponseInterface> {
    return this.http.post<CertificationsResponseInterface>(`http://127.0.0.1:8011/certificate/filter?page=${page}`, filterParams);
  }

  employeecategorized(employeeId: number, year: number): Observable<any> {

    return this.http.get<any>(`${this.baseUrl}/categorize/${employeeId}/${year}`);
  }

  exportationKPI(year: number): Observable<any> {
    const base_url = 'http://127.0.0.1:8011/certificate/collect-certificate-data';
    return this.http.post<any>(`${base_url}/${year}`, {});
  }

}
