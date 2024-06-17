import {Component, AfterViewInit, ViewChild, ElementRef, Input, SimpleChanges} from '@angular/core';
import {Chart, ChartConfiguration, ChartData} from 'chart.js';
import {MedicamentKpiService} from "../medicament-kpi.service";
import {forkJoin} from "rxjs";
import {DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {NzSegmentedComponent} from "ng-zorro-antd/segmented";
import {extractDateComponents} from "../../../helper/getCurrentFormattedDate";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-medicament-kpi-category',
  standalone: true,
  imports: [
    NgForOf,
    DecimalPipe,
    NzSegmentedComponent,
    NgIf,
    FormsModule
  ],
  templateUrl: './medicament-kpi-category.component.html',
})
export class MedicamentKpiCategoryComponent implements AfterViewInit {
  @ViewChild('categoryCanvas') categoryCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('departmentCanvas') departmentCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('gendreCanvas') gendreCanvas!: ElementRef<HTMLCanvasElement>;

  public chart!: Chart;

  @Input() selectedDate: Date | null | undefined;
  @Input() indexTabs: number | undefined = 0;
  @Input() mode!: 'date' | 'month' | 'year';
  tableData: any[] = [];

  constructor(private medicamentKpiService: MedicamentKpiService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedDate'] && !changes['selectedDate'].firstChange) {
      this.fetchData(extractDateComponents(this.selectedDate!, this.mode));
    }
    if (changes['mode'] && !changes['mode'].firstChange) {
      this.fetchData(extractDateComponents(this.selectedDate!, this.mode));
    }
  }

  ngAfterViewInit() {
    this.fetchData(extractDateComponents(this.selectedDate!, this.mode));
    this.indexTabs = 0;
  }

  fetchData(dateComponents: { year: number | null, month: number | null, day: number | null }): void {
    const {year, month, day} = dateComponents;

    if (this.indexTabs === 0) {
      const totalUsage$ = this.medicamentKpiService.getTotalUsageByCategory(year, month, day);
      const avgMedicament$ = this.medicamentKpiService.getAverageMedicamentPerSoinByCategory(year, month, day);
      const soinCount$ = this.medicamentKpiService.getNumberOfSoinsByCategory(year, month, day);

      forkJoin([totalUsage$, avgMedicament$, soinCount$]).subscribe(([totalUsageData, avgMedicamentData, soinCountData]) => {
        this.tableData = totalUsageData.map((item: any, index: number) => ({
          category: item.category,
          total_usage: item.total_usage,
          avg_medicament_per_soin: avgMedicamentData[index]?.avg_medicament_per_soin || 0,
          soin_count: soinCountData[index]?.soin_count || 0
        }));
        this.createChart('category', totalUsageData, avgMedicamentData, soinCountData);
      });
    } else if (this.indexTabs === 1) {
      const totalUsage$ = this.medicamentKpiService.getTotalUsageByDepartment(year, month, day);
      const avgMedicament$ = this.medicamentKpiService.getAverageMedicamentPerSoinByDepartment(year, month, day);
      const soinCount$ = this.medicamentKpiService.getNumberOfSoinsByDepartment(year, month, day);

      forkJoin([totalUsage$, avgMedicament$, soinCount$]).subscribe(([totalUsageData, avgMedicamentData, soinCountData]) => {
        this.tableData = totalUsageData.map((item: any, index: number) => ({
          department: item.department_name,
          total_usage: item.total_usage,
          avg_medicament_per_soin: avgMedicamentData[index]?.avg_medicament_per_soin || 0,
          soin_count: soinCountData[index]?.soin_count || 0
        }));
        this.createChart('department', totalUsageData, avgMedicamentData, soinCountData);
      });
    } else if (this.indexTabs === 2) {
      const totalUsage$ = this.medicamentKpiService.getTotalUsageByGender(year, month, day);
      const avgMedicament$ = this.medicamentKpiService.getAverageMedicamentPerSoinByGender(year, month, day);
      const soinCount$ = this.medicamentKpiService.getNumberOfSoinsByGender(year, month, day);

      forkJoin([totalUsage$, avgMedicament$, soinCount$]).subscribe(([totalUsageData, avgMedicamentData, soinCountData]) => {
        this.tableData = totalUsageData.map((item: any, index: number) => ({
          gender: item.gender,
          total_usage: item.total_usage,
          avg_medicament_per_soin: avgMedicamentData[index]?.avg_medicament_per_soin || 0,
          soin_count: soinCountData[index]?.soin_count || 0
        }));
        this.createChart('gender', totalUsageData, avgMedicamentData, soinCountData);
      });
    }
  }

  private createChart(type: 'category' | 'department' | 'gender', totalUsageData: any, avgMedicamentData: any, soinCountData: any): void {
    let canvas: HTMLCanvasElement;
    if (type === 'category') {
      canvas = this.categoryCanvas.nativeElement;
    } else if (type === 'department') {
      canvas = this.departmentCanvas.nativeElement;
    } else {
      canvas = this.gendreCanvas.nativeElement;
    }

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    const chartData: ChartData = {
      labels: totalUsageData.map((item: any) => type === 'category' ? item.category : type === 'department' ? item.department_name : item.gender),
      datasets: [
        {
          label: 'Total Usage',
          data: totalUsageData.map((item: any) => item.total_usage),
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          label: 'Avg Medicament per Soin',
          data: avgMedicamentData.map((item: any) => item.avg_medicament_per_soin),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        },
        {
          label: 'Soin Count',
          data: soinCountData.map((item: any) => item.soin_count),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }
      ]
    };

    const config: ChartConfiguration = {
      type: 'bar',
      data: chartData,
      options: {
        plugins: {
          legend: {
            display: false
          },
          htmlLegend: {
            containerID: 'chart-legend'
          } as any
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
      plugins: [htmlLegendPlugin]
    } as ChartConfiguration;

    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart(ctx, config);
  }

  options = [
    {label: 'Categories', value: 0},
    {label: 'Departments', value: 1},
    {label: 'Genders', value: 2}
  ];

  handleIndexChange($event: number) {
    this.indexTabs = $event;
    this.fetchData(extractDateComponents(this.selectedDate!, this.mode));
  }
}

const htmlLegendPlugin = {
  id: 'htmlLegend',
  afterUpdate(chart: Chart) {
    // @ts-ignore
    const ul = document.getElementById(chart.options.plugins.htmlLegend.containerID) as HTMLElement;
    if (!ul) {
      return;
    }

    while (ul.firstChild) {
      ul.firstChild.remove();
    }

    // @ts-ignore
    const items = chart.options.plugins.legend.labels.generateLabels(chart);

    items.forEach((item) => {
      const li = document.createElement('li');
      li.style.alignItems = 'center';
      li.style.cursor = 'pointer';
      li.style.display = 'flex';
      li.style.flexDirection = 'row';
      li.style.marginBottom = '4px';

      li.onclick = () => {
        // @ts-ignore
        const {type} = chart.config;
        if (type === 'pie' || type === 'doughnut') {
          // @ts-ignore
          chart.toggleDataVisibility(item.index);
        } else {
          // @ts-ignore
          chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
        }
        chart.update();
      };

      const boxSpan = document.createElement('span');
      boxSpan.style.background = item.fillStyle as string;
      boxSpan.style.borderColor = item.strokeStyle as string;
      boxSpan.style.borderWidth = item.lineWidth + 'px';
      boxSpan.style.display = 'inline-block';
      boxSpan.style.height = '20px';
      boxSpan.style.marginRight = '10px';
      boxSpan.style.width = '20px';

      const textContainer = document.createElement('p');
      textContainer.style.color = item.fontColor as string;
      textContainer.style.margin = '0';
      textContainer.style.padding = '0';
      textContainer.style.textDecoration = item.hidden ? 'line-through' : '';

      const text = document.createTextNode(item.text);
      textContainer.appendChild(text);

      li.appendChild(boxSpan);
      li.appendChild(textContainer);
      ul.appendChild(li);
    });
  }
};
