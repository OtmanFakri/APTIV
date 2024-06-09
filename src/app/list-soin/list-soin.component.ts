import {Component, OnInit, ViewChild} from '@angular/core';
import {CreateMedicamentComponent} from "../list-medicament/create-medicament/create-medicament.component";
import {NzModalComponent} from "ng-zorro-antd/modal";
import {NzModalModule} from 'ng-zorro-antd/modal';
import {CreateSoinComponent} from "./create-soin/create-soin.component";
import {NzSelectModule} from 'ng-zorro-antd/select';
import {DatePipe, NgForOf} from "@angular/common";
import {Item, ReadSoinInterface} from "./InterfaceSoin";
import {SoinService} from "./soin.service";
import {NzDrawerModule} from 'ng-zorro-antd/drawer';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {FormsModule} from "@angular/forms";
import {NzSpaceComponent, NzSpaceItemDirective} from "ng-zorro-antd/space";
import {extractDateComponents} from "../helper/getCurrentFormattedDate";
import {UpdateSoinComponent} from "./update-soin/update-soin.component";
import {NzButtonComponent} from "ng-zorro-antd/button";

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
    NzButtonComponent
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

  constructor(private soinService: SoinService) {
  }

  ngOnInit(): void {
    this.onDateChange(this.selectedDate);
  }

  CreateshowModal(): void {
    this.CreateisVisible = true;
  }

  CreatehandleOk(): void {
    this.CreateisVisible = false;
    this.createSoinComponent.onSubmit();
    this.onDateChange(this.selectedDate);
  }

  fetachSoin(year?: number, month?: number, day?: number): void {
    console.log("fetachSoin:", year, month, day);
    this.soinService.ReadSoin({year: year, month: month, day: day}).subscribe((data: ReadSoinInterface) => {
      console.log("fetachSoin21:", year, month, day);
      console.log(data);
      this.items = data;
    });
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
    this.Updatevisible = true;
    this.selectedItem = item;
  }

  UpdatehandleOk(): void {
    this.updateSoinComponent.onSubmit();
  }

  UpdatehandleCancel(): void {
    this.Updatevisible = false;
  }

  deleteItem(id: number): void {
    // Implement the delete functionality here
  }

  onModeChange(mode: 'date' | 'month' | 'year'): void {
    this.mode = mode;
    this.onDateChange(this.selectedDate); // Update the data whenever the mode changes
  }

  onDateChange(date: Date | null): void {
    const {year, month, day} = extractDateComponents(date, this.mode);
    console.log(year, month, day);
    this.fetachSoin(Number(year), Number(month), Number(day));
  }


}
