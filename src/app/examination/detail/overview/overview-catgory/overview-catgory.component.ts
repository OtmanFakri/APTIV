import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ExaminitionCategory, ExaminitionGendre} from "../../../InterfacesExaminitaion";
import Chart, {ChartConfiguration, ChartData} from "chart.js/auto";
import {ExaminitationService} from "../../../examinitation.service";
import {NgForOf} from "@angular/common";
import {Item} from "../../../../interfaces/ListEmployee";
import {NzDrawerComponent} from "ng-zorro-antd/drawer";

@Component({
  selector: 'app-overview-catgory',
  standalone: true,
  imports: [
    NgForOf,
    NzDrawerComponent
  ],
  templateUrl: './overview-catgory.component.html',
  styleUrl: './overview-catgory.component.css'
})
export class OverviewCatgoryComponent implements OnInit {
  @Input() ExaminitionId?: string | null = null;
  @ViewChild('examinationCategoryCanvas') examinationCategoryCanvas!: ElementRef<HTMLCanvasElement>;
  public chart!: Chart;
  visible = false;
  ListExamination: ExaminitionCategory[] = [];
  ShowingExamin?: Item[];

  constructor(private examinitationService: ExaminitationService) {
  }

  ngOnInit(): void {
    this.GetCategoryExamination();
  }

  GetCategoryExamination() {
    if (this.ExaminitionId) {
      this.examinitationService.ExaminitionCategory(Number(this.ExaminitionId)).subscribe((data: ExaminitionCategory[]) => {
        this.ListExamination = data;
        this.createChart(data);
      });
    }
  }

  private createChart(data: ExaminitionCategory[]): void {
    const chartData = this.formatChartData(data);
    const config: ChartConfiguration = {
      type: 'bar',
      data: chartData as ChartData,
      options: this.getChartOptions()
    };
    this.chart = new Chart(this.examinationCategoryCanvas.nativeElement, config);
  }

  private formatChartData(data: ExaminitionCategory[]): ChartData {
    return {
      labels: data.map(d => d.category),
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

  private updateChart(data: ExaminitionCategory[]): void {
    const chartData = this.formatChartData(data);
    this.chart.data = chartData;
    this.chart.update();
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
    // Handle opening of detailed view
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

