import {Component, OnInit, ViewChild} from '@angular/core';
import {CreateMedicamentComponent} from "../list-medicament/create-medicament/create-medicament.component";
import {NzModalComponent} from "ng-zorro-antd/modal";
import {NzModalModule} from 'ng-zorro-antd/modal';
import {CreateSoinComponent} from "./create-soin/create-soin.component";
import {NzSelectModule} from 'ng-zorro-antd/select';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {Item, ReadSoinInterface} from "./InterfaceSoin";
import {SoinService} from "./soin.service";
import {NzDrawerModule} from 'ng-zorro-antd/drawer';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {FormsModule} from "@angular/forms";
import {NzSpaceComponent, NzSpaceItemDirective} from "ng-zorro-antd/space";
import {extractDateComponents} from "../helper/getCurrentFormattedDate";
import {UpdateSoinComponent} from "./update-soin/update-soin.component";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzTabsModule} from 'ng-zorro-antd/tabs';
import {MedicamentKpiCategoryComponent} from "./kpi/medicament-kpi-category/medicament-kpi-category.component";
import {KpiComponent} from "./kpi/kpi.component";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenInterceptor} from "../auth/TokenInterceptor";

@Component({
  selector: 'app-list-soin',
  standalone: true,
  imports: [
    CreateMedicamentComponent,
    NzModalComponent,
    NzModalModule,
    CreateSoinComponent,
    NzSelectModule,
    NgForOf,
    NzDrawerModule,
    NzDatePickerModule,
    FormsModule,
    NzSpaceItemDirective,
    NzSpaceComponent,
    DatePipe,
    UpdateSoinComponent,
    NzButtonComponent,
    NzTabsModule,
    NgIf,
    MedicamentKpiCategoryComponent,
    KpiComponent
  ],
  templateUrl: './list-soin.component.html',
})
export class ListSoinComponent implements OnInit {

  @ViewChild(CreateSoinComponent) createSoinComponent!: CreateSoinComponent;
  @ViewChild(UpdateSoinComponent) updateSoinComponent!: UpdateSoinComponent;

  items!: ReadSoinInterface;
  CreateisVisible = false;
  mode: 'date' | 'month' | 'year' = 'date';
  selectedDate: Date | null = new Date();
  indexTabs = 0;

  KpiDate = new Date();

  isCreating = false;
  isUpdating = false;
  isDeleting = false;

  constructor(private soinService: SoinService) {
  }

  ngOnInit(): void {
    this.onDateChange(this.selectedDate);
  }

  CreateshowModal(): void {
    this.CreateisVisible = true;
  }

  CreatehandleOk(): void {
    this.isCreating = true;
    this.createSoinComponent.onSubmit().then(() => {
      this.CreateisVisible = false;
      this.refreshList();
      this.isCreating = false;
    }).catch((error) => {
      this.isCreating = false;
      console.error('Error creating soin:', error);
    });
  }

  refreshList(): void {
    const {year, month, day} = extractDateComponents(this.selectedDate, this.mode);
    this.fetachSoin(Number(year), Number(month), Number(day));
  }

  fetachSoin(year?: number, month?: number, day?: number): void {
    this.soinService.ReadSoin({year, month, day}).subscribe(
      (data: ReadSoinInterface) => {
        this.items = data;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  CreatehandleCancel(): void {
    this.CreateisVisible = false;
  }

  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  Updatevisible = false;
  selectedItem!: Item;

  updateItem(item: Item): void {
    console.info('Update item:', item)
    this.Updatevisible = true;
    this.selectedItem = item;
  }

  UpdatehandleOk(): void {
    this.isUpdating = true;
    this.updateSoinComponent.onSubmit().then(() => {
      this.isUpdating = false;
      this.Updatevisible = false;
      this.refreshList();
    }).catch(() => {
      this.isUpdating = false;
    });
  }

  deleteItem(): void {
    this.isDeleting = true;
    this.soinService.DelateSoin(this.selectedItem.id).subscribe(
      () => {
        this.refreshList();
        this.Updatevisible = false;
        this.isDeleting = false;
      },
      (error) => {
        console.error('Error deleting item:', error);
        this.isDeleting = false;
      }
    );
  }

  onModeChange(mode: 'date' | 'month' | 'year'): void {
    this.mode = mode;
    this.onDateChange(this.selectedDate); // Update the data whenever the mode changes
  }

  onDateChange(date: Date | null): void {
    const {year, month, day} = extractDateComponents(date, this.mode);
    this.fetachSoin(Number(year), Number(month), Number(day));
  }

  onTabChange($event: number) {
    this.indexTabs = $event
  }

  onKpiDateChange($event: any) {
    this.KpiDate = $event;
  }

  onKpiModeChange($event: any) {
    this.mode = $event;
  }

  UpdatehandleCancel() {
    this.Updatevisible = false;
  }

}
