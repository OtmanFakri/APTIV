import {Component, OnInit} from '@angular/core';
import {
  NzTableComponent,
  NzTbodyComponent,
  NzTdAddOnComponent,
  NzTheadComponent, NzThMeasureDirective,
  NzTrDirective, NzTrExpandDirective
} from "ng-zorro-antd/table";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NgForOf, NgIf} from "@angular/common";
import {CategoryItemData} from "../interfaces/ListDeprtemnt";
import {DepartmentService} from "./department.service";


@Component({
  selector: 'app-list-department',
  standalone: true,
  imports: [
    NzTheadComponent,
    NzTableComponent,
    NzTbodyComponent,
    NzTrDirective,
    NzTdAddOnComponent,
    NzIconDirective,
    NzThMeasureDirective,
    NgIf,
    NgForOf,
    NzTrExpandDirective
  ],
  templateUrl: './list-department.component.html'
})
export class ListDepartmentComponent implements OnInit {
  listOfCategoryData: CategoryItemData[] = [];
  constructor(private departmentService: DepartmentService) { }

  ngOnInit() {
    this.departmentService.getDepartments().subscribe({
      next: (data) => {
        this.listOfCategoryData = data;
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }

}
