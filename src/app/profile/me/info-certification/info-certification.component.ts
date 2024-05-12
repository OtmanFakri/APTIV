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
        NgClass
    ],
    templateUrl: './info-certification.component.html',
})
export class InfoCertificationComponent implements OnInit {
    userId: any;
    certificates: CertificateEmployee | null = null;
    currentPage: number = 1;
    totalPages: number = 5;
    dropdown?: number;
    show_row?: number;
    selectedValues: (number | null)[] = [];
    table_interact1: boolean = false;
    @ViewChild('notificationBtnTpl', {static: true}) ConfurmDelete!: TemplateRef<{ $implicit: NzNotificationComponent }>;

    constructor(private route: ActivatedRoute,
                private notification: NzNotificationService,
                private certificatesService: CertificatesService) {
    }

    ngOnInit() {
        let checkAll = document.getElementById("checkAll");
        checkAll?.addEventListener("change", function (event: any) {
            let table = checkAll?.closest("table");
            let checkboxes: any = table?.querySelectorAll("input[type=checkbox]");
            for (let i = 0; i < checkboxes.length; i++) {
                let checkbox = checkboxes[i];
                checkbox.checked = event.target.checked;
                console.log('checkbox_all:', checkbox);
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


    loadCertificates(employee_id: number) {
        this.certificatesService.getCertificates(employee_id, this.currentPage, this.totalPages).subscribe(data => {
            this.certificates = data;
        });
    }

    onPageChange(newPage: number): void {
        this.currentPage = newPage;
        console.log('New page:', newPage)
        // Load your data based on the new page
        this.loadCertificates(this.userId);
    }

  onChanegCheckBox(index: any) {
    // Toggle the checkbox state for the specific item
    if (this.certificates?.items[index]) {
      const id = Number(this.certificates.items[index].id);

      // Check if the id is already selected
      const idIndex = this.selectedValues.indexOf(id);

      if (idIndex === -1) {
        // If not selected, add it to the selectedValues
        this.selectedValues.push(id);
      } else {
        // If already selected, remove it from the selectedValues
        this.selectedValues.splice(idIndex, 1);
      }

      // Log the current state of selectedValues
      console.log('selectedValues:', this.selectedValues);
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
          console.log('delete:', this.selectedValues)
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
}
