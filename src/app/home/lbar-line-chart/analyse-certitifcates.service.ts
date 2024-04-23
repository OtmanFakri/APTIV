import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
    CertificateAnalyseByDepertemt,
    CertificateAnalyseTotal
} from '../../interfaces/Analyse/CertificateAnalyseByDepertemt';
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AnalyseCertitifcatesService {

    private apiUrl = 'http://127.0.0.1:8011/certificate/by_department';


    constructor(private http: HttpClient) {
    }

    getCertificateAnalyseByDepertemt(dep_id: number, year: number, month: number) {

        const parms = {
            //department_id: dep_id.toString(),
            year: year.toString(),
            month: month.toString()
        }
        return this.http.get(this.apiUrl, {params: parms});
    }



    calculateTotals(data: CertificateAnalyseByDepertemt[]): CertificateAnalyseTotal {
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
