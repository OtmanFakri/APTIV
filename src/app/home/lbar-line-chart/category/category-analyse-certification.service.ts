import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {
  CertificateAnalyseByCategory,
  CertificateAnalyseByDepertemt
} from "../../../interfaces/Analyse/CertificateAnalyseByDepertemt";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoryAnalyseCertificationService {

  private apiUrl = `${environment.apiUrl}/certificate`;
  categoryListData = new BehaviorSubject<CertificateAnalyseByCategory[]>([]);

  constructor(private http: HttpClient) {
  }

  getCertificateAnalyseByCategory(year: number, month: number): void {
    const params = {year: year.toString(), month: month.toString()};
    this.http.get<CertificateAnalyseByCategory[]>(`${this.apiUrl}/by_category`, {params}).subscribe(
      (data) => this.categoryListData.next(data),
      (error) => console.error('Error fetching data', error)
    );
  }
  getCertificateAnalyseByCategoryYear(year: number): void {
    const params = {year: year.toString()};
    this.http.get<CertificateAnalyseByCategory[]>(`${this.apiUrl}/by_category`, {params}).subscribe(
      (data) => this.categoryListData.next(data),
      (error) => console.error('Error fetching data', error)
    );
  }
}
