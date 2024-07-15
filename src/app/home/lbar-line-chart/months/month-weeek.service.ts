import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ExaminitionGendre} from "../../../interfaces/Analyse/CertificateAnalyseByDepertemt";
import {BehaviorSubject, tap} from "rxjs";
import {CertificationWeekInterface} from "./CertificationWeekInterafce";
import {environment} from "../../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class MonthWeeekService {
    private apiUrl = `${environment.apiUrl}/certificate`;
    Listdata = new BehaviorSubject<CertificationWeekInterface[]>([]);

    constructor(private http: HttpClient) {
    }

    getCertificate_week(year: number,week:number) {
        this.http.get<CertificationWeekInterface[]>(`${this.apiUrl}/${year}/${week}`).pipe(
            tap(data => this.Listdata.next(data))
        ).subscribe();
    }
}
