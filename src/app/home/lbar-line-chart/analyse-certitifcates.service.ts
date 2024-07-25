import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
    CertificateAnalyseByDepertemt, CertificateAnalyseByYear, CertificateAnalyseData,
    CertificateAnalyseTotal, ExaminitionGendre
} from '../../interfaces/Analyse/CertificateAnalyseByDepertemt';
import {Observable} from "rxjs";
import {ValidationHj} from "../../interfaces/Analyse/ValidationHj";
import {Examiniation, NbExaminiation} from "../../interfaces/Analyse/ExaminiationInterface";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AnalyseCertitifcatesService {

    private apiUrl = `${environment.apiUrl}/certificate`;

    constructor(private http: HttpClient) {
    }


    getCertificateAnalyseByYear(year: number, month: number) {

        const parms = {
            year: year.toString(),
            //month: month.toString()
        }
        return this.http.get(this.apiUrl + '/by_month', {params: parms});
    }


    getCertificateAnalyseByHj(year: number, status: string, is_duplicated: boolean = false): Observable<ValidationHj[]> {
        const url = `${this.apiUrl}/by_validation?year=${year}&validation_status=${status}&is_duplicated=${is_duplicated}`;
        return this.http.get<ValidationHj[]>(url);
    }


    calculateTotals(data: CertificateAnalyseData[]): CertificateAnalyseTotal {
        let totalCertificatesNbr = 0;
        let totalIllnessDaysNbr = 0; // Changed property name
        let totalHeadcount = 0;
        let totalCertificateRate = 0;
        let totalAverageIllnessDays = 0;

        data.forEach(item => {
            totalCertificatesNbr += item.certificates_nbr;
            totalIllnessDaysNbr += item.illness_days_nbr; // Corrected property name
            totalHeadcount += item.headcount;
        });

        // Calculate totalCertificateRate and totalAverageIllnessDays
        if (totalHeadcount !== 0) {
            totalCertificateRate = totalCertificatesNbr / totalHeadcount;
        }
        if (totalCertificatesNbr !== 0) {
            totalAverageIllnessDays = totalIllnessDaysNbr / totalCertificatesNbr; // Corrected formula
        }

        // Format numbers to two decimal places
        totalCertificateRate = +totalCertificateRate.toFixed(2);
        totalAverageIllnessDays = +totalAverageIllnessDays.toFixed(2);

        return {
            total_certificates_nbr: totalCertificatesNbr,
            total_illness_todays_nbr: totalIllnessDaysNbr,
            total_headcount: totalHeadcount,
            total_certificate_rate: totalCertificateRate,
            total_average_illness_days: totalAverageIllnessDays
        };
    }


}
