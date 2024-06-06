import {Component, Input, SimpleChanges} from '@angular/core';
import {SpecialtyDistributionByDepartment} from "../../interfaces/ListdoctorInterface";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-by-department',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './by-department.component.html',
  styleUrl: './by-department.component.css'
})
export class ByDepartmentComponent {
  @Input() data: SpecialtyDistributionByDepartment[] = [];
  selectedDepartment: string = '';
  filteredData: { specialty: string, certification_count: number, doctors_count: number }[] = [];

  ngOnInit(): void {
    this.initializeData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      this.initializeData();
    }
  }

  initializeData(): void {
    if (this.data && this.data.length > 0) {
      this.selectedDepartment = this.data[0].Department;
      this.filterData();
    } else {
      this.selectedDepartment = '';
      this.filteredData = [];
    }
  }

  filterData(): void {
    const selected = this.data.find(item => item.Department === this.selectedDepartment);
    this.filteredData = selected ? selected.data : [];
  }


}
