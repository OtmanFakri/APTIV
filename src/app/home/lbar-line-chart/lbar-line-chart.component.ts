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

  createChart(): void {
    if (Chart) {
      const DATA_COUNT = 12; // 12 months
      const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 10 };

      const labels = Utils.months({ count: DATA_COUNT });
      const data = {
        labels: labels,
        datasets: [
          {
            label: 'Certificate Rate',
            data: Utils.data(NUMBER_CFG),
            borderColor: Utils.CHART_COLORS.red,
            backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
            yAxisID: 'y1',
            type: 'bar'
          },
          {
            label: 'Average illness days',
            data: Utils.data(NUMBER_CFG),
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
        data: data,
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
  }  ngOnInit(): void {
    this.createChart();
  }
}
