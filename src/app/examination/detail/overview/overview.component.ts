import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {OverviewDepComponent} from "./overview-dep/overview-dep.component";
import {OverviewCatgoryComponent} from "./overview-catgory/overview-catgory.component";
import {OverviewGendreComponent} from "./overview-gendre/overview-gendre.component";
import {ExaminitationService} from "../../examinitation.service";
import {ExaminitionMonth, Participation} from "../../InterfacesExaminitaion";
import {NgForOf} from "@angular/common";
import {NzDrawerComponent, NzDrawerContentDirective} from "ng-zorro-antd/drawer";
import Chart, {ChartConfiguration, ChartData} from "chart.js/auto";
import {Item} from "../../../interfaces/ListEmployee";

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    OverviewDepComponent,
    OverviewCatgoryComponent,
    OverviewGendreComponent,
    NgForOf,
    NzDrawerComponent,
    NzDrawerContentDirective
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent implements OnInit {
  @Input() ExaminitionId?: string | null = null;
  @ViewChild('examinationCanvas') examinationCanvas!: ElementRef<HTMLCanvasElement>;
  public chart!: Chart;
  visible = false;
  ListExamination: ExaminitionMonth[] = [];
  ShowingExamin?: Participation[];

  constructor(private examinitationService: ExaminitationService) {
  }

  ngOnInit(): void {
    this.GetMonthlyExamination();
  }

  GetMonthlyExamination() {
    if (this.ExaminitionId) {
      this.examinitationService.ExaminitionMonthly(Number(this.ExaminitionId)).subscribe((data: ExaminitionMonth[]) => {
        this.ListExamination = data;
        this.createChart(data);
      });
    }
  }

  private createChart(data: ExaminitionMonth[]): void {
    const chartData = this.formatChartData(data);
    const config: ChartConfiguration = {
      type: 'bar',
      data: chartData as ChartData,
      options: this.getChartOptions()
    };
    this.chart = new Chart(this.examinationCanvas.nativeElement, config);
  }

  private updateChart(data: ExaminitionMonth[]): void {
    const chartData = this.formatChartData(data);
    this.chart.data = chartData;
    this.chart.update();
  }

  private formatChartData(data: ExaminitionMonth[]): ChartData {
    return {
      labels: data.map(d => d.month),
      datasets: [
        {
          type: 'bar',
          label: 'Total Participations',
          data: data.map(d => d.total_participations),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          type: 'bar',
          label: 'Rest Participations',
          data: data.map(d => d.rest_participations),
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          type: 'line',
          label: 'Certificate Rate (%)',
          data: data.map(d => d['%']),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          fill: false
        },
        {
          type: 'bar',
          label: 'Total CM',
          data: data.map(d => d['Total CM']),
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1
        }
      ]
    };
  }

  open(exam: Participation[]): void {
    this.visible = true;
    this.ShowingExamin = exam;
  }

  getTotalParticipations(): number {
    return this.ListExamination.reduce((total, exam) => total + exam.total_participations, 0);
  }

  getTotalRestParticipations(): number {
    return this.ListExamination.reduce((total, exam) => total + exam.rest_participations, 0);
  }

  getTotalCM(): number {
    return this.ListExamination.reduce((total, exam) => total + exam["Total CM"], 0);
  }

  getTotalPercentage(): number {
    if (this.ListExamination.length === 0) return 0;
    const totalPercentage = this.ListExamination.reduce((total, exam) => total + exam["%"], 0);
    return parseFloat((totalPercentage / this.ListExamination.length).toFixed(2));
  }

  close(): void {
    this.visible = false;
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
