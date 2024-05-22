import { Component } from '@angular/core';
import {CertificationWeekInterface} from "../../months/CertificationWeekInterafce";
import {MonthWeeekService} from "../../months/month-weeek.service";
import {CertificateAnalyseByDepertemt} from "../../../../interfaces/Analyse/CertificateAnalyseByDepertemt";
import {DepartmentTableService} from "../department-table.service";
import {NzTableComponent, NzTbodyComponent, NzTheadComponent} from "ng-zorro-antd/table";
import {DecimalPipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-department-table',
  standalone: true,
  imports: [
    NzTableComponent,
    NzTheadComponent,
    NzTbodyComponent,
    DecimalPipe,
    NgForOf
  ],
  templateUrl: './department-table.component.html',
  styleUrl: './department-table.component.css'
})
export class DepartmentTableComponent {
  data: CertificateAnalyseByDepertemt[] = [];

  constructor(private departmentTableService: DepartmentTableService,
  ) {
  }

  ngOnInit(): void {
    this.departmentTableService.Listdata.subscribe(
        (response: CertificateAnalyseByDepertemt[]) => {
          this.data = response;
        },
        (error) => {
          console.error('Error fetching data', error);
        }
    );
  }
}
