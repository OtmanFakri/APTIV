import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NzModalComponent, NzModalContentDirective, NzModalModule} from "ng-zorro-antd/modal";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {ShowCertificationComponent} from "./show-certification/show-certification.component";
import {NzDatePickerComponent, NzRangePickerComponent} from "ng-zorro-antd/date-picker";
import {getISOWeek} from 'date-fns';
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ProfileService} from "../../profile.service";
import {CertificatesService} from "../../../list-certification/certificates.service";
import {CertificateEmployee, Item} from "../../../interfaces/CertificateEmployee";
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {PaginationComponent} from "../../../Components/pagination/pagination.component";
import {TableComponent} from "../../../Components/table/table.component";
import {NzTrDirective} from "ng-zorro-antd/table";
import {NzNotificationComponent, NzNotificationService} from "ng-zorro-antd/notification";
import {DoctorRequestInterface} from "../../../interfaces/ListdoctorInterface";
import {
    CertificationsRequestInterface,
    CertificationsResponseInterface
} from "../../../interfaces/ListCertificationInterface";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {NzTabComponent, NzTabSetComponent} from "ng-zorro-antd/tabs";
import {NzDrawerComponent, NzDrawerContentDirective} from "ng-zorro-antd/drawer";
import {UploadingFileComponent} from "../../../Components/uploading-file/uploading-file.component";
import {UploadingFileService} from "../../../Components/uploading-file/uploading-file.service";
import {
    UpdateCertificationComponent
} from "../../../list-certification/update-certification/update-certification.component";


@Component({
    selector: 'app-info-certification',
    standalone: true,
    imports: [
        NzModalComponent,
        NzModalContentDirective,
        NzButtonComponent,
        NzModalModule,
        ShowCertificationComponent,
        NzRangePickerComponent,
        NzDatePickerComponent,
        FormsModule,
        NgForOf,
        DatePipe,
        PaginationComponent,
        TableComponent,
        NgIf,
        NzTrDirective,
        NgClass,
        NzSelectComponent,
        NzOptionComponent,
        NzTabSetComponent,
        NzTabComponent,
        NzDrawerComponent,
        NzDrawerContentDirective,
        UploadingFileComponent,
        UpdateCertificationComponent
    ],
    templateUrl: './info-certification.component.html',
})
export class InfoCertificationComponent implements OnInit {
    @ViewChild(UpdateCertificationComponent) updateCertificationComponent!: UpdateCertificationComponent;

    userId: any;
    certificates!: CertificationsResponseInterface;
    currentPage: number = 1;
    totalPages: number = 5;
    dropdown?: number;
    indexCechkbox: number = -1;
    show_row?: number;
    selectedValues: (number | null)[] = [];
    table_interact1: boolean = false;
    @ViewChild('notificationBtnTpl', {static: true}) ConfurmDelete!: TemplateRef<{
        $implicit: NzNotificationComponent
    }>;
    ListFile: File[] = [];
    date: Date = new Date();
    selectedValue = null;

    downloadFile(fileName: string) {
        const baseUrl = 'http://127.0.0.1:8011';
        const fullUrl = `${baseUrl}/${fileName}`;
        window.open(fullUrl, '_blank');
    }

    getFileName(url: string): string {
        return url.split('/').pop() || 'unknown';
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

    onChange(result: Date): void {
        console.log('onChange: ', result);
        this.date = result;
        this.loadCertificates(this.userId);
    }

    visible = false;

    open(): void {
        this.visible = true;
    }

    close(): void {
        this.visible = false;
    }

    constructor(private route: ActivatedRoute,
                private notification: NzNotificationService,
                private uploadingFileService: UploadingFileService,
                private certificatesService: CertificatesService) {

    }

    isVisibleUpdate = false;


    handleCancel(): void {
        this.isVisibleUpdate = false;
    }

    ngOnInit() {
        let checkAll = document.getElementById("checkAll");
        checkAll?.addEventListener("change", function (event: any) {
            let table = checkAll?.closest("table");
            let checkboxes: any = table?.querySelectorAll("input[type=checkbox]");
            for (let i = 0; i < checkboxes.length; i++) {
                let checkbox = checkboxes[i];
                checkbox.checked = event.target.checked;
            }
        });


        if (this.route.parent) {
            this.route.parent.paramMap.subscribe(params => {
                this.userId = params.get('id');
                this.loadCertificates(this.userId);
            });
        } else {
            // Handle the case where parent is null if necessary
            console.error('Parent route is not available.');
        }
    }


    loadDoctorData() {
        if (this.indexCechkbox != -1) {
            this.isVisibleUpdate = true;
            const selectedItem = this.certificates?.items[Number(this.indexCechkbox)];
            console.log(selectedItem)
        } else {
            this.notification.create(
                'error',
                'Error',
                'Please select a certificate to update',
                {nzPlacement: "bottomLeft"}
            );
        }
    }

// Helper function to format date into YYYY-MM-DD
    formatDate(date: Date): string {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = `${d.getMonth() + 1}`.padStart(2, '0');
        const day = `${d.getDate()}`.padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    loadCertificates(employee_id: number) {
        this.certificatesService.getCertificates(employee_id, this.currentPage, this.totalPages, this.date.getFullYear()).subscribe(data => {
            this.certificates = data;
        }, error => {
            this.notification.error(
                'Error',
                'Failed Laoding Certification',
                {nzPlacement: "bottomLeft"}
            )
        });
    }

    onPageChange(newPage: number): void {
        this.currentPage = newPage;
        // Load your data based on the new page
        this.loadCertificates(this.userId);
    }

    onChanegCheckBox(index: any) {
        // Toggle the checkbox state for the specific item
        if (this.certificates?.items[index]) {
            const id = Number(this.certificates.items[index].id);

            // Check if the id is already selected
            const idIndex = this.selectedValues.indexOf(id);
            this.indexCechkbox = index;

            if (idIndex === -1) {
                // If not selected, add it to the selectedValues
                this.selectedValues.push(id);
                this.indexCechkbox = index;

            } else {
                // If already selected, remove it from the selectedValues
                this.selectedValues.splice(idIndex, 1);
                this.indexCechkbox = -1;

            }


        }
    }


    protected readonly console = console;

    Ondelete() {
        if (this.selectedValues.length === 0 && !this.table_interact1) {
            this.notification.create('error',
                'Error',
                'Please select a certificate to delete',
                {nzPlacement: "bottomLeft"});
        } else {
            // Assuming you want to prompt for deletion for each selected value
            this.notification.blank(
                'Delete Certificate',
                `Are you sure you want to delete this certificate ${this.selectedValues.length}? `,
                {
                    nzButton: this.ConfurmDelete,
                    nzPlacement: "bottomLeft"
                }
            );
        }
    }

    ConfumeDelte() {
        const validValues = this.selectedValues.filter((value): value is number => value !== null);
        this.certificatesService.DeleteCertification(this.userId, validValues).subscribe(() => {
            this.loadCertificates(this.userId);
            this.selectedValues = [];
            this.notification.create('success',
                'Success',
                'Certificate deleted successfully',
                {nzPlacement: "bottomLeft"});
        });

    }

    handleOk() {
        this.updateCertificationComponent.handleOk()
    }
}
