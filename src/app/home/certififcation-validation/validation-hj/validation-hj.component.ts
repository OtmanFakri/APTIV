import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {AnalyseCertitifcatesService} from "../../lbar-line-chart/analyse-certitifcates.service";
import Chart, {ChartConfiguration, ChartData} from "chart.js/auto";
import {ValidationHj} from "../../../interfaces/Analyse/ValidationHj";
import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";
import {FormsModule} from "@angular/forms";
import {NzTableComponent, NzTbodyComponent, NzTheadComponent, NzTrDirective} from "ng-zorro-antd/table";
import {NgForOf} from "@angular/common";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";

@Component({
    selector: 'app-validation-hj',
    standalone: true,
    imports: [
        NzDatePickerComponent,
        FormsModule,
        NzTableComponent,
        NzTheadComponent,
        NzTbodyComponent,
        NgForOf,
        NzTrDirective,
        NzOptionComponent,
        NzSelectComponent
    ],
    templateUrl: './validation-hj.component.html',
})
export class ValidationHJComponent implements AfterViewInit {

    @ViewChild('ValidationHj') ValidationHj!: ElementRef;
    public chart: any;
    dataList?: ValidationHj[];
    @Output() certificateTotolDataChange = new EventEmitter<number>(); // Total count
    selectedYear: Date = new Date();
    default_isDuplicated: boolean = false;
    default_validationStatus: string = "VHJ";

    constructor(private analyseService: AnalyseCertitifcatesService) {
    }

    ngAfterViewInit() {
        if (this.selectedYear) {
            this.fetchData(this.selectedYear.getFullYear(),
                this.default_validationStatus,
                this.default_isDuplicated);
        }
        this.fetchData(this.selectedYear.getFullYear(),
            this.default_validationStatus,
            this.default_isDuplicated);

    }

    private fetchData(year: number,
                      status: string,
                      is_duplicated: boolean = false): void {
        this.analyseService.getCertificateAnalyseByHj(year, status, is_duplicated).subscribe((data: ValidationHj[]) => {
            this.dataList = data;
            this.certificateTotolDataChange.emit(data.reduce((sum, current) => sum + current.count, 0));
            if (this.chart) {
                this.updateChart(data);
            } else {
                this.createChart(data);
            }
        });
    }

    private createChart(data: ValidationHj[]): void {
        const chartData = this.formatChartData(data);
        const config: ChartConfiguration = {
            type: 'line',
            data: chartData as ChartData,
            options: this.getChartOptions()
        };
        this.chart = new Chart(this.ValidationHj.nativeElement, config);
    }

    private updateChart(data: ValidationHj[]): void {
        const chartData = this.formatChartData(data);
        this.chart.data = chartData;
        this.chart.update();
    }

    private formatChartData(data: ValidationHj[]): ChartData {
        return {
            labels: data.map(d => d.month),
            datasets: [{
                data: data.map(d => d.count),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0,
                stepped: true,
            }]
        };
    }

    private getChartOptions() {
        return {
            scales: {
                x: {
                    ticks: {
                        display: false // This will hide the x-axis labels
                    }
                },
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: false,
                    position: 'top' as 'top'
                }
            },
            elements: {
                line: {
                    tension: 0 // This is optional but generally set to 0 for stepped lines
                }
            }
        };
    }

    onYearChange($event: Date) {
        this.selectedYear = $event;
        this.fetchData(this.selectedYear.getFullYear(), this.default_validationStatus, this.default_isDuplicated);
        console.log(this.selectedYear)
    }

    calculateTotalCount(): number {
        if (!this.dataList || this.dataList.length === 0) {
            return 0;
        }
        return this.dataList.reduce((total, data) => total + data.count, 0);
    }

    is_duplicated($event: any) {
        this.default_isDuplicated = $event;
        this.fetchData(this.selectedYear.getFullYear(), this.default_validationStatus, this.default_isDuplicated)
    }

    validationStatus($event: any) {
        this.default_validationStatus = $event;
        this.fetchData(this.selectedYear.getFullYear(), this.default_validationStatus, this.default_isDuplicated)
    }
}
