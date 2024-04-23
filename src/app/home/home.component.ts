import { Component } from '@angular/core';
import {NgStyle} from "@angular/common";
import {NzCalendarComponent} from "ng-zorro-antd/calendar";
import {LbarLineChartComponent} from "./lbar-line-chart/lbar-line-chart.component";
import {ContresVisitesPieComponent} from "./contres-visites-pie/contres-visites-pie.component";
import {DepartmentComponent} from "./lbar-line-chart/department/department.component";
import {QuierAnalyse} from "../interfaces/Analyse/QueryAnakyse";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgStyle,
    NzCalendarComponent,
    LbarLineChartComponent,
    ContresVisitesPieComponent,
    DepartmentComponent
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {


}
