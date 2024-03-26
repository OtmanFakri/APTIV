import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { registerables} from 'chart.js';
import Chart from 'chart.js/auto';
import { Utils } from './utils'; // Import Utils from the utils.ts file

@Component({
  selector: 'app-contres-visites-pie',
  standalone: true,
  imports: [],
  templateUrl: './contres-visites-pie.component.html',
})
export class ContresVisitesPieComponent implements AfterViewInit{


  @ViewChild('polarAreaChart') polarAreaChart: ElementRef | undefined;
  chart: any;

  ngAfterViewInit() {
    this.initChart();
  }
  initChart() {
    Chart.register(...registerables);

    const DATA_COUNT = 5;
    const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};

    const labels = ['Red', 'Orange', 'Yellow', 'Green', 'Blue'];
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Dataset 1',
          data: Utils.numbers(NUMBER_CFG),
          backgroundColor: [
            Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
            Utils.transparentize(Utils.CHART_COLORS.orange, 0.5),
            Utils.transparentize(Utils.CHART_COLORS.yellow, 0.5),
            Utils.transparentize(Utils.CHART_COLORS.green, 0.5),
            Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
          ]
        }
      ]
    };

    const config = {
      type: 'polarArea',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Polar Area Chart'
          }
        }
      },
      actions: [
        {
          name: 'Randomize',
          handler: (chart: any) => {
            chart.data.datasets.forEach((dataset: any) => {
              dataset.data = Utils.numbers({count: chart.data.labels.length, min: 0, max: 100});
            });
            chart.update();
          }
        },
        {
          name: 'Add Data',
          handler: (chart: any) => {
            const data = chart.data;
            if (data.datasets.length > 0) {
              data.labels.push('data #' + (data.labels.length + 1));

              for (let index = 0; index < data.datasets.length; ++index) {
                data.datasets[index].data.push(Utils.rand(0, 100));
              }

              chart.update();
            }
          }
        },
        {
          name: 'Remove Data',
          handler: (chart: any) => {
            chart.data.labels.splice(-1, 1); // remove the label first

            chart.data.datasets.forEach((dataset: any) => {
              dataset.data.pop();
            });

            chart.update();
          }
        }
      ]
    };

    // @ts-ignore
    const ctx = this.polarAreaChart.nativeElement.getContext('2d');
    // @ts-ignore
    this.chart = new Chart(ctx, config);
  }
}
