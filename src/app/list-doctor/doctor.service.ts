import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {
    GetdoctorInterface,
    ListdoctorInterface, SpecialtyDistributionByCategory, SpecialtyDistributionByDepartment,
    SpecialtyDistributionBygendre
} from "../interfaces/ListdoctorInterface";
import {CertificationsResponseInterface} from "../interfaces/ListCertificationInterface";

@Injectable({
    providedIn: 'root'
})
export class DoctorService {

    private apiUrl = 'http://127.0.0.1:8011/doctor/';

    constructor(private http: HttpClient) {
    }


    getDoctors(page: number = 1): Observable<GetdoctorInterface> {
        return this.http.get<GetdoctorInterface>(`${this.apiUrl}?page=${page}`);
    }

    getCertifications(doctor_id: number, page: number = 1, size: number = 50): Observable<CertificationsResponseInterface> {
        const url = `${this.apiUrl}${doctor_id}/certifications?page=${page}&size=${size}`;
        return this.http.get<CertificationsResponseInterface>(url);
    }

    searchDoctors(query: string): Observable<ListdoctorInterface[]> {
        return this.http.get<ListdoctorInterface[]>(`${this.apiUrl}search_doctors`, {params: {query}});
    }

    searchSpecialties(query: string): Observable<ListdoctorInterface[]> {
        return this.http.get<ListdoctorInterface[]>(`${this.apiUrl}search_specialty`, {params: {query}});
    }

    specialty_distribution_gendre(year: number): Observable<SpecialtyDistributionBygendre[]> {
        return this.http.get<SpecialtyDistributionBygendre[]>(`${this.apiUrl}specialty_distribution/${year}/by_gender`);
    }

    specialty_distribution_department(year: number): Observable<SpecialtyDistributionByDepartment[]> {
        return this.http.get<SpecialtyDistributionByDepartment[]>(`${this.apiUrl}specialty_distribution/${year}/by_department`);
    }

    specialty_distribution_category(year: number): Observable<SpecialtyDistributionByCategory[]> {
        return this.http.get<SpecialtyDistributionByCategory[]>(`${this.apiUrl}specialty_distribution/${year}/by_category`);
    }

}
