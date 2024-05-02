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
    ValidationHJComponent
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {


}
