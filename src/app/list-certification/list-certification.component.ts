import {Component, ViewChild} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgClass, NgForOf, NgIf} from "@angular/common";
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
import {date_certification} from "./testjson";



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
    NzDrawerContentDirective,
    NgClass
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

  dropdown?: number;
  show_row?: number;
  table_interact1: boolean = false;
  table_interact2: boolean = false;
  table_interact3: boolean = false;
  table_interact4: boolean = false;
  table_interact5: boolean = false;
  table_interact6: boolean = false;
  table_interact7: boolean = false;
  constructor() {}

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
  }
  onChange(result: Date[]): void {
    console.log('onChange: ', result);
  }

  getWeek(result: Date[]): void {
    console.log('week: ', result.map(getISOWeek));
  }

  public list= date_certification;

  showModal() {
    this.isVisible = true;
  }


  addCertifica = false;


  open(): void {
    this.addCertifica = true;
  }

  close(): void {
    this.addCertifica = false;
  }

  protected readonly date_certification = date_certification;
}
