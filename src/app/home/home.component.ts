import { Component } from '@angular/core';
import {NgStyle} from "@angular/common";
import {NzCalendarComponent} from "ng-zorro-antd/calendar";
import {LbarLineChartComponent} from "./lbar-line-chart/lbar-line-chart.component";
import {ContresVisitesPieComponent} from "./contres-visites-pie/contres-visites-pie.component";
import {DepartmentComponent} from "./lbar-line-chart/department/department.component";
import {QuierAnalyse} from "../interfaces/Analyse/QueryAnakyse";
import {CategoryComponent} from "./lbar-line-chart/category/category.component";
import {CertififcationValidationComponent} from "./certififcation-validation/certififcation-validation.component";
import {ValidationHJComponent} from "./certififcation-validation/validation-hj/validation-hj.component";
import {SexeComponent} from "./lbar-line-chart/sexe/sexe.component";
import {TableGendreComponent} from "./lbar-line-chart/sexe/table-gendre/table-gendre.component";
import {MonthsComponent} from "./lbar-line-chart/months/months.component";
import {WeekComponent} from "./lbar-line-chart/months/week/week.component";
import {TableWeekComponent} from "./lbar-line-chart/months/week/table-week/table-week.component";
import {DepartmentTableComponent} from "./lbar-line-chart/department/department-table/department-table.component";
import {CategoryTableComponent} from "./lbar-line-chart/category/category-table/category-table.component";
import {CategorizeEmployeeComponent} from "./categorize-employee/categorize-employee.component";
import {
  CategorizeEmployeeTabComponent
} from "./categorize-employee/categorize-employee-tab/categorize-employee-tab.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgStyle,
    NzCalendarComponent,
    LbarLineChartComponent,
    ContresVisitesPieComponent,
    DepartmentComponent,
    CategoryComponent,
    CertififcationValidationComponent,
    ValidationHJComponent,
    SexeComponent,
    TableGendreComponent,
    MonthsComponent,
    WeekComponent,
    TableWeekComponent,
    DepartmentTableComponent,
    CategoryTableComponent,
    CategorizeEmployeeComponent,
    CategorizeEmployeeTabComponent
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {


}
