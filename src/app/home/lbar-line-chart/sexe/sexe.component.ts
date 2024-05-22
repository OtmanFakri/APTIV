import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import Chart, {ChartConfiguration, ChartData} from "chart.js/auto";
import {AnalyseCertitifcatesService} from "../analyse-certitifcates.service";
import {CertificateAnalyseTotal, ExaminitionGendre} from "../../../interfaces/Analyse/CertificateAnalyseByDepertemt";
import {ServiceGendreService} from "./service-gendre.service";


@Component({
  selector: 'app-sexe',
  standalone: true,
  imports: [],
  templateUrl: './sexe.component.html',
})
export class SexeComponent implements OnInit {
    data: ExaminitionGendre[] = [];
    @ViewChild('sexeCanvas') sexeCanvas!: ElementRef<HTMLCanvasElement>;
    chart: Chart | null = null;

    constructor(private certificateService: ServiceGendreService) {}

    ngOnInit(): void {
        const currentYear = new Date().getFullYear();

        this.certificateService.getCertificate_Gendre(currentYear); // Example year
        this.certificateService.Listdata.subscribe(
            (response: ExaminitionGendre[]) => {
                this.data = response;
                if (this.chart) {
                    this.updateChart(this.data);
                } else {
                    this.createChart(this.data);
                }
            },
            (error) => {
                console.error('Error fetching data', error);
            }
        );
    }

    private createChart(data: ExaminitionGendre[]): void {
        const chartData = this.formatChartData(data);
        const config = {
            type: 'bar',
            data: chartData,
            options: this.getChartOptions()
        };
        this.chart = new Chart(this.sexeCanvas.nativeElement, config);
    }

    private updateChart(data: ExaminitionGendre[]): void {
        if (this.chart) {
            this.chart.data = this.formatChartData(data);
            this.chart.update();
        }
    }

    private formatChartData(data: ExaminitionGendre[]): any {
        return {
            labels: data.map(d => d.gender),
            datasets: [
                {
                    type: 'bar',
                    label: 'Number of Certificates',
                    data: data.map(d => d.certificates_nbr),
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    type: 'bar',
                    label: 'Total Illness Days',
                    data: data.map(d => d.illness_days_nbr),
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                {
                    type: 'line',
                    label: 'Certificate Rate (%)',
                    data: data.map(d => d.certificate_rate),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: false
                },
                {
                    type: 'bar',
                    label: 'Average Illness Days',
                    data: data.map(d => d.average_illness_days),
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1
                }
            ]
        };
    }

    private getChartOptions(): any {
        return {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        };
    }
}
