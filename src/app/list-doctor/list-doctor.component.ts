import {Component, OnInit} from '@angular/core';
import {DoctorService} from "./doctor.service";
import {ListdoctorInterface} from "../interfaces/ListdoctorInterface";
import {NzTableComponent, NzTbodyComponent, NzTheadComponent} from "ng-zorro-antd/table";
import {NgForOf} from "@angular/common";
import {NzDrawerComponent, NzDrawerContentDirective} from "ng-zorro-antd/drawer";

@Component({
  selector: 'app-list-doctor',
  standalone: true,
  imports: [
    NzTableComponent,
    NzTheadComponent,
    NzTbodyComponent,
    NgForOf,
    NzDrawerComponent,
    NzDrawerContentDirective
  ],
  templateUrl: './list-doctor.component.html'
})
export class ListDoctorComponent implements OnInit{

  listOfData: ListdoctorInterface[] = [];
  visible = false;

  open(): void {
    this.visible = true;
  }
  close(): void {
    this.visible = false;
  }

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.doctorService.getDoctors().subscribe({
      next: (response) => {
        this.listOfData = response.items;
      },
      error: (error) => {
        console.error('Failed to fetch doctors:', error);
      }
    });
  }


}
