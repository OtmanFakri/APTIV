import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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
  options :string[] = ['department', 'Month', 'Category','sexe'];
  private   option :number= 0;
  selectedValue = this.options[0];
  monthFormat = 'yyyy/MM';
  certificateTotolData: CertificateAnalyseTotal | undefined;
  selectedMonth: Date = new Date(2022, 6, 1);
  @Output() dateChangeEvent = new EventEmitter<Date>();


  constructor(private dateService: DateService) {}

  queryAnalyse: QuierAnalyse = {
    department_id: null, // Assign your desired value
    year: new Date().getFullYear(), // Set the current year as default
    month: new Date().getMonth() - 1
  };
  onMonthChange(date: Date): void {
    this.selectedMonth = date;
    this.dateService.updateDate(date);
    console.log('Selected Month:', date);
  }

  ngOnInit() {
  }


  get getoption(): number {
    return this.option;
  }
  onCertificateTotolDataChange(data: CertificateAnalyseTotal) {
    this.certificateTotolData = data;
  }

}


