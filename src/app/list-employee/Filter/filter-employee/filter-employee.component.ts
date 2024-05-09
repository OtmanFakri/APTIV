import {Component, OnInit} from '@angular/core';
import {NzTagComponent} from "ng-zorro-antd/tag";
import {NgForOf, NgIf} from "@angular/common";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {FormsModule} from "@angular/forms";
import {NzSwitchComponent} from "ng-zorro-antd/switch";
import {FilterService} from "../filter.service";
import {DepartmentService} from "../../../list-department/department.service";
import {DepartmentItemData, JobItemData} from "../../../interfaces/ListDeprtemnt";

@Component({
  selector: 'app-filter-employee',
  standalone: true,
  imports: [
    NzTagComponent,
    NgForOf,
    NzSelectComponent,
    FormsModule,
    NzOptionComponent,
    NzSwitchComponent,
    NgIf
  ],
  templateUrl: './filter-employee.component.html',
})
export class FilterEmployeeComponent implements OnInit {
  amount: number = 0;
  category: string = '';
  showDropdownOne: boolean = false;
  listOfOptionDeps: DepartmentItemData[] = [];
  listOfOptionJobs: JobItemData[] = [];

  constructor(public filterService: FilterService,
              private departmentService: DepartmentService) {}


  ngOnInit(): void {
    this.departmentService.getDepartments().subscribe((data) => {
      this.listOfOptionDeps = data.flatMap(item => item.departments);
    });
  }

  onJobUploading(dep:DepartmentItemData[]){
    this.listOfOptionJobs = dep.flatMap((item) => item.jobs);
  }

  changeAmount(change: number): void {
    this.amount = Math.max(0, this.amount + change);
    this.filterService.filterEmployee.min_seniority_years = this.amount;
  }

  selectCategory(category: string): void {
    this.category = category;
    this.showDropdownOne = false;
  }


  selectGender(gender: string) {
    this.filterService.filterEmployee.sexe = gender
  }
}
