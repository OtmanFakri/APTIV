import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../change-post/InterfaceChnagePost";
import {RecoveryJobs} from "./InterfacesRecoveryJob";

@Injectable({
    providedIn: 'root'
})
export class RecoveryJobService {

    private baseUrl = `${environment.apiUrl}`;

    constructor(private http: HttpClient) {
    }

    getRecoveryJobs(): Observable<Page<RecoveryJobs>> {
        return this.http.get<Page<RecoveryJobs>>(`${this.baseUrl}/recoverJob`);
    }


}
