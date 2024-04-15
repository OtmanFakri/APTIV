import {Component, OnInit} from '@angular/core';
import {
  NzTableComponent,
  NzTbodyComponent,
  NzTdAddOnComponent, NzThAddOnComponent,
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
    NzTrExpandDirective,
    NzThAddOnComponent
  ],
  templateUrl: './list-department.component.html'
})
export class ListDepartmentComponent implements OnInit {
  listOfCategoryData: CategoryItemData[] = [];
  filteredData: CategoryItemData[] = []; // For rendering filtered data
  listOfFilter = [
    { text: 'DH', value: 'DH' },
    { text: 'IH', value: 'IH' },
    { text: 'IS', value: 'IS' }
  ];

  constructor(private departmentService: DepartmentService) { }

  ngOnInit() {
    this.departmentService.getDepartments().subscribe({
      next: (data) => {
        this.listOfCategoryData = data;
        this.filteredData = [...this.listOfCategoryData]; // Initially, no filters are applied
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }

  onFilterChange(value: string[], key: string): void {
    if (value.length) {
      // @ts-ignore
      this.filteredData = this.listOfCategoryData.filter(item => value.includes(item[key]));
      console.log(this.filteredData);
    } else {
      this.filteredData = [...this.listOfCategoryData]; // Reset to original data if no filter is active
    }
  }

}
