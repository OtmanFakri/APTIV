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

interface CategoryItemData {
  key: number;
  category: string;
  nbEmployees: number;
  expand: boolean;
  departments: DepartmentItemData[];
}

interface DepartmentItemData {
  key: number;
  department: string;
  nbEmployees: number;
  expand: boolean; // Added expand property
  jobs: JobItemData[];
}

interface JobItemData {
  job: string;
  nbEmployees: number;
}
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

  ngOnInit(): void {
    this.listOfCategoryData = [
      {
        key: 1,
        category: 'IT',
        nbEmployees: 120,
        expand: false, // Initially not expanded
        departments: [
          {
            key: 11,
            department: 'Software Development',
            nbEmployees: 80,
            expand: false, // Initially not expanded
            jobs: [
              { job: 'Frontend Developer', nbEmployees: 25 },
              { job: 'Backend Developer', nbEmployees: 30 },
              { job: 'DevOps Engineer', nbEmployees: 25 }
            ]
          },
          {
            key: 12,
            department: 'Quality Assurance',
            nbEmployees: 40,
            expand: false, // Initially not expanded
            jobs: [
              { job: 'QA Analyst', nbEmployees: 20 },
              { job: 'QA Automation Engineer', nbEmployees: 20 }
            ]
          }
        ]
      },
      {
        key: 2,
        category: 'HR',
        nbEmployees: 50,
        expand: false, // Initially not expanded
        departments: [
          {
            key: 21,
            department: 'Recruitment',
            nbEmployees: 25,
            expand: false, // Initially not expanded
            jobs: [
              { job: 'Recruiter', nbEmployees: 15 },
              { job: 'Talent Acquisition Specialist', nbEmployees: 10 }
            ]
          },
          {
            key: 22,
            department: 'Employee Relations',
            nbEmployees: 25,
            expand: false, // Initially not expanded
            jobs: [
              { job: 'HR Advisor', nbEmployees: 10 },
              { job: 'HR Manager', nbEmployees: 15 }
            ]
          }
        ]
      }
      // Add more categories and their departments and jobs as needed
    ];
  }
}
