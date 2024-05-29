import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {CategorizeEmployeeInterface} from "./CategorizeEmployeeServiceInterface";
import {CategorizeEmployeeService} from "./categorize-employee.service";
import Chart, {ChartConfiguration, ChartData} from "chart.js/auto";
import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-categorize-employee',
  standalone: true,
  imports: [
    NzDatePickerComponent,
    FormsModule
  ],
  templateUrl: './categorize-employee.component.html',
  styleUrl: './categorize-employee.component.css'
})
export class CategorizeEmployeeComponent implements AfterViewInit {
  @ViewChild('employeeCanvas') employeeCanvas!: ElementRef<HTMLCanvasElement>;
  public chart!: Chart;
  @Output() employeeTotalDataChange = new EventEmitter<CategorizeEmployeeInterface>();
  dataList?: CategorizeEmployeeInterface;
  selectedDate!: Date;
  date: Date=new Date();

  constructor(private categorizeEmployeeService: CategorizeEmployeeService) {
    this.categorizeEmployeeService.categorizedEmployees.subscribe(
      (data: CategorizeEmployeeInterface) => {
        this.dataList = data;
        this.employeeTotalDataChange.emit(data);
        if (this.chart) {
          this.updateChart(data);
        } else {
          this.createChart(data);
        }
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }
  onDateChange(date: Date) {
    if (date) {
      this.fetchData(date.getFullYear());
    }
  }

  fetchData(year: number): void {
    console.log(`Fetching data for year: ${year}`);
    this.categorizeEmployeeService.getCategorizedEmployees(year);
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit called');
    if (this.selectedDate) {
      this.fetchData(this.selectedDate.getFullYear());
    } else {
      const currentDate = new Date();
      this.selectedDate = currentDate;
      this.fetchData(currentDate.getFullYear());
    }
  }

  private createChart(data: CategorizeEmployeeInterface): void {
    console.log('Creating chart with data: ', data);
    const chartData = this.formatChartData(data);
    const config: ChartConfiguration = {
      type: 'doughnut',
      data: chartData as ChartData,
      options: this.getChartOptions()
    };
    this.chart = new Chart(this.employeeCanvas.nativeElement, config);
  }

  private updateChart(data: CategorizeEmployeeInterface): void {
    console.log('Updating chart with data: ', data);
    const chartData = this.formatChartData(data);
    this.chart.data = chartData;
    this.chart.update();
  }

  private formatChartData(data: CategorizeEmployeeInterface): ChartData {
    return {
      labels: ['Red', 'Yellow', 'Green'],
      datasets: [
        {
          label: 'Employee Categorization',
          data: [data.red, data.yellow, data.green],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }
      ]
    };
  }

  private getChartOptions() {
    return {
      plugins: {
        legend: {
          display: true,
          position: 'top' as const
        }
      }
    };
  }
}
