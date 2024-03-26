import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import * as Utils from './utils';
@Component({
  selector: 'app-lbar-line-chart',
  standalone: true,
  imports: [],
  templateUrl: './lbar-line-chart.component.html',
})
export class LbarLineChartComponent {

  public chart: any;

  createChart(data: any[]): void {
    if (Chart) {
      const labels = data.map(item => item.Month);
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
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Certificate Rate and Average Illness Days per Month'
            }
          },
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
              // Hide the labels for y2 axis
              ticks: {
                callback: function(value: any, index: any, values: any) {
                  return '';
                }
              }
            }
          }
        },
      };

      this.chart = new Chart("MyChart", config);
    }
  }

  ngOnInit(): void {
    const data = [
      {
        "Date certificats": "2024-03-26",
        "Month": "Mar",
        "Matricule": 12345,
        "Catégorie": "DH",
        "Nb Certificats": 2,
        "Département": "ASSEMBLY-1-",
        "Date début": "2024-01-10",
        "Nbr prevu": 5,
        "Date fin": "2024-01-20",
        "Contre visite": true,
        "Validation(ITT DE 44 JRS,VALIDE)": "ITT DE 44 JRS",
        "Nbrjour": 44,
        "Ecart": 0,
        "Date entree": "2023-12-01",
        "Medcintraitant": "Dr. Smith",
        "Spécialité": "Orthopedics",
        "Contre maitre": "John Doe",
        "Shift(M,N,HC,S)": "M"
      },
      {
        "Date certificats": "2024-03-26",
        "Month": "Mar",
        "Matricule": 12346,
        "Catégorie": "IH",
        "Nb Certificats": 1,
        "Département": "CUTTING-1-",
        "Date début": "2024-02-15",
        "Nbr prevu": 3,
        "Date fin": "2024-02-18",
        "Contre visite": false,
        "Validation(ITT DE 44 JRS,VALIDE)": "VALIDE",
        "Nbrjour": 0,
        "Ecart": 0,
        "Date entree": "2023-11-15",
        "Medcintraitant": "Dr. Johnson",
        "Spécialité": "Cardiology",
        "Contre maitre": "Jane Doe",
        "Shift(M,N,HC,S)": "N"
      },
      {
        "Date certificats": "2024-03-26",
        "Month": "Mar",
        "Matricule": 12347,
        "Catégorie": "IS",
        "Nb Certificats": 3,
        "Département": "MAINTENANCE-1-",
        "Date début": "2024-03-01",
        "Nbr prevu": 4,
        "Date fin": "2024-03-05",
        "Contre visite": true,
        "Validation(ITT DE 44 JRS,VALIDE)": "ITT DE 44 JRS",
        "Nbrjour": 44,
        "Ecart": 0,
        "Date entree": "2023-10-20",
        "Medcintraitant": "Dr. Williams",
        "Spécialité": "Neurology",
        "Contre maitre": "Jim Doe",
        "Shift(M,N,HC,S)": "HC"
      }
    ];

    this.createChart(data);
  }
}
