import {Component, OnInit} from '@angular/core';
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
import {DatePipe, NgForOf} from "@angular/common";
import {PaginationComponent} from "../../../Components/pagination/pagination.component";

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
    PaginationComponent
  ],
  templateUrl: './info-certification.component.html',
})
export class InfoCertificationComponent implements OnInit {
  isVisible = false;
  isOkLoading = false;
  date = null;
  userId: any;
  certificates: CertificateEmployee | null = null;
  currentPage: number = 1;
  totalPages: number = 5;
  selectedItem?: Item;


  constructor(private route: ActivatedRoute,
              private certificatesService: CertificatesService) {
  }

  ngOnInit() {
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
    this.certificatesService.getCertificates(employee_id,this.currentPage,this.totalPages).subscribe(data => {
      this.certificates = data;
    });
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    console.log('New page:', newPage)
    // Load your data based on the new page
    this.loadCertificates(this.userId);
  }
  showModal(item: Item): void {
    this.selectedItem = item;
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }


  onChange(result: Date[]): void {
    console.log('onChange: ', result);
  }

  getWeek(result: Date[]): void {
    console.log('week: ', result.map(getISOWeek));
  }
}
