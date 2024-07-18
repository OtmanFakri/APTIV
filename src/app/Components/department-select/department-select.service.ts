import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";

import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DepartmentRequestBase} from "./InterafceDepatment";

@Injectable({
    providedIn: 'root'
})
export class DepartmentSelectService {

    private apiUrl = `${environment.apiUrl}`;

    constructor(private http: HttpClient) {
    }

    get_Department_byCategory(catgory: string): Observable<DepartmentRequestBase> {
        return this.http.post<DepartmentRequestBase>(`${this.apiUrl}/department/get_departments_by_category?category=${catgory}`, {});
    }
}
