import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import Chart, {ChartConfiguration, ChartData} from "chart.js/auto";
import {AnalyseCertitifcatesService} from "../analyse-certitifcates.service";
import {CertificateAnalyseTotal, ExaminitionGendre} from "../../../interfaces/Analyse/CertificateAnalyseByDepertemt";


@Component({
  selector: 'app-sexe',
  standalone: true,
  imports: [],
  templateUrl: './sexe.component.html',
})
export class SexeComponent implements OnInit {
  data: ExaminitionGendre[] = [];
  totals: CertificateAnalyseTotal | null = null;
  @ViewChild('sexeCanvas') sexeCanvas!: ElementRef<HTMLCanvasElement>;
  chart: Chart | null = null;

  constructor(private certificateService: AnalyseCertitifcatesService) {}

  ngOnInit(): void {
    this.fetchData(2024); // Example year
  }

  private fetchData(year: number): void {
    this.certificateService.getCertificate_Gendre(year).subscribe(
      (response: ExaminitionGendre[]) => {
        this.data = response;
        this.totals = this.certificateService.calculateTotals(this.data);
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
    const config: ChartConfiguration = {
      type: 'bar',
      data: chartData as ChartData,
      options: this.getChartOptions()
    };
    this.chart = new Chart(this.sexeCanvas.nativeElement, config);
  }

  private updateChart(data: ExaminitionGendre[]): void {
    const chartData = this.formatChartData(data);
    if (this.chart) {
      this.chart.data = chartData;
      this.chart.update();
    }
  }

  private formatChartData(data: ExaminitionGendre[]): ChartData {
    return {
      labels: data.map(d => d.gender),
      datasets: [
        {
          type: 'bar', // Specify type here for combo chart
          label: 'Number of Illness Certificates',
          data: data.map(d => d.certificates_nbr),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          type: 'bar', // Specify type here for combo chart
          label: 'Total Illness Days',
          data: data.map(d => d.illness_days_nbr),
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          type: 'line', // Specify type here for combo chart
          label: 'Certificate Rate (%)',
          data: data.map(d => d.certificate_rate),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          fill: false // Typically set to false for line charts
        },
        {
          type: 'bar', // Specify type here for combo chart
          label: 'Average Illness Days',
          data: data.map(d => d.average_illness_days),
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1
        }
      ]
    };
  }

  private getChartOptions() {
    return {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top' as const
        }
      }
    };
  }
}
