import {Component, OnInit} from '@angular/core';
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
    isLoading: boolean = false;

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
                    console.log('Data:', data);
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
                    console.log('Filtered Data:', data);
                },
                error: (error) => {
                    console.error('There was an error filtering employees!', error);
                }
            });

    }

    isFilterOpen: boolean = false;

    toggleFilterOpen() {
        this.isFilterOpen = !this.isFilterOpen;

    }
}
