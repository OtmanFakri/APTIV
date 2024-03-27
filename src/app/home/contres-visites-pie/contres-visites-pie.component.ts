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
  @ViewChild('radarChart') radarChart: any;
  chart: any;

  ngAfterViewInit(): void {
    this.initChart();
  }

  initChart() {
    const DATA_COUNT = 7;
    const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

    const labels = Utils.months({ count: 7 });

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Dataset 1',
          data: Utils.numbers(NUMBER_CFG),
          borderColor: Utils.CHART_COLORS.red,
          backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
        },
        {
          label: 'Dataset 2',
          data: Utils.numbers(NUMBER_CFG),
          borderColor: Utils.CHART_COLORS.blue,
          backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
        }
      ]
    };

    const config = {
      type: 'radar',
      data: data,
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Nombre des contres visites'
          }
        }
      },
      actions: [
        {
          name: 'Randomize',
          handler: (chart: any) => {
            chart.data.datasets.forEach((dataset: any) => {
              dataset.data = Utils.numbers({ count: chart.data.labels.length, min: 0, max: 100 });
            });
            chart.update();
          }
        },
        {
          name: 'Add Dataset',
          handler: (chart: any) => {
            const data = chart.data;
            const dsColor = Utils.namedColor(chart.data.datasets.length);
            const newDataset = {
              label: 'Dataset ' + (data.datasets.length + 1),
              backgroundColor: Utils.transparentize(dsColor, 0.5),
              borderColor: dsColor,
              data: Utils.numbers({ count: data.labels.length, min: 0, max: 100 }),
            };
            chart.data.datasets.push(newDataset);
            chart.update();
          }
        },
        {
          name: 'Add Data',
          handler: (chart: any) => {
            const data = chart.data;
            if (data.datasets.length > 0) {
              data.labels = Utils.months({ count: data.labels.length + 1 });

              for (let index = 0; index < data.datasets.length; ++index) {
                data.datasets[index].data.push(Utils.rand(0, 100));
              }

              chart.update();
            }
          }
        },
        {
          name: 'Remove Dataset',
          handler: (chart: any) => {
            chart.data.datasets.pop();
            chart.update();
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
    const ctx = this.radarChart.nativeElement.getContext('2d');
    // @ts-ignore
    this.chart = new Chart(ctx, config);
  }

}
