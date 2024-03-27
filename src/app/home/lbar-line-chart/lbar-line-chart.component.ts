import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import * as Utils from './utils';
import {NzSegmentedComponent} from "ng-zorro-antd/segmented";
import {DepartmentComponent} from "./department/department.component";
import {NgIf} from "@angular/common";
import {MonthsComponent} from "./months/months.component";
import {SexeComponent} from "./sexe/sexe.component";
import {CategoryComponent} from "./category/category.component";
@Component({
  selector: 'app-lbar-line-chart',
  standalone: true,
  imports: [
    NzSegmentedComponent,
    DepartmentComponent,
    NgIf,
    MonthsComponent,
    SexeComponent,
    CategoryComponent
  ],
  templateUrl: './lbar-line-chart.component.html',
})
export class LbarLineChartComponent {


  options :string[] = ['department', 'Month', 'Category','sexe'];
  private   option :number= 0;
  handleIndexChange(e: number): void {
    this.option = e;
  }
  get getoption(): number {
    return this.option;
  }
}


