import {Component, Input, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {NzTrDirective} from "ng-zorro-antd/table";
import {RouterLink} from "@angular/router";
import {CertificateEmployee} from "../../interfaces/CertificateEmployee";

@Component({
    selector: 'app-table',
    standalone: true,
  imports: [
    NgClass,
    NgIf,
    NgForOf,
    NzTrDirective,
    RouterLink
  ],
    templateUrl: './table.component.html',
})
export class TableComponent implements OnInit {
    @Input() tableData?: CertificateEmployee | null = null;
    dropdown?: number;
    show_row?: number;
    table_interact1: boolean = false;


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
