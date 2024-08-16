import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthentificatinService} from "../../authentificatin.service";
import {environment as env_produ} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {DataExport} from "./InterfaceExportation";
import {Page} from "../../../change-post/InterfaceChnagePost";

@Injectable({
    providedIn: 'root'
})
export class ExportationService {
    private apiUrl = `${env_produ.apiUrl}`;

    constructor(private http: HttpClient,
                private authentificatinService: AuthentificatinService) {
    }

    getExportations(page: number = 1): Observable<Page<DataExport>> {
        return this.http.get<Page<DataExport>>(`${this.apiUrl}/exportations/${this.user_id}?size=10&page=${page}`);
    }

    get user_id(): number | null {
        return this.authentificatinService.getLoggedUser().employee_id;
    }
}
