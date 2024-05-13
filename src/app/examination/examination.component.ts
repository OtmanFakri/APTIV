import {Component, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NzUploadComponent} from "ng-zorro-antd/upload";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzRadioComponent, NzRadioGroupComponent} from "ng-zorro-antd/radio";

@Component({
  selector: 'app-examination',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    FormsModule,
    NzUploadComponent,
    NzButtonComponent,
    NzRadioGroupComponent,
    NzRadioComponent,
    NgForOf
  ],
  templateUrl: './examination.component.html',
})
export class ExaminationComponent implements  OnInit {

  dropdown?: number;
  show_row?: number;
  table_interact1: boolean = false;
  table_interact2: boolean = false;
  table_interact3: boolean = false;
  table_interact4: boolean = false;
  table_interact5: boolean = false;
  table_interact6: boolean = false;
  table_interact7: boolean = false;
  selectedMemory = '8 GB';  // Default selected value, make sure this exists in your options

  memories = [
    { id: 0, name: 'memory-option', value: '4 GB', label: '4 GB', disabled: false },
    { id: 1, name: 'memory-option', value: '8 GB', label: '8 GB', disabled: false },
    { id: 2, name: 'memory-option', value: '16 GB', label: '16 GB', disabled: false },
    { id: 3, name: 'memory-option', value: '32 GB', label: '32 GB', disabled: false },
    { id: 4, name: 'memory-option', value: '64 GB', label: '64 GB', disabled: false },
    { id: 5, name: 'memory-option', value: '128 GB', label: '128 GB', disabled: true }  // Disabled option
  ];

  constructor() {
  }

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
}
