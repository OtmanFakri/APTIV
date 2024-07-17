import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {
    InterfaceRankingMedicament,
    InterfaceRankingMedicament_Depar, InterfaceRankingMedicament_gendre,
    InterfaceRankingMedicamentParams
} from "./InterfaceRankingMedicament";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RakingService {

    private apiUrl = `${environment.apiUrl}`;

    constructor(private http: HttpClient) {
    }


    getRankingCategortMedicaments(params: InterfaceRankingMedicamentParams): Observable<InterfaceRankingMedicament> {
        let queryParams = new HttpParams().set('year', params.year.toString());

        if (params.month) {
            queryParams = queryParams.set('month', params.month.toString());
        }

        if (params.day) {
            queryParams = queryParams.set('day', params.day.toString());
        }
        return this.http.get<InterfaceRankingMedicament>(`${this.apiUrl}/soin/kpisfrequency_of_specific_medicaments_by_category`, {params: queryParams});
    }

    getRankingDepartmentMedicaments(params: InterfaceRankingMedicamentParams): Observable<InterfaceRankingMedicament_Depar> {
        let queryParams = new HttpParams().set('year', params.year.toString());

        if (params.month) {
            queryParams = queryParams.set('month', params.month.toString());
        }

        if (params.day) {
            queryParams = queryParams.set('day', params.day.toString());
        }
        return this.http.get<InterfaceRankingMedicament_Depar>(`${this.apiUrl}/soin/kpisfrequency_of_specific_medicaments_by_department`, {params: queryParams});
    }

    getRankingGendreMedicaments(params: InterfaceRankingMedicamentParams): Observable<InterfaceRankingMedicament_gendre> {
        let queryParams = new HttpParams().set('year', params.year.toString());

        if (params.month) {
            queryParams = queryParams.set('month', params.month.toString());
        }

        if (params.day) {
            queryParams = queryParams.set('day', params.day.toString());
        }
        return this.http.get<InterfaceRankingMedicament_gendre>(`${this.apiUrl}/soin/kpisfrequency_of_specific_medicaments_by_gendre`, {params: queryParams});
    }

}
