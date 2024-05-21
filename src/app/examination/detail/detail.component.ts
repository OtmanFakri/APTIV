import {Component, OnInit} from '@angular/core';
import {NzTabComponent, NzTabSetComponent} from "ng-zorro-antd/tabs";
import {EmployeeExaminitionComponent} from "./employee-examinition/employee-examinition.component";
import {OverviewComponent} from "./overview/overview.component";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    NzTabSetComponent,
    NzTabComponent,
    EmployeeExaminitionComponent,
    OverviewComponent
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit{

  id: string | null = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }

}
