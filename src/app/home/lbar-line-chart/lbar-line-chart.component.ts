import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import Chart from 'chart.js/auto';
import * as Utils from './utils';
import {NzSegmentedComponent} from "ng-zorro-antd/segmented";
import {DepartmentComponent} from "./department/department.component";
import {NgForOf, NgIf} from "@angular/common";
import {MonthsComponent} from "./months/months.component";
import {SexeComponent} from "./sexe/sexe.component";
import {CategoryComponent} from "./category/category.component";
import {CertificateAnalyseTotal} from "../../interfaces/Analyse/CertificateAnalyseByDepertemt";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {FormsModule} from "@angular/forms";
import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";
import {QuierAnalyse} from "../../interfaces/Analyse/QueryAnakyse";
import {AnalyseCertitifcatesService} from "./analyse-certitifcates.service";
import {DateService} from "../date-service";
@Component({
  selector: 'app-lbar-line-chart',
  standalone: true,
  imports: [
    NzSegmentedComponent,
    DepartmentComponent,
    NgIf,
    MonthsComponent,
    SexeComponent,
    CategoryComponent,
    NzSelectComponent,
    NzOptionComponent,
    NgForOf,
    FormsModule,
    NzDatePickerComponent
  ],
  templateUrl: './lbar-line-chart.component.html',
})
export class LbarLineChartComponent implements OnInit{
  options :string[] = ['department', 'Month',];
  selectedOption: string='department';
  monthFormat = 'yyyy/MM';
  certificateTotolData: CertificateAnalyseTotal | undefined;
  selectedMonth: Date = new Date();
  selectedYear: Date = new Date();

  constructor(private dateService: DateService) {}

  onOptionChange(value: string) {
    console.log('Option selected:', value);
  }
  onMonthChange(date: Date): void {
    this.selectedMonth = date;
    this.dateService.updateDate(date);
  }
  onYearChange(date: Date) : void{
    this.selectedYear = date;
    this.dateService.updateDate(date);
  }

  ngOnInit(): void {
    this.dateService.updateDate(this.selectedMonth);
  }

  onCertificateTotolDataChange(data: CertificateAnalyseTotal) {
    this.certificateTotolData = data;
  }

}


