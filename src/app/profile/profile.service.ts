import {Injectable} from '@angular/core';
import {PersonInformation, ProfessionalInformation} from "./profile.module";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {ProfileEmployee} from "../interfaces/profileEmployee";
import {NewEmployee} from "../interfaces/ListEmployee";

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    private baseUrl = 'http://127.0.0.1:8011/employee';

    constructor(private http: HttpClient) {
    }

    getEmployeeProfile(employeeId: number): Observable<ProfileEmployee> {
        const url = `${this.baseUrl}/${employeeId}`;
        return this.http.get<ProfileEmployee>(url);
    }

    // Observable source
    private employeeProfileSource = new BehaviorSubject<ProfileEmployee | null>(null);
    // Observable stream
    employeeProfile$ = this.employeeProfileSource.asObservable();

    // Method to update employee profile
    updateEmployeeProfile(profile: ProfileEmployee | null) {
        this.employeeProfileSource.next(profile);
    }

    deleteEmployee(emp_id:number){
      return this.http.delete(`${this.baseUrl}/${emp_id}`)
    }

    addProfile(employee: NewEmployee) {
        const formData: FormData = new FormData();
        formData.append('uploaded_file', employee.avatar || '');
        let params = new HttpParams()
            .set('id', employee.id?.toString() || '')
            .set('department_id', employee.department_id.toString())
            .set('job_id', employee.job_id.toString())
            .set('manager_id', employee.manager_id?.toString() || '')
            .set('first_name', employee.first_name)
            .set('last_name', employee.last_name)
            .set('cin', employee.cin)
            .set('cnss', employee.cnss)
            .set('phone_number', employee.phone_number.toString())
            .set('birth_date', employee.birth_date)
            .set('Sexe', employee.Sexe)
            .set('city_id', employee.city_id.toString())
            .set('date_start', employee.date_start)
            .set('date_hiring', employee.date_hiring)
            .set('date_visit', employee.date_visit || '')
            .set('date_end', employee.date_end || '');
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');
      return this.http.post<any>(`${this.baseUrl}/create`, formData, { params });
    }
}
