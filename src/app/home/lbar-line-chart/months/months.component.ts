import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import Chart, {ChartConfiguration, ChartData} from "chart.js/auto";
import * as Utils from "../utils";
import {
  CertificateAnalyseByYear,
  CertificateAnalyseTotal
} from "../../../interfaces/Analyse/CertificateAnalyseByDepertemt";
import {AnalyseCertitifcatesService} from "../analyse-certitifcates.service";
import {DateService} from "../../date-service";

@Component({
  selector: 'app-months',
  standalone: true,
  imports: [],
  templateUrl: './months.component.html',
})
export class MonthsComponent implements AfterViewInit {

  @ViewChild('monthCanvas') monthCanvas!: ElementRef;
  public chart: any;
  dataList?: CertificateAnalyseByYear[];
  certificateTotolData?: CertificateAnalyseTotal;
  selectedDate!: Date;
  @Output() certificateTotolDataChange = new EventEmitter<CertificateAnalyseTotal>(); // Emit the certificateTotolData

  constructor(private analyseService: AnalyseCertitifcatesService,
              private dateService: DateService) {

    this.dateService.selectedDate.subscribe(date => {
      this.selectedDate = date;
      this.onDateChange(date);
    });
  }

  onDateChange(date: Date) {
    if (this.selectedDate) {
      this.fetchData(date.getFullYear(), date.getMonth() + 1);
    }
  }

  ngAfterViewInit() {
    if (this.selectedDate) {
      this.fetchData(this.selectedDate.getFullYear(), 1);
    }
    this.fetchData(this.selectedDate.getFullYear(), 1);

  }

  private createChart(data: CertificateAnalyseByYear[]): void {
    const chartData = this.formatChartData(data);
    const config: ChartConfiguration = {
      type: 'bar',
      data: chartData as ChartData,
      options: this.getChartOptions()
    };
    this.chart = new Chart(this.monthCanvas.nativeElement, config);
  }

  private updateChart(data: CertificateAnalyseByYear[]): void {
    const chartData = this.formatChartData(data);
    this.chart.data = chartData;
    this.chart.update();
  }

  fetchData(year: number, month: number): void {
    // @ts-ignore
    this.analyseService.getCertificateAnalyseByYear(year, month).subscribe((data: CertificateAnalyseByDepertemt[]) => {
      this.dataList = data;
      this.certificateTotolData = this.analyseService.calculateTotals(data);
      this.certificateTotolDataChange.emit(this.certificateTotolData);
      if (this.chart) {
        this.updateChart(data);
      } else {
        this.createChart(data);

      }
    });
  }

  private formatChartData(data: CertificateAnalyseByYear[]): ChartData {
    return {
      labels: data.map(d => d.month),
      datasets: [
        {
          label: 'Number of Illness Certificates',
          data: data.map(d => d.certificates_nbr),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          label: 'Total Illness Days',
          data: data.map(d => d.illness_days_nbr),
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          label: 'Certificate Rate (%)',
          data: data.map(d => d.certificate_rate),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        },
        {
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
