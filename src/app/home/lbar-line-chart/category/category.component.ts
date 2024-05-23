import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import Chart, {ChartConfiguration, ChartData} from "chart.js/auto";
import {
  CertificateAnalyseByCategory,
  CertificateAnalyseTotal
} from "../../../interfaces/Analyse/CertificateAnalyseByDepertemt";
import {AnalyseCertitifcatesService} from "../analyse-certitifcates.service";
import {NzCollapseComponent, NzCollapsePanelComponent} from "ng-zorro-antd/collapse";
import {NgForOf, NgIf} from "@angular/common";
import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";
import {DepartmentComponent} from "../department/department.component";
import {MonthsComponent} from "../months/months.component";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {SexeComponent} from "../sexe/sexe.component";
import {FormsModule} from "@angular/forms";
import {CategoryAnalyseCertificationService} from "./category-analyse-certification.service";

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    NzCollapseComponent,
    NzCollapsePanelComponent,
    NgForOf,
    NzDatePickerComponent,
    DepartmentComponent,
    MonthsComponent,
    NgIf,
    NzOptionComponent,
    NzSelectComponent,
    SexeComponent,
    FormsModule
  ],
  templateUrl: './category.component.html',
})
export class CategoryComponent implements AfterViewInit {
  @ViewChild('categorytCanvas') categorytCanvas!: ElementRef<HTMLCanvasElement>;
  public chart!: Chart;
  dataList?: CertificateAnalyseByCategory[];
  certificateTotolData?: CertificateAnalyseTotal;
  @Output() certificateTotolDataChange = new EventEmitter<CertificateAnalyseTotal>();
  selectedMonth: Date = new Date();

  constructor(private analyseService: CategoryAnalyseCertificationService,
              private analyseCertitifcatesService :AnalyseCertitifcatesService) {}

  onMonthChange(date: Date): void {
    this.selectedMonth = date;
    const year = this.selectedMonth.getFullYear();
    const month = this.selectedMonth.getMonth() + 1; // JavaScript months are 0-indexed, add 1 for correct month
    this.fetchData(year, month);
  }

  ngAfterViewInit() {
    const year = this.selectedMonth.getFullYear();
    const month = this.selectedMonth.getMonth() + 1;
    this.fetchData(year, month);
  }

  fetchData(year: number, month: number): void {
    this.analyseService.getCertificateAnalyseByCategory(year, month);
    this.analyseService.categoryListData.subscribe((data: CertificateAnalyseByCategory[]) => {
      this.dataList = data;
      this.certificateTotolData = this.analyseCertitifcatesService.calculateTotals(data); // Update to calculate totals in the component
      this.certificateTotolDataChange.emit(this.certificateTotolData);
      if (this.chart) {
        this.updateChart(data);
      } else {
        this.createChart(data);
      }
    });
  }

  private createChart(data: CertificateAnalyseByCategory[]): void {
    const chartData = this.formatChartData(data);
    const config: ChartConfiguration = {
      type: 'bar',
      data: chartData as ChartData,
      options: this.getChartOptions()
    };
    this.chart = new Chart(this.categorytCanvas.nativeElement, config);
  }

  private updateChart(data: CertificateAnalyseByCategory[]): void {
    const chartData = this.formatChartData(data);
    this.chart.data = chartData;
    this.chart.update();
  }

  private formatChartData(data: CertificateAnalyseByCategory[]): ChartData {
    return {
      labels: data.map(d => d.category),
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
          stacked: true,
          beginAtZero: true
        },
        x: {
          stacked: true
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
