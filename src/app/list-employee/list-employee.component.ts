import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {PaginationComponent} from "../Components/pagination/pagination.component";
import {RouterLink} from "@angular/router";
import {EmployeeService} from "./employee.service";
import {FilterEmployee, ImportResult, ListEmployee} from "../interfaces/ListEmployee";
import {NzDrawerComponent, NzDrawerContentDirective} from "ng-zorro-antd/drawer";
import {FilterEmployeeComponent} from "./Filter/filter-employee/filter-employee.component";
import {FilterService} from "./Filter/filter.service";
import {NzTableComponent, NzTbodyComponent, NzTheadComponent} from "ng-zorro-antd/table";
import {NzDropDownDirective, NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";
import {NzMenuDirective, NzMenuItemComponent} from "ng-zorro-antd/menu";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzModalComponent, NzModalContentDirective, NzModalService} from "ng-zorro-antd/modal";
import {NzModalModule} from 'ng-zorro-antd/modal';
import {AddCertiicationComponent} from "../list-certification/add-certiication/add-certiication.component";
import {UploadEmployeesComponent} from "./upload-employees/upload-employees.component";
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {NzUploadFile} from "ng-zorro-antd/upload";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {ResultImportComponent} from "./result-import/result-import.component";

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
        ResultImportComponent,
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
    modelSucess: boolean = true;
    resultsImport: ImportResult = {
        message: 'Import successful',
        results: {
            success: [
                {"id": 23, "name": "TEST TEST"},
                {"id": 24, "name": "TEST TEST"},
                {"id": 2589, "name": "GADDOUR MOUNIR"},
                {"id": 2587, "name": "BOULAICH REDOUAN"},
                {"id": 43, "name": "EL HARRAK ABDENABI"},
                {"id": 4, "name": "TEST TEST"},
                {"id": 5, "name": "TEST TEST"},
                {"id": 6, "name": "TEST TEST"},
                {"id": 7, "name": "TEST TEST"},
                {"id": 46, "name": "BOUZID KHALID"},
                {"id": 50, "name": "HASSAR IMANE"},
                {"id": 88, "name": "AOULAD HMAIDI AMINA"},
                {"id": 96, "name": "SIF EDDINE HADJ ALI"},
                {"id": 104, "name": "MEKNASSI ABDELGHALLAB"},
                {"id": 123, "name": "BOUDGHYA MARIAM"},
                {"id": 131, "name": "RGHIOUI SENHAJI KARIM"},
                {"id": 142, "name": "AKALAY LAILA"},
                {"id": 172, "name": "BOULHANNA ISMAIL"},
                {"id": 174, "name": "AGHRIBI MOHAMMED"},
                {"id": 217, "name": "SOUJAA KHADIJA"},
                {"id": 219, "name": "AKHAZZAN ABDELMAJID"},
                {"id": 248, "name": "EL AMRIOUI HANANE"},
                {"id": 263, "name": "KHALIFA IHSSANE"},
                {"id": 283, "name": "AHADRI SANAE"},
                {"id": 318, "name": "HAOUAOUI HANANE"},
                {"id": 363, "name": "EL KHALFAOUI EL HASS HADDA"},
                {"id": 370, "name": "BEN EL MAAMMAR ABDELLATIF"},
                {"id": 374, "name": "BOUHSAIN ZOUHAIR"},
                {"id": 405, "name": "BERBIA AICHA"},
                {"id": 414, "name": "ELGHARBI KHADIJA"},
                {"id": 416, "name": "LAAKEL RHIMOU"},
                {"id": 426, "name": "GHRIBI LAROUSSI BACHIR"},
                {"id": 428, "name": "BENSTAHIR SERROUKH RACHIDA"},
                {"id": 437, "name": "BEDOUI HALIMA"},
                {"id": 460, "name": "ZEROUAL HASNA"},
                {"id": 461, "name": "ZEROUAL ASMAA"},
                {"id": 510, "name": "HADHOUD ZOHRA"},
                {"id": 533, "name": "EL NEJAR ABDELHAMID"},
                {"id": 543, "name": "EL HADDAD OURIAGHLI ABDELLATIF"},
                {"id": 609, "name": "BENHNIDA NAZHA"},
                {"id": 832, "name": "EL OUAHABI MOHAMMED"},
                {"id": 840, "name": "ELLEMTOUNI IMOUAHIDI JAMAL"},
                {"id": 844, "name": "KHATAB SOUMAYA"},
                {"id": 881, "name": "EL MALHI MALIKA"},
                {"id": 906, "name": "EL DIAZ SAID"},
                {"id": 1397, "name": "SOUSSI ZOHRA"},
                {"id": 973, "name": "EL AZHAR SOUAD"},
                {"id": 986, "name": "JAADI HANAN"},
                {"id": 987, "name": "JABRI MINA"},
                {"id": 1015, "name": "BARAKAT SAIDA"},
                {"id": 1024, "name": "BENFKIH HABIBA"},
                {"id": 1030, "name": "GHAJOUAN ABDELHADI"},
                {"id": 1037, "name": "EL BARNOUSSI SOUMIA"},
                {"id": 1041, "name": "TIJANI NADIA"},
                {"id": 1079, "name": "ABBAD ANDALOUSSI AOUATIF"},
                {"id": 1120, "name": "BENKHADRA KHADIJA"},
                {"id": 1132, "name": "GHARBI OMAR"},
                {"id": 1152, "name": "TAOURIRT RACHIDA"}
            ],
            deleted: [],
            existing: [],
            errors: []
        }
    };

    constructor(private employeeService: EmployeeService,
                private notification: NzNotificationService,
                private modal: NzModalService,
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
                (response: ImportResult) => {
                    this.resultsImport = response;
                    this.modelSucess = true
                    this.isConfirmLoading = false;
                },
                (error) => {
                    console.log(error);
                    this.modelSucess = true
                    this.resultsImport = error.error.detail;
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

    SucesshandleCancel() {
        this.modelSucess = false
    }
}
