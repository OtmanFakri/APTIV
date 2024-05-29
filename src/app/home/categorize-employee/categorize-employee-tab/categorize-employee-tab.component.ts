import { Component } from '@angular/core';
import {CategorizeEmployeeService} from "../categorize-employee.service";
import {CategorizeEmployeeInterface} from "../CategorizeEmployeeServiceInterface";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-categorize-employee-tab',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './categorize-employee-tab.component.html',
  styleUrl: './categorize-employee-tab.component.css'
})
export class CategorizeEmployeeTabComponent {
  dataList?: CategorizeEmployeeInterface;


  constructor(private categorizeEmployeeService: CategorizeEmployeeService) {
    this.categorizeEmployeeService.categorizedEmployees.subscribe(
      (data: CategorizeEmployeeInterface) => {
        this.dataList = data;
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }

}
