import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {PaginationComponent} from "../Components/pagination/pagination.component";
import {RouterLink} from "@angular/router";
import {NzTableCellDirective, NzTrDirective} from "ng-zorro-antd/table";
import {NzDatePickerComponent, NzRangePickerComponent} from "ng-zorro-antd/date-picker";
import {getISOWeek} from 'date-fns';
import {NzModalComponent, NzModalContentDirective, NzModalModule} from "ng-zorro-antd/modal";
import {
    ShowCertificationComponent
} from "../profile/me/info-certification/show-certification/show-certification.component";
import {NzDrawerComponent, NzDrawerContentDirective} from "ng-zorro-antd/drawer";
import {AddCertiicationComponent} from "./add-certiication/add-certiication.component";
import {date_certification} from "./testjson";
import {CertificationsResponseInterface} from '../interfaces/ListCertificationInterface';
import {CertificatesService} from "./certificates.service";
import {NzNotificationComponent, NzNotificationService} from "ng-zorro-antd/notification";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {InfoEmployeeComponent} from "./info-employee/info-employee.component";
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {NzSpaceComponent, NzSpaceItemDirective} from "ng-zorro-antd/space";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {UpdateCertificationComponent} from "./update-certification/update-certification.component";


@Component({
    selector: 'app-list-certification',
    standalone: true,
    imports: [
        FormsModule,
        NzDatePickerModule,
        NgForOf,
        NgIf,
        PaginationComponent,
        RouterLink,
        NzModalModule,
        NzRangePickerComponent,
        NzDatePickerComponent,
        FormsModule,
        NzTrDirective,
        NzModalComponent,
        ShowCertificationComponent,
        NzModalContentDirective,
        NzDrawerComponent,
        AddCertiicationComponent,
        NzDrawerContentDirective,
        NgClass,
        NzButtonComponent,
        InfoEmployeeComponent,
        NzSpaceComponent,
        NzSelectComponent,
        NzOptionComponent,
        NzSpaceItemDirective,
        UpdateCertificationComponent
    ],
    templateUrl: './list-certification.component.html',
})
export class ListCertificationComponent implements OnInit {
    @ViewChild(AddCertiicationComponent) addCertificationComponent!: AddCertiicationComponent;
    @ViewChild(UpdateCertificationComponent) updateCertificationComponent!: UpdateCertificationComponent;

    @ViewChild('notificationBtnTpl', {static: true}) ConfurmDelete!: TemplateRef<{
        $implicit: NzNotificationComponent
    }>;

    dropdown?: number;
    show_row?: number;
    selectedValues: (number | null)[] = [];
    filteredItems?: CertificationsResponseInterface;
    indexCechkbox: number = -1;

    visible = false;
    visibleToupdate = false;

    openToupdate(): void {
        if (this.selectedValues.length === 0) {
            this.notification.create('error', 'Error', 'Please select a certificate to update', {nzPlacement: "bottomLeft"});
        } else {
            this.visibleToupdate = true;
        }
    }

    OkToupdate() {
        this.updateCertificationComponent.handleOk()
        this.applyFilter()
    }

    closeToupdate(): void {
        this.visibleToupdate = false;
    }

    filterParams = {
        doctor_id: null,
        manager_id: null,
        mode_date: 'date',
        nbr_days: null,
        validation: null,
        year: new Date(),
        exclude_date_planned: false,
        page: 1
    };

    constructor(
        private certificatesService: CertificatesService,
        private notification: NzNotificationService
    ) {
    }

    ngOnInit(): void {
        let checkAll = document.getElementById("checkAll");
        checkAll?.addEventListener("change", function (event: any) {
            let table = checkAll?.closest("table");
            let checkboxes: any = table?.querySelectorAll("input[type=checkbox]");
            for (let i = 0; i < checkboxes.length; i++) {
                let checkbox = checkboxes[i];
                checkbox.checked = event.target.checked;
            }
        });

        this.filterCertificates(this.filterParams);
    }

    downloadFile(fileName: string) {
        const baseUrl = 'http://127.0.0.1:8011';
        const fullUrl = `${baseUrl}/${fileName}`;
        window.open(fullUrl, '_blank');
    }

    table_interact1: boolean = false;

    openModelDelete() {
        if (this.selectedValues.length === 0 && !this.table_interact1) {
            this.notification.create('error', 'Error', 'Please select a certificate to delete', {nzPlacement: "bottomLeft"});
        } else {
            this.notification.blank(
                'Delete Certificate',
                `Are you sure you want to delete this certificate ${this.selectedValues}? `,
                {
                    nzButton: this.ConfurmDelete,
                    nzPlacement: "bottomLeft"
                }
            );
        }
    }

