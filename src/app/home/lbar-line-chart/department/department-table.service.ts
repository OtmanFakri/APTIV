import {Injectable} from '@angular/core';
import {BehaviorSubject, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CertificateAnalyseByDepertemt} from "../../../interfaces/Analyse/CertificateAnalyseByDepertemt";

@Injectable({
    providedIn: 'root'
})
export class DepartmentTableService {
    private apiUrl = 'http://127.0.0.1:8011/certificate';
    Listdata = new BehaviorSubject<CertificateAnalyseByDepertemt[]>([]);

    constructor(private http: HttpClient) {
    }

    getCertificate_deep(year: number, month: number): void {
        this.http.get<CertificateAnalyseByDepertemt[]>(`${this.apiUrl}/by_department?year=${year}&month=${month}`).subscribe(
            (data) => this.Listdata.next(data),
            (error) => console.error('Error fetching data', error)
        );
    }
}
