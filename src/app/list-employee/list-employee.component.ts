import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {PaginationComponent} from "../Components/pagination/pagination.component";
import {RouterLink} from "@angular/router";
import {ProfileService} from "../profile/profile.service";
import {FormData, PersonInformation, ProfessionalInformation} from "../profile/profile.module";
import {EmployeeService} from "./employee.service";
import {ListEmployee} from "../interfaces/ListEmployee";



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
  ],
  templateUrl: './list-employee.component.html'
})
export class ListEmployeeComponent implements OnInit {
  listEmployee: ListEmployee | null = null;
  currentPage: number = 1;
  totalPages: number = 10;
  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    const year = 2011; // Example year
    const category = null; // Example category. Use null if you don't want to filter by category.
    const departmentName = null; // Example department name. Use null if you don't want to filter by department name.
    const managerId = null; // Example manager ID. Use null if you don't want to filter by manager ID.
    const page = this.currentPage; // Example page number
    const size = this.totalPages; // Example page size

    this.employeeService.filterEmployees(year, category, departmentName, managerId, page, size)
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
    console.log('New page:', newPage)
    // Load your data based on the new page
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

  searchTerm: string = '';
  isFilterOpen: boolean = false;



}