    // Helper function to get file name from URL
    getFileName(url: string): string {
        return url.split('/').pop() || 'unknown';
    }

    ConfumeDelte() {
        const validValues = this.selectedValues.filter((value): value is number => value !== null);
        this.certificatesService.DeleteCertification(this.filteredItems!.items[Number(this.indexCechkbox)].employeeId, validValues).subscribe(() => {
            this.filterCertificates(this.filterParams);
            this.selectedValues = [];
            this.notification.create('success', 'Success', 'Certificate deleted successfully', {nzPlacement: "bottomLeft"});
        });
    }

    getFileSize(url: string): string {
        // You might need an actual service to get file sizes
        if (url.includes('resume')) {
            return '2.4mb';
        } else if (url.includes('coverletter')) {
            return '4.5mb';
        }
        return 'unknown';
    }

    filterCertificates(filterParams: any, page: number = 1): void {
        console.log('Filtering certificates with params:', filterParams);
        console.log('formatFilterParams:', this.formatFilterParams(filterParams));
        const formattedParams = this.formatFilterParams(filterParams);
        this.certificatesService.FilterCertificates(formattedParams, page).subscribe(
            (response: CertificationsResponseInterface) => {
                this.filteredItems = response;
            },
            (error) => {
                console.error('Error filtering certificates', error);
                this.notification.create(
                    'error',
                    'Error filtering certificates',
                    error.error.detail,
                    {nzPlacement: "bottomLeft"}
                );
                this.filteredItems = undefined;
            }
        );
    }

    formatFilterParams(params: any) {
        const formattedParams = {...params};

        if (params.from_date) {
            formattedParams.from_date = this.formatDate(params.from_date);
        }
        if (params.to_date) {
            formattedParams.to_date = this.formatDate(params.to_date);
        }

        if (params.year instanceof Date) {
            formattedParams.year = params.year.getFullYear();

            if (params.mode_date === 'year') {
                formattedParams.month = null;
                formattedParams.day = null;
            } else if (params.mode_date === 'month') {
                formattedParams.month = params.year.getMonth() + 1;
                formattedParams.day = null;
            } else {
                formattedParams.month = params.year.getMonth() + 1;
                formattedParams.day = params.year.getDate();
            }
        } else {
            const date = new Date(params.year);
            formattedParams.year = date.getFullYear();

            if (params.mode_date === 'year') {
                formattedParams.month = null;
                formattedParams.day = null;
            } else if (params.mode_date === 'month') {
                formattedParams.month = date.getMonth() + 1;
                formattedParams.day = null;
            } else {
                formattedParams.month = date.getMonth() + 1;
                formattedParams.day = date.getDate();
            }
        }

        return formattedParams;
    }

    formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    open(): void {
        this.visible = true;
    }

    close(): void {
        this.visible = false;
    }

    onChanegCheckBox(index: any) {
        if (this.filteredItems?.items[index]) {
            const id = Number(this.filteredItems.items[index].id);
            const idIndex = this.selectedValues.indexOf(id);
            this.indexCechkbox = index;

            if (idIndex === -1) {
                this.selectedValues.push(id);
                this.indexCechkbox = index;
            } else {
                this.selectedValues.splice(idIndex, 1);
                this.indexCechkbox = -1;
            }
        }
    }

    applyFilter() {
        this.filterCertificates(this.filterParams);
        this.close();
    }

    onPageChange(page: number): void {
        this.filterParams.page = page;
        this.filterCertificates(this.filterParams, page);
    }

    modelExportation = false;

    dateExport = new Date();
    isConfirmLoading = false;

    onChangeDateExport($event: Date) {
        this.dateExport = $event;
    }

    onCancelExportation() {
        this.modelExportation = false;
    }

    onOkExportation() {
        this.isConfirmLoading = true;
        this.certificatesService.exportationKPI(this.dateExport.getFullYear()).subscribe((data) => {
            this.notification.create('success', data.message, data.file_path, {nzPlacement: "bottomLeft"});
            this.modelExportation = false;
        }, (error) => {
            this.notification.create('error', 'Error', 'Error exporting data', {nzPlacement: "bottomLeft"});
            this.modelExportation = false;
        });
    }

    openExportation() {
        this.modelExportation = true;
    }

    visiblemployeeInfo = false;

    employeeInfo() {
        this.visiblemployeeInfo = true;
    }

    closeemployeeInfo(): void {
        this.visiblemployeeInfo = false;
    }
}
