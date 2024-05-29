import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AnalyseCertitifcatesService} from "../lbar-line-chart/analyse-certitifcates.service";
import {Examiniation, MonthlyCounterVisits, NbExaminiation} from "../../interfaces/Analyse/ExaminiationInterface";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {FormsModule} from "@angular/forms";
import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {CommonModule, NgForOf, NgIf} from "@angular/common";
import Chart, {ChartConfiguration, ChartData, ChartType} from "chart.js/auto";
import {
  NzTableComponent,
  NzTbodyComponent,
  NzThAddOnComponent,
  NzTheadComponent,
  NzThMeasureDirective, NzTrDirective,
} from "ng-zorro-antd/table";
import {ConterVisiteService} from "./conter-visite.service";

@Component({
  selector: 'app-certififcation-validation',
  standalone: true,
  imports: [
    NzSelectComponent,
    FormsModule,
    NzOptionComponent,
    NzDatePickerComponent,
    NzIconDirective,
    NgIf,
    CommonModule,
    NgForOf,
    NzTableComponent,
    NzTheadComponent,
    NzThMeasureDirective,
    NzTbodyComponent,
    NzThAddOnComponent,
    NzTrDirective,
  ],
  templateUrl: './certififcation-validation.component.html',
})
export class CertififcationValidationComponent implements OnInit {

  @ViewChild('ExaminiationCanvas') ExaminiationtCanvas!: ElementRef<HTMLCanvasElement>;
  public chart!: Chart;
  dataList: MonthlyCounterVisits[] = [];
  isLoading = false;
  totals = { totalSans: 0, totalContresVisites: 0, totalCM: 0, totalPercent: 0 };
  date: Date = new  Date();

  constructor(private conterVisiteService: ConterVisiteService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.isLoading = true;
    this.conterVisiteService.getMonthlyCounterVisits(Number(this.date.getFullYear())).subscribe(
      (data: MonthlyCounterVisits[]) => {
        this.dataList = data;
        console.log('Data fetched conterVisiteService: ', data)
        this.calculateTotals();
        this.isLoading = false;
        if (this.chart) {
          this.updateChart(data);
        } else {
          this.createChart(data);
        }
      },
      error => {
        console.error('Error fetching data: ', error);
        this.isLoading = false;
      }
    );
  }

  private createChart(data: MonthlyCounterVisits[]): void {
    const chartData = this.formatChartData(data);
    const config: ChartConfiguration = {
      type: 'bar' as ChartType, // Default to 'bar' but will configure mixed type below
      data: chartData,
      options: this.getChartOptions()
    };
    this.chart = new Chart(this.ExaminiationtCanvas.nativeElement, config);
  }

  private updateChart(data: MonthlyCounterVisits[]): void {
    const chartData = this.formatChartData(data);
    this.chart.data = chartData;
    this.chart.update();
  }

  private formatChartData(data: MonthlyCounterVisits[]): ChartData {
    return {
      labels: data.map(d => d.Month),
      datasets: [
        {
          type: 'bar',
          label: 'Contres visites',
          data: data.map(d => d["Contres visites"]),
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          type: 'bar',
          label: 'Sans',
          data: data.map(d => d.Sans),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          type: 'line',
          label: '%',
          data: data.map(d => parseFloat(d['%'])),
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderWidth: 2,
          fill: false
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
          position: 'top' as 'top'
        }
      }
    };
  }

  calculateTotals(): void {
    if (this.dataList.length) {
      this.totals.totalSans = this.dataList.reduce((acc, curr) => acc + curr.Sans, 0);
      this.totals.totalContresVisites = this.dataList.reduce((acc, curr) => acc + curr["Contres visites"], 0);
      this.totals.totalCM = this.dataList.reduce((acc, curr) => acc + curr["Total CM"], 0);
      this.totals.totalPercent = this.dataList.reduce((acc, curr) => acc + parseFloat(curr['%']), 0) / this.dataList.length;
    }
  }

  DateChnage($event: any) {
    this.fetchData();
  }
}
