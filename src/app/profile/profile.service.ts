import {Injectable} from '@angular/core';
import {PersonInformation, ProfessionalInformation} from "./profile.module";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, of, tap} from "rxjs";
import {ProfileEmployee} from "../interfaces/profileEmployee";
import {NewEmployee} from "../interfaces/ListEmployee";
import {EmployeeDetails, EmployeeUpdate} from "./Interfaces";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    private baseUrl = `${environment.apiUrl}/employee`;

    private employeeProfileSource = new BehaviorSubject<EmployeeDetails | null>(null);
    employeeProfile$ = this.employeeProfileSource.asObservable();

    constructor(private http: HttpClient) {
    }

    loadEmployeeProfile(employeeId: number): void {  // Default ID for testing
        this.getEmployeeProfile(employeeId).pipe(
            tap(profile => console.log("Fetched profile:", profile)),
            catchError(error => {
                console.error("Error fetching employee profile:", error);
                return of(null);
            })
        ).subscribe(profile => {
            this.employeeProfileSource.next(profile);
        });
    }

    getEmployeeProfile(employeeId: number): Observable<EmployeeDetails> {
        const url = `${this.baseUrl}/${employeeId}`;
        return this.http.get<EmployeeDetails>(url);
    }



    deleteEmployee(empId: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${empId}`);
    }

    addProfile(employee: NewEmployee): Observable<any> {
        const formData: FormData = new FormData();
        if (employee.avatar) {
            formData.append('uploaded_file', employee.avatar);
        }

        const params = new HttpParams()
            .set('id', employee.id?.toString() ?? '')
            .set('department_id', employee.department_id.toString())
            .set('job_id', employee.job_id.toString())
            .set('manager_id', employee.manager_id?.toString() ?? '')
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
            .set('date_visit', employee.date_visit ?? '')
            .set('date_end', employee.date_end ?? '');

        const headers = new HttpHeaders();
        // Note: You don't need to set Content-Type for FormData, browser will set it automatically

        return this.http.post<any>(`${this.baseUrl}/create`, formData, {params, headers});
    }
}
