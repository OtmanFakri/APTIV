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
import {UploadEmployeesComponent} from "./upload-employees/upload-employees.component";
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {NzUploadFile} from "ng-zorro-antd/upload";
import {NzIconDirective} from "ng-zorro-antd/icon";

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
        UploadEmployeesComponent,
        NzIconDirective,
    ],
    templateUrl: './list-employee.component.html'
})
export class ListEmployeeComponent implements OnInit {

    @ViewChild(AddCertiicationComponent) FormSubmet!: AddCertiicationComponent;
    @ViewChild(UploadEmployeesComponent) uploadEmployeesComponent!: UploadEmployeesComponent;

    baseUrl = 'http://127.0.0.1:8011/'
    listEmployee: ListEmployee | null = null;
    selectedEmployee_id: Number | null = null;
    currentPage: number = 1;
    totalPages: number = 10;
    isLoading: boolean = false;
    IsFilterLoding: boolean = false;
    IsExportation: boolean = false
    private delayTimer?: number;

    UploadMpdel: boolean = false;

    constructor(private employeeService: EmployeeService,
                private notification: NzNotificationService,
                public filterService: FilterService) {
    }

    ngOnInit(): void {
        this.loadEmployees();
    }

    loadEmployees(): void {
        const page = this.currentPage; // Current page number
        const size = this.totalPages; // Page size
        this.IsFilterLoding = true;
        this.employeeService.filterEmployees(this.filterService.filterEmployee, page, size)
            .subscribe({
                next: (data) => {
                    this.listEmployee = data;
                    this.IsFilterLoding = false;

                },
                error: (error) => {
                    console.error('There was an error!', error);
                    this.IsFilterLoding = false;
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
    isConfirmLoading: boolean = false;

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

    openUpload() {
        this.UploadMpdel = true
    }

    CloseUpload() {
        this.UploadMpdel = false
    }

    Uploading() {
        const fileList = this.uploadEmployeesComponent.fileList;
        if (fileList.length === 0) {
            this.notification.warning("Warning", 'No file selected for upload.');
            return;
        }

        const file = fileList[0] as NzUploadFile;
        if (file) {
            this.isConfirmLoading = true;
            const formData = new FormData();
            formData.append('file', file as any);

            this.employeeService.EmployeesImport(file).subscribe(
                (response) => {
                    this.notification.success(
                        "Success",
                        `${file.name} file uploaded and processed successfully`
                    );
                    this.isConfirmLoading = false;
                },
                (error) => {
                    this.notification.error(
                        "Error",
                        `${file.name} file upload or processing failed.`
                    );
                    this.isConfirmLoading = false;
                }
            );
        }
    }

    export() {
        this.IsExportation = true
        this.employeeService.EmployeeExportation().subscribe({
            next: (data) => {
                this.IsExportation = false
                this.notification.success(
                    "Success",
                    `Exportation of employees completed successfully.`
                );
            },
            error: (error) => {
                this.IsExportation = false
                this.notification.error(
                    "Error",
                    `Exportation of employees failed.`
                );
            }
        })
    }
}
