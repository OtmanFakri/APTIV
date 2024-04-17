import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {PaginationComponent} from "../Components/pagination/pagination.component";
import {RouterLink} from "@angular/router";
import {EmployeeService} from "./employee.service";
import {ListEmployee} from "../interfaces/ListEmployee";
import {NzDrawerComponent, NzDrawerContentDirective} from "ng-zorro-antd/drawer";
import {FilterEmployeeComponent} from "./Filter/filter-employee/filter-employee.component";
import {FilterService} from "./Filter/filter.service";
import {switchMap, tap} from "rxjs";
import {NzTableComponent, NzTbodyComponent, NzTheadComponent} from "ng-zorro-antd/table";



@Component({
  selector: 'app-list-employee',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    PaginationComponent,
    NgOptimizedImage,
    RouterLink,
    NgIf,
    NzDrawerComponent,
    NzDrawerContentDirective,
    FilterEmployeeComponent,
    NzTheadComponent,
    NzTableComponent,
    NzTbodyComponent,
  ],
  templateUrl: './list-employee.component.html'
})
export class ListEmployeeComponent implements OnInit {
  listEmployee: ListEmployee | null = null;
  currentPage: number = 1;
  totalPages: number = 10;
  currentCategories: string[] = [];
  currentDepartments: string[] = [];
  isLoading: boolean = false;
  constructor(private employeeService: EmployeeService,
              private filterService: FilterService) { }

  ngOnInit(): void {
    this.filterService.selectedCategoryTags$
      .pipe(
        tap(categories => this.currentCategories = categories),
        switchMap(() => this.filterService.selectedDepartmentTags$)
      )
      .subscribe(departments => {
        console.log('Departments:',this.filterService.getSelectedDepartmentKeys())
        this.currentDepartments = this.filterService.getSelectedDepartmentKeys().map(String);
        this.loadEmployees();
      });
  }

  loadEmployees(): void {
    const year = 2011; // Example year
    const page = this.currentPage; // Current page number
    const size = this.totalPages; // Page size

    this.employeeService.filterEmployees(year, this.currentCategories, this.currentDepartments, null, page, size)
      .subscribe({
        next: (data) => {
          this.listEmployee = data;
          console.log('Data:', data);
        },
        error: (error) => {
          console.error('There was an error!', error);
        }
      });
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    console.log('New page:', newPage);
    this.loadEmployees();
  }

  getRandomColor(name: string | undefined): string {
    const colors = ['#FF4500', '#FFD700', '#32CD32', '#008080', '#800080', '#0000FF', '#FF1493'];
    if (!name) {
      name = 'default'; // or any default string
    }
    const charCodeSum = name.charCodeAt(0) + (name.length > 1 ? name.charCodeAt(1) : 0);
    const index = charCodeSum % colors.length;
    return colors[index];
  }

  clearFilters(): void {
    this.isLoading = true;  // Start loading
    this.currentCategories = [];
    this.currentDepartments = [];
    this.filterService.clearAllFilters(); // Assuming your FilterService has a method to clear filters
    this.loadEmployees();
    this.isLoading = false;  // Start loading

  }
  searchTerm: string = '';
  isFilterOpen: boolean = false;
}
