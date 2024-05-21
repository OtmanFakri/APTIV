import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ExaminitationService} from "../../../examinitation.service";
import {ExaminitionGendre, Participation} from "../../../InterfacesExaminitaion";
import {Item} from "../../../../interfaces/ListEmployee";
import {NgForOf} from "@angular/common";
import {NzDrawerComponent, NzDrawerContentDirective} from "ng-zorro-antd/drawer";
import Chart, {ChartConfiguration, ChartData} from "chart.js/auto";

@Component({
  selector: 'app-overview-gendre',
  standalone: true,
  imports: [
    NgForOf,
    NzDrawerComponent,
    NzDrawerContentDirective
  ],
  templateUrl: './overview-gendre.component.html',
  styleUrl: './overview-gendre.component.css'
})
export class OverviewGendreComponent implements OnInit {
  @Input() ExaminitionId?: string | null = null;
  @ViewChild('genderCanvas') genderCanvas!: ElementRef<HTMLCanvasElement>;
  public chart!: Chart;
  ListExamination: ExaminitionGendre[] = [];
  visible = false;
  ShowingExamin?: Item[];

  constructor(private examinitationService: ExaminitationService) { }

  ngOnInit(): void {
    this.GetGenderExamination();
  }

  GetGenderExamination() {
    if (this.ExaminitionId) {
      this.examinitationService.ExaminitionGendre(Number(this.ExaminitionId)).subscribe((data: ExaminitionGendre[]) => {
        this.ListExamination = data;
        this.createChart(data);
      });
    }
  }

  getTotalParticipations(): number {
    return this.ListExamination.reduce((total, exam) => total + exam.total_participating, 0);
  }

  getTotalRestParticipations(): number {
    return this.ListExamination.reduce((total, exam) => total + exam.total_non_participating, 0);
  }

  getTotalCM(): number {
    return this.ListExamination.reduce((total, exam) => total + exam["Total CM"], 0);
  }

  getTotalPercentage(): number {
    if (this.ListExamination.length === 0) return 0;
    const totalPercentage = this.ListExamination.reduce((total, exam) => total + exam["%"], 0);
    return parseFloat((totalPercentage / this.ListExamination.length).toFixed(2));
  }

  open(exam: Item[]): void {
    this.visible = true;
    this.ShowingExamin = exam;
  }

  close(): void {
    this.visible = false;
  }

  private createChart(data: ExaminitionGendre[]): void {
    const chartData = this.formatChartData(data);
    const config: ChartConfiguration = {
      type: 'bar',
      data: chartData as ChartData,
      options: this.getChartOptions()
    };
    this.chart = new Chart(this.genderCanvas.nativeElement, config);
  }

  private updateChart(data: ExaminitionGendre[]): void {
    const chartData = this.formatChartData(data);
    this.chart.data = chartData;
    this.chart.update();
  }

  private formatChartData(data: ExaminitionGendre[]): ChartData {
    return {
      labels: data.map(d => d.Sexe),
      datasets: [
        {
          type: 'bar',
          label: 'Total Participations',
          data: data.map(d => d.total_participating),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          type: 'bar',
          label: 'Rest Participations',
          data: data.map(d => d.total_non_participating),
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          type: 'line',
          label: 'Certificate Rate (%)',
          data: data.map(d => d["%"]),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          fill: false
        },
        {
          type: 'bar',
          label: 'Total CM',
          data: data.map(d => d["Total CM"]),
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
