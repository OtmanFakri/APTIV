import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {InjuryInterfcae, InjuryQueryParams} from "./InjuryInterfcae";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class InjuryService {

    private apiUrl = `${environment.apiUrl}/injuries`; // Replace with your actual API URL

    constructor(private http: HttpClient) {
    }

    getInjuries(queryParams: InjuryQueryParams): Observable<InjuryInterfcae> {
        let params = new HttpParams();

        if (queryParams.employeeId !== undefined) {
            params = params.append('employee_id', queryParams.employeeId.toString());
        }
        if (queryParams.departmentId !== undefined) {
            params = params.append('department_id', queryParams.departmentId.toString());
        }
        if (queryParams.shift) {
            params = params.append('shift', queryParams.shift);
        }
        if (queryParams.day !== undefined) {
            params = params.append('day', queryParams.day.toString());
        }
        if (queryParams.month !== undefined) {
            params = params.append('month', queryParams.month.toString());
        }
        if (queryParams.year !== undefined) {
            params = params.append('year', queryParams.year.toString());
        }
        if (queryParams.page !== undefined) {
            params = params.append('page', queryParams.page.toString());
        }
        if (queryParams.size !== undefined) {
            params = params.append('size', queryParams.size.toString());
        }
        return this.http.get<InjuryInterfcae>(this.apiUrl, {params});
    }
}
