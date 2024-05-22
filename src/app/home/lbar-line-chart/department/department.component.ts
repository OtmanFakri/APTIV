import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import Chart, {ChartConfiguration, ChartData} from "chart.js/auto";
import * as Utils from "../utils";
import {AnalyseCertitifcatesService} from "../analyse-certitifcates.service";
import {
  CertificateAnalyseByDepertemt,
  CertificateAnalyseTotal
} from "../../../interfaces/Analyse/CertificateAnalyseByDepertemt";
import {QuierAnalyse} from "../../../interfaces/Analyse/QueryAnakyse";
import {DateService} from "../../date-service";

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [],
  templateUrl: './department.component.html',
})
export class DepartmentComponent implements AfterViewInit {
  @ViewChild('departmentCanvas') departmentCanvas!: ElementRef<HTMLCanvasElement>;
  public chart!: Chart;
  @Output() certificateTotolDataChange = new EventEmitter<CertificateAnalyseTotal>();
  dataList?: CertificateAnalyseByDepertemt[];
  certificateTotolData?: CertificateAnalyseTotal;
  selectedDate!: Date;

  constructor(private analyseService: AnalyseCertitifcatesService, private dateService: DateService) {
    this.dateService.selectedDate.subscribe(date => {
      this.selectedDate = date;
      this.onDateChange(date);
    });
  }

  onDateChange(date: Date) {
    if (date) {
      this.fetchData(date.getFullYear(), date.getMonth() + 1);
    }
  }

  fetchData(year: number, month: number): void {
    // @ts-ignore
    this.analyseService.getCertificateAnalyseByDepertemt(year, month).subscribe((data: CertificateAnalyseByDepertemt[]) => {
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

  ngAfterViewInit() {
    if (this.selectedDate) {
      this.fetchData(this.selectedDate.getFullYear(), this.selectedDate.getMonth() + 1);
    } else {
      const currentDate = new Date();
      this.selectedDate = currentDate;
      this.fetchData(currentDate.getFullYear(), currentDate.getMonth() + 1);
    }
  }

  private createChart(data: CertificateAnalyseByDepertemt[]): void {
    const chartData = this.formatChartData(data);
    const config: ChartConfiguration = {
      type: 'bar',
      data: chartData as ChartData,
      options: this.getChartOptions()
    };
    this.chart = new Chart(this.departmentCanvas.nativeElement, config);
  }

  private updateChart(data: CertificateAnalyseByDepertemt[]): void {
    const chartData = this.formatChartData(data);
    this.chart.data = chartData;
    this.chart.update();
  }

  private formatChartData(data: CertificateAnalyseByDepertemt[]): ChartData {
    return {
      labels: data.map(d => d.department),
      datasets: [
        {
          type: 'bar',
          label: 'Number of Illness Certificates',
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
