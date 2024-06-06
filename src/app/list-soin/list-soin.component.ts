import {Component, ViewChild} from '@angular/core';
import {CreateMedicamentComponent} from "../list-medicament/create-medicament/create-medicament.component";
import {NzModalComponent} from "ng-zorro-antd/modal";
import {NzModalModule} from 'ng-zorro-antd/modal';
import {CreateSoinComponent} from "./create-soin/create-soin.component";

@Component({
  selector: 'app-list-soin',
  standalone: true,
  imports: [
    CreateMedicamentComponent,
    NzModalComponent,
    NzModalModule,
    CreateSoinComponent
  ],
  templateUrl: './list-soin.component.html',
})
export class ListSoinComponent {

  @ViewChild(CreateSoinComponent) createSoinComponent!: CreateSoinComponent;

  CreateisVisible = false;

  constructor() {
  }

  CreateshowModal(): void {
    this.CreateisVisible = true;
  }

  CreatehandleOk(): void {
    console.log('Button ok clicked!');
    this.CreateisVisible = false;
    this.createSoinComponent.onSubmit()
  }

  CreatehandleCancel(): void {
    console.log('Button cancel clicked!');
    this.CreateisVisible = false;
  }
}
