import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Item} from "../../../../interfaces/CertificateEmployee";
import Chart from "chart.js/auto";
import {CertificatesService} from "../../../../list-certification/certificates.service";
import {CertificationAnalysEmployee} from "../../../../interfaces/ListCertificationInterface";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-show-certification',
    standalone: true,
  imports: [
    NgIf
  ],
    templateUrl: './show-certification.component.html',
})
export class ShowCertificationComponent implements OnInit {
  @Input() date?: Date;
  @Input() employee_id?: number ;
  @ViewChild('doughnutCanvas', { static: true }) doughnutCanvas!: ElementRef<HTMLCanvasElement>;
  chart: Chart | null = null;
  data: CertificationAnalysEmployee[] = [];

  constructor(private certificatesService: CertificatesService) {}

  ngOnInit(): void {
    if (this.date && this.employee_id) {
      this.fetchData(this.date.getFullYear());
    }
  }

  private fetchData(year: number): void {
    if (this.employee_id) {
      this.certificatesService.analyseEMployeeCertficaes(this.employee_id, year).subscribe(
          (response: CertificationAnalysEmployee[]) => {
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
  }

  private createChart(data: CertificationAnalysEmployee[]): void {
    const chartData = this.formatChartData(data[0]);
    const config = {
      type: 'doughnut',
      data: chartData,
      options: this.getChartOptions()
    };
    this.chart = new Chart(this.doughnutCanvas.nativeElement, config);
  }

  private updateChart(data: CertificationAnalysEmployee[]): void {
    if (this.chart) {
      this.chart.data = this.formatChartData(data[0]);
      this.chart.update();
    }
  }

  private formatChartData(data: CertificationAnalysEmployee): any {
    return {
      labels: ['Number of Certificates', 'Total Illness Days', 'Average Illness Days', 'Number of Days Absent'],
      datasets: [
        {
          label: 'Employee Certificates Analysis',
          data: [data.certificates_nbr, data.illness_days_nbr, data.average_illness_days, data.nb_day_abs],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }
      ]
    };
  }

  private getChartOptions(): any {
    return {
      plugins: {
        legend: {
          display: true,
          position: 'top'
        }
      }
    };
  }
}
