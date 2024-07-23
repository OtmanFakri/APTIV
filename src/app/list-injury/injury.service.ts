import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {CreateOrUpdateRequest, InjuryQueryParams, listInjury} from "./InterfacesInjury";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class InjuryService {
    private baseUrl = `${environment.apiUrl}`;

    constructor(private http: HttpClient) {
    }

    getInjuries(params: InjuryQueryParams): Observable<listInjury> {
        let httpParams = new HttpParams();

        if (params.employee_id) {
            httpParams = httpParams.set('employee_id', params.employee_id.toString());
        }
        if (params.department_id) {
            httpParams = httpParams.set('department_id', params.department_id.toString());
        }
        if (params.shift) {
            httpParams = httpParams.set('shift', params.shift);
        }
        if (params.day) {
            httpParams = httpParams.set('day', params.day.toString());
        }
        if (params.month) {
            httpParams = httpParams.set('month', params.month.toString());
        }
        if (params.year) {
            httpParams = httpParams.set('year', params.year.toString());
        }
        if (params.page) {
            httpParams = httpParams.set('page', params.page.toString());
        } else {
            httpParams = httpParams.set('page', '1');
        }
        if (params.size) {
            httpParams = httpParams.set('size', params.size.toString());
        } else {
            httpParams = httpParams.set('size', '50');
        }

        return this.http.get<any>(`${this.baseUrl}/injury/`, {params: httpParams});
    }

    CreateInjuries(params: CreateOrUpdateRequest) {
        return this.http.post(`${this.baseUrl}/injury/create`, params);
    }

    UpdateInjuries(params: CreateOrUpdateRequest, id: number) {
        console.log('Updating injury with id:', id)
        return this.http.put(`${this.baseUrl}/injury/update/${id}`, params);
    }
    DeleteInjuries(id: number) {
        return this.http.delete(`${this.baseUrl}/injury/delete/${id}`);
    }
}
