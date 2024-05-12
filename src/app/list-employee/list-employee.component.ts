import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {PaginationComponent} from "../Components/pagination/pagination.component";
import {RouterLink} from "@angular/router";
import {EmployeeService} from "./employee.service";
import {FilterEmployee, ListEmployee} from "../interfaces/ListEmployee";
import {NzDrawerComponent, NzDrawerContentDirective} from "ng-zorro-antd/drawer";
import {FilterEmployeeComponent} from "./Filter/filter-employee/filter-employee.component";
import {FilterService} from "./Filter/filter.service";
import {NzTableComponent, NzTbodyComponent, NzTheadComponent} from "ng-zorro-antd/table";
import {NzDropDownDirective, NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";
import {NzMenuDirective, NzMenuItemComponent} from "ng-zorro-antd/menu";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzModalComponent, NzModalContentDirective} from "ng-zorro-antd/modal";
import {NzModalModule} from 'ng-zorro-antd/modal';
import {AddCertiicationComponent} from "../list-certification/add-certiication/add-certiication.component";

@Component({
  selector: 'app-list-employee',
  standalone: true,
  imports: [
    NgForOf,
    NzModalModule,
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
    NzDropdownMenuComponent,
    NzMenuDirective,
    NzMenuItemComponent,
    NzDropDownDirective,
    NzButtonComponent,
    NzModalComponent,
    NzModalContentDirective,
    AddCertiicationComponent,
  ],
  templateUrl: './list-employee.component.html'
})
export class ListEmployeeComponent implements OnInit {
  @ViewChild(AddCertiicationComponent) FormSubmet!: AddCertiicationComponent;

  listEmployee: ListEmployee | null = null;
  selectedEmployee_id: Number | null = null;
  currentPage: number = 1;
  totalPages: number = 10;
  isLoading: boolean = false;
  private delayTimer?: number; // Timer to manage the delay

  constructor(private employeeService: EmployeeService,
              public filterService: FilterService) {
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    const page = this.currentPage; // Current page number
    const size = this.totalPages; // Page size

    this.employeeService.filterEmployees(this.filterService.filterEmployee, page, size)
      .subscribe({
        next: (data) => {
          this.listEmployee = data;
        },
        error: (error) => {
          console.error('There was an error!', error);
        }
      });
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
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
    this.loadEmployees();
    this.filterService.clearFilterEmployee(); // Only if you want to clear this as a part of filters

  }

  applyFilters(): void {
    // @ts-ignore
    const dep = this.filterService.filterEmployee.department_ids?.map((item) => item["key"]);
    const modifiedFilterEmployee: FilterEmployee = {
      ...this.filterService.filterEmployee, // Copy other properties as-is
      department_ids: dep // Assigning modified department_ids
    };
    this.employeeService.filterEmployees(modifiedFilterEmployee, this.currentPage, this.totalPages)
      .subscribe({
        next: (data) => {
          this.listEmployee = data;
        },
        error: (error) => {
          console.error('There was an error filtering employees!', error);
        }
      });

  }

  isFilterOpen: boolean = false;
  isVisibleCreateCertificate: boolean = false;

  toggleFilterOpen() {
    this.isFilterOpen = !this.isFilterOpen;

  }

  logChange(value: number) {
    // Clear the existing timeout to ensure only the last change is logged
    if (this.delayTimer) {
      clearTimeout(this.delayTimer);
    }

    // Set a new timeout
    this.delayTimer = setTimeout(() => {
      this.filterService.filterEmployee.employee_id = value;
      this.employeeService.filterEmployees(this.filterService.filterEmployee).subscribe(
        (result) => {
          this.listEmployee = result;
        },
        (error) => {
          console.error('Error fetching employees:', error);
        }
      );
      this.delayTimer = undefined; // Clear the timer reference once executed
    }, 2000); // Delay of 2000 milliseconds (2 seconds)
  }

  showModalCreateCertificate(employee_id: Number) {
    this.selectedEmployee_id = employee_id;
    this.isVisibleCreateCertificate = true;
  }


  handleOkModalCreateCertificate() {
    this.isVisibleCreateCertificate = false;
    this.FormSubmet.onSubmit(Number(this.selectedEmployee_id));

  }
}
