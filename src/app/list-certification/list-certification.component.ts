import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {PaginationComponent} from "../Components/pagination/pagination.component";
import {RouterLink} from "@angular/router";
import {NzTableCellDirective, NzTrDirective} from "ng-zorro-antd/table";
import {NzDatePickerComponent, NzRangePickerComponent} from "ng-zorro-antd/date-picker";
import { getISOWeek } from 'date-fns';
import {NzModalComponent, NzModalContentDirective, NzModalModule} from "ng-zorro-antd/modal";
import {
  ShowCertificationComponent
} from "../profile/me/info-certification/show-certification/show-certification.component";



interface ListCertification {
  id: number;
  date: string;
  datePlanned: string;
  dateStart: string;
  dateEnd: string;
  nbrDaysDateEntry: number;
  validate: boolean;
}
@Component({
  selector: 'app-list-certification',
  standalone: true,
  imports: [
    FormsModule,
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
    NzModalContentDirective
  ],
  templateUrl: './list-certification.component.html',
})
export class ListCertificationComponent {
  searchTerm: string= '';
  isFilterOpen: boolean = false;
  dateCertification = null;
  isVisible: boolean = false;
  isConfirmLoading = false;

  onChange(result: Date[]): void {
    console.log('onChange: ', result);
  }

  getWeek(result: Date[]): void {
    console.log('week: ', result.map(getISOWeek));
  }

  public list: ListCertification[] = [
    {
      id: 1,
      date: '2024-03-28',
      datePlanned: '2024-03-29',
      dateStart: '2024-03-30',
      dateEnd: '2024-03-31',
      nbrDaysDateEntry: 3,
      validate: true
    },
    {
      id: 2,
      date: '2024-03-29',
      datePlanned: '2024-03-30',
      dateStart: '2024-03-31',
      dateEnd: '2024-04-01',
      nbrDaysDateEntry: 4,
      validate: false
    },
    {
      id: 3,
      date: '2024-03-30',
      datePlanned: '2024-03-31',
      dateStart: '2024-04-01',
      dateEnd: '2024-04-02',
      nbrDaysDateEntry: 2,
      validate: true
    },
    {
      id: 1,
      date: '2024-03-28',
      datePlanned: '2024-03-29',
      dateStart: '2024-03-30',
      dateEnd: '2024-03-31',
      nbrDaysDateEntry: 3,
      validate: true
    },
    {
      id: 2,
      date: '2024-03-29',
      datePlanned: '2024-03-30',
      dateStart: '2024-03-31',
      dateEnd: '2024-04-01',
      nbrDaysDateEntry: 4,
      validate: false
    },
    {
      id: 3,
      date: '2024-03-30',
      datePlanned: '2024-03-31',
      dateStart: '2024-04-01',
      dateEnd: '2024-04-02',
      nbrDaysDateEntry: 2,
      validate: true
    },
    {
      id: 1,
      date: '2024-03-28',
      datePlanned: '2024-03-29',
      dateStart: '2024-03-30',
      dateEnd: '2024-03-31',
      nbrDaysDateEntry: 3,
      validate: true
    },
    {
      id: 2,
      date: '2024-03-29',
      datePlanned: '2024-03-30',
      dateStart: '2024-03-31',
      dateEnd: '2024-04-01',
      nbrDaysDateEntry: 4,
      validate: false
    },
    {
      id: 3,
      date: '2024-03-30',
      datePlanned: '2024-03-31',
      dateStart: '2024-04-01',
      dateEnd: '2024-04-02',
      nbrDaysDateEntry: 2,
      validate: true
    },

  ];

  showModal() {
    this.isVisible = true;
  }
  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
