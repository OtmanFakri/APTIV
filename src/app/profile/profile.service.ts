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
        console.log("employee : ", employee)

        let params = new HttpParams();

        // Helper function to add param only if value is not null or undefined
        const addParam = (key: string, value: any) => {
            if (value != null) {
                params = params.set(key, value.toString());
            }
        };

        // Add parameters only if they have a value
        addParam('department_id', employee.department_id);
        addParam('job_id', employee.job_id);
        addParam('manager_id', employee.manager_id);
        addParam('first_name', employee.first_name);
        addParam('last_name', employee.last_name);
        addParam('N_Workday', employee.N_Workday);
        addParam('cin', employee.cin);
        addParam('cnss', employee.cnss);
        addParam('phone_number', employee.phone_number);
        addParam('Sexe', employee.Sexe);
        addParam('city_id', employee.city_id);

        // Handle date fields
        if (employee.birth_date) {
            addParam('birth_date', this.formatDate(employee.birth_date));
        }
        addParam('date_start', this.formatDate(employee.date_start));
        addParam('date_hiring', this.formatDate(employee.date_hiring));
        if (employee.date_visit) {
            addParam('date_visit', this.formatDate(employee.date_visit));
        }

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.post<any>(`${this.baseUrl}/create`, formData, {params, headers});
    }
    private formatDate(date: Date | string): string {
        if (date instanceof Date) {
            return this.toYYYYMMDD(date);
        } else if (typeof date === 'string') {
            return this.toYYYYMMDD(new Date(date));
        }
        throw new Error('Invalid date format');
    }

    private toYYYYMMDD(date: Date): string {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
}
