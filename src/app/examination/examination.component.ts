import {Component, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NzUploadComponent, NzUploadFile} from "ng-zorro-antd/upload";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzRadioComponent, NzRadioGroupComponent} from "ng-zorro-antd/radio";
import {NzModalComponent} from "ng-zorro-antd/modal";
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {NzInputNumberComponent} from "ng-zorro-antd/input-number";
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import {AddExaminiationComponent} from "./add-examiniation/add-examiniation.component";


const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

@Component({
  selector: 'app-examination',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    NzInputNumberModule,
    NzModalModule,
    FormsModule,
    NzUploadComponent,
    NzButtonComponent,
    NzRadioGroupComponent,
    NzRadioComponent,
    NgForOf,
    NzModalComponent,
    NgStyle,
    NzDatePickerComponent,
    NzOptionComponent,
    NzSelectComponent,
    ReactiveFormsModule,
    NzInputNumberComponent,
    AddExaminiationComponent
  ],
  templateUrl: './examination.component.html',
})
export class ExaminationComponent implements OnInit {


  constructor() {
  }

  ngOnInit(): void {

  }
  isCreate = false;


  showCreate(): void {
    this.isCreate = true;
  }

  handleCreateOk(): void {
    console.log('Button ok clicked!');
    this.isCreate = false;
  }

  handleCreateCancel(): void {
    console.log('Button cancel clicked!');
    this.isCreate = false;
  }

}
