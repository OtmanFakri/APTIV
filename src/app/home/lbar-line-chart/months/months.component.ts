import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import Chart from "chart.js/auto";
import * as Utils from "../utils";

@Component({
  selector: 'app-months',
  standalone: true,
  imports: [],
  templateUrl: './months.component.html',
})
export class MonthsComponent implements AfterViewInit {

  @ViewChild('monthCanvas') monthCanvas!: ElementRef;
  public chart: any;

  createChart(data: any[]): void {
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

    this.chart = new Chart(this.monthCanvas.nativeElement, config);
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

    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    let generatedData: any[] = [];

    months.forEach(month => {
      let newItem = { ...baseData[0] };
      newItem["Month"] = month;
      newItem["Nb Certificats"] = Math.floor(Math.random() * 5) + 1;
      newItem["Nbr prevu"] = Math.floor(Math.random() * 5) + 1;
      newItem["Nbrjour"] = Math.floor(Math.random() * 5) + 1;
      generatedData.push(newItem);
    });

    return generatedData;
  }
}
