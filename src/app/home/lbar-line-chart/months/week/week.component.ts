import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import Chart from "chart.js/auto";
import {MonthWeeekService} from "../month-weeek.service";
import {CertificationWeekInterface} from "../CertificationWeekInterafce";
import {DateService} from "../../../date-service";
import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";
import {FormsModule} from "@angular/forms";
import {getISOWeek} from "date-fns";


@Component({
    selector: 'app-week',
    standalone: true,
    imports: [
        NzDatePickerComponent,
        FormsModule
    ],
    templateUrl: './week.component.html',
    styleUrl: './week.component.css'
})
export class WeekComponent implements OnInit {
    data: CertificationWeekInterface[] = [];
    @ViewChild('weekCanvas') weekCanvas!: ElementRef<HTMLCanvasElement>;
    chart: Chart | null = null;
    date: Date = new Date();

    constructor(private weekService: MonthWeeekService,
                private dateService: DateService) {
    }

    getWeek(result: Date): void {
        console.log('week: ', getISOWeek(result));
        this.fetchData(result.getFullYear(), getISOWeek(result));
    }

    ngOnInit(): void {
        this.fetchData(this.dateService.getCurrentYear(), this.dateService.getCurrentWeek()); // Example year and week
        this.weekService.Listdata.subscribe(
            (response: CertificationWeekInterface[]) => {
                this.data = response;
                if (this.chart) {
                    this.updateChart(this.data);
                } else {
                    this.createChart(this.data);
                }
            },
            (error) => {
                console.error('Error fetching data', error);
            }
        );
    }

    private fetchData(year: number, week: number): void {
        this.weekService.getCertificate_week(year, week);
    }

    private createChart(data: CertificationWeekInterface[]): void {
        const chartData = this.formatChartData(data);
        const config = {
            type: 'bar',
            data: chartData,
            options: this.getChartOptions()
        };
        this.chart = new Chart(this.weekCanvas.nativeElement, config);
    }

    private updateChart(data: CertificationWeekInterface[]): void {
        if (this.chart) {
            this.chart.data = this.formatChartData(data);
            this.chart.update();
        }
    }

    private formatChartData(data: CertificationWeekInterface[]): any {
        return {
            labels: data.map(d => d.date),
            datasets: [
                {
                    type: 'bar',
                    label: 'Number of Certificates',
                    data: data.map(d => d.certificates_nbr),
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    type: 'bar',
                    label: 'Total Illness Days',
                    data: data.map(d => d.illness_days_nbr),
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                {
                    type: 'line',
                    label: 'Certificate Rate (%)',
                    data: data.map(d => d.certificate_rate),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: false
                },
                {
                    type: 'bar',
                    label: 'Average Illness Days',
                    data: data.map(d => d.average_illness_days),
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1
                }
            ]
        };
    }

    private getChartOptions(): any {
        return {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        };
    }
}
