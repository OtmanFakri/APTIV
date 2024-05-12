import {Component, OnInit} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NzUploadComponent} from "ng-zorro-antd/upload";
import {NzButtonComponent} from "ng-zorro-antd/button";

@Component({
  selector: 'app-examination',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    FormsModule,
    NzUploadComponent,
    NzButtonComponent
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
