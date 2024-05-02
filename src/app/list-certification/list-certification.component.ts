import {Component, ViewChild} from '@angular/core';
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
import {NzDrawerComponent, NzDrawerContentDirective} from "ng-zorro-antd/drawer";
import {AddCertiicationComponent} from "./add-certiication/add-certiication.component";



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
    NzModalContentDirective,
    NzDrawerComponent,
    AddCertiicationComponent,
    NzDrawerContentDirective
  ],
  templateUrl: './list-certification.component.html',
})
export class ListCertificationComponent {
  searchTerm: string= '';
  isFilterOpen: boolean = false;
  dateCertification = null;
  isVisible: boolean = false;
  isConfirmLoading = false;
  @ViewChild(AddCertiicationComponent) addCertificationComponent!: AddCertiicationComponent;

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


  addCertifica = false;

  save() {
    if (this.addCertificationComponent) {
      this.addCertificationComponent.onSubmit();
      console.log('this.addCertificationComponent',);
    }
  }
  open(): void {
    this.addCertifica = true;
  }

  close(): void {
    this.addCertifica = false;
  }
}
