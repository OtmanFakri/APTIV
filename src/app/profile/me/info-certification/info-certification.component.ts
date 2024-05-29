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
import {CertificationsRequestInterface} from "../../../interfaces/ListCertificationInterface";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {NzTabComponent, NzTabSetComponent} from "ng-zorro-antd/tabs";
import {NzDrawerComponent, NzDrawerContentDirective} from "ng-zorro-antd/drawer";
import {UploadingFileComponent} from "../../../Components/uploading-file/uploading-file.component";
import {UploadingFileService} from "../../../Components/uploading-file/uploading-file.service";


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
    UploadingFileComponent
  ],
  templateUrl: './info-certification.component.html',
})
export class InfoCertificationComponent implements OnInit {
  userId: any;
  certificates: CertificateEmployee | null = null;
  currentPage: number = 1;
  totalPages: number = 5;
  dropdown?: number;
  indexCechkbox?: number | null = null;
  show_row?: number;
  selectedValues: (number | null)[] = [];
  table_interact1: boolean = false;
  @ViewChild('notificationBtnTpl', {static: true}) ConfurmDelete!: TemplateRef<{ $implicit: NzNotificationComponent }>;
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
              private uploadingFileService : UploadingFileService,
              private certificatesService: CertificatesService) {

  }

  onValidationChange(value: string): void {
    console.log('Validation changed to:', value);
    this.certificationsRequestInterface.validation = value;
  }

  isVisibleUpdate = false;

  doctor: DoctorRequestInterface = {
    name: '',
    specialty: ''
  };

  certificationsRequestInterface: CertificationsRequestInterface = {
    doctor: this.doctor,
    date: '',
    date_start: '',
    date_end: '',
    validation: this.selectedValue,
    date_planned: null,
    nbr_days: 0,
    is_visited: false
  }


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

    if (this.indexCechkbox != null) {
      this.isVisibleUpdate = true;

      const selectedItem = this.certificates?.items[Number(this.indexCechkbox)];

      if (selectedItem) {
        this.doctor = {
          name: selectedItem.doctor_name || '',
          specialty: "string" || ''
        };

        this.certificationsRequestInterface = {
          doctor: this.doctor,
          date: selectedItem.date ? this.formatDate(selectedItem.date) : '',
          date_start: selectedItem.date_start ? this.formatDate(selectedItem.date_start) : '',
          date_end: selectedItem.date_end ? this.formatDate(selectedItem.date_end) : '',
          validation: selectedItem.validation || '',
          date_planned: selectedItem.date_planned ? this.formatDate(selectedItem.date_planned) : null,
          nbr_days: selectedItem.nbr_days || 0,
          is_visited: selectedItem.is_visited || false
        };
      }
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
        this.indexCechkbox = null;

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

  handleOk(): void {
    this.isVisibleUpdate = false;

    // Check that certificates and indexCechkbox are defined
    if (!this.certificates?.items || typeof this.indexCechkbox !== 'number') {
      console.error('Certificates or indexCechkbox are undefined');
      this.notification.create('error', 'Error', 'Certificates or indexCechkbox are undefined', {nzPlacement: "bottomLeft"});
      return;

    }

    // Get the certificate ID safely
    const certificateId = this.certificates.items[Number(this.indexCechkbox)]?.id;
    if (typeof certificateId !== 'number') {
      console.error('Certificate ID is undefined or not a number');
      this.notification.create('error', 'Error', 'Certificate ID is undefined or not a number', {nzPlacement: "bottomLeft"});
      return;
    }
    console.log('Certificate ID:', certificateId, 'userId:', this.userId, 'Data:', this.certificationsRequestInterface);
    // Now call the update service
    this.certificatesService.updateCertificate(this.userId, certificateId, this.certificationsRequestInterface).subscribe(() => {
      this.loadCertificates(this.userId);
      this.notification.create('success', 'Success', 'Certificate updated successfully', {nzPlacement: "bottomLeft"});
    });
    // call to upload file
    this.uploadingFileService.uploadWithCertificationId(certificateId, this.ListFile).subscribe(() => {
      this.loadCertificates(this.userId);
    });


  }
  onFileListChange(fileList: File[]): void {
    this.ListFile = fileList;
  }

}
