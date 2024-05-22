import {Component} from '@angular/core';
import {CertificationWeekInterface} from "../../CertificationWeekInterafce";
import {MonthWeeekService} from "../../month-weeek.service";
import {NzTableComponent, NzTbodyComponent, NzTheadComponent} from "ng-zorro-antd/table";
import {DatePipe, DecimalPipe, NgForOf} from "@angular/common";

@Component({
    selector: 'app-table-week',
    standalone: true,
  imports: [
    NzTableComponent,
    NzTheadComponent,
    NzTbodyComponent,
    NgForOf,
    DatePipe,
    DecimalPipe
  ],
    templateUrl: './table-week.component.html',
    styleUrl: './table-week.component.css'
})
export class TableWeekComponent {

    data: CertificationWeekInterface[] = [];

    constructor(private weekService: MonthWeeekService,
                ) {
    }

    ngOnInit(): void {
        this.weekService.Listdata.subscribe(
            (response: CertificationWeekInterface[]) => {
                this.data = response;
            },
            (error) => {
                console.error('Error fetching data', error);
            }
        );
    }
}
