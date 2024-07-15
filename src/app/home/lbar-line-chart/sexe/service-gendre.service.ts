import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {ExaminitionGendre} from "../../../interfaces/Analyse/CertificateAnalyseByDepertemt";
import {environment} from "../../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ServiceGendreService {
    private apiUrl = `${environment.apiUrl}/certificate`;
    Listdata = new BehaviorSubject<ExaminitionGendre[]>([]);

    constructor(private http: HttpClient) {
    }

    getCertificate_Gendre(year: number) {
        this.http.get<ExaminitionGendre[]>(`${this.apiUrl}/gendre/${year}`).pipe(
            tap(data => this.Listdata.next(data))
        ).subscribe();
    }


}
