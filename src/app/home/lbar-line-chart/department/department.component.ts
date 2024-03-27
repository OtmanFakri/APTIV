import {Component, ElementRef, ViewChild} from '@angular/core';
import Chart from "chart.js/auto";
import * as Utils from "../utils";

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [],
  templateUrl: './department.component.html',
})
export class DepartmentComponent {
  @ViewChild('departmentCanvas') departmentCanvas!: ElementRef;
  public chart: any;

  createChart(data: any[]): void {
    const labels = data.map(item => item["Département"]);
    const certificateRates = data.map(item => item['Nb Certificats']);
    const averageIllnessDays = data.map(item => item.Nbrjour);

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Certificate Rate',
          data: certificateRates,
          borderColor: Utils.CHART_COLORS.red,
          backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
          yAxisID: 'y1',
          type: 'bar'
        },
        {
          label: 'Average Illness Days',
          data: averageIllnessDays,
          borderColor: Utils.CHART_COLORS.blue,
          backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
          yAxisID: 'y2',
          type: 'line'
        }
      ]
    };

    // @ts-ignore
    const config: Chart.ChartConfiguration = {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        scales: {
          y1: {
            type: 'linear',
            display: true,
            position: 'left',
            beginAtZero: true,
            title: {
              display: true,
              text: 'Certificate Rate'
            },
            grid: {
              drawOnChartArea: false
            }
          },
          y2: {
            type: 'linear',
            display: true,
            position: 'right',
            beginAtZero: true,
            title: {
              display: true,
              text: 'Average Illness Days'
            },
            grid: {
              drawOnChartArea: false
            },
            ticks: {
              callback: function(value: any, index: any, values: any) {
                return '';
              }
            }
          }
        }
      },
    };

    this.chart = new Chart(this.departmentCanvas.nativeElement, config);
  }

  ngAfterViewInit(): void {
    this.createChart(this.generateData());
  }

  generateData(): any[] {
    const baseData = [
      {
        "Date certificats": "2024-03-26",
        "Month": "Mar",
        "Matricule": 12345,
        "Catégorie": "DH",
        "Nb Certificats": Math.floor(Math.random() * 5) + 1,
        "Département": "ASSEMBLY-1-",
        "Date début": "2024-01-10",
        "Nbr prevu": Math.floor(Math.random() * 5) + 1,
        "Date fin": "2024-01-20",
        "Contre visite": true,
        "Validation(ITT DE 44 JRS,VALIDE)": "ITT DE 44 JRS",
        "Nbrjour": Math.floor(Math.random() * 5) + 1,
        "Ecart": 0,
        "Date entree": "2023-12-01",
        "Medcintraitant": "Dr. Smith",
        "Spécialité": "Orthopedics",
        "Contre maitre": "John Doe",
        "Shift(M,N,HC,S)": "M"
      }
    ];

    const options = [
      'ASSEMBLY',
      'CUTTING',
      'MAINTENANCE',
      'ENGINEERING',
      'PROCESS ENGI',
      'PRODUCT ENGINEERING',
      'QUALITY',
      'LOGISTIC IMPO.EXPO',
      'PURCHASING',
      'FINANCE-CONTROLLING',
      'GENERAL MANAGEMENT',
      'HUMAN RESSOURCES',
      'SAFETY H.R',
      'IT',
    ];

    let generatedData: any[] = [];

    options.forEach(option => {
      let newItem = { ...baseData[0] };
      newItem["Département"] = option;
      newItem["Nb Certificats"] = Math.floor(Math.random() * 5) + 1;
      newItem["Nbr prevu"] = Math.floor(Math.random() * 5) + 1;
      newItem["Nbrjour"] = Math.floor(Math.random() * 5) + 1;
      generatedData.push(newItem);
    });

    return generatedData;
  }

}
