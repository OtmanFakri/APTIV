import {Component, Input, SimpleChanges} from '@angular/core';
import {SpecialtyDistributionByCategory, SpecialtyDistributionBygendre} from "../../interfaces/ListdoctorInterface";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-by-category',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './by-category.component.html',
  styleUrl: './by-category.component.css'
})
export class ByCategoryComponent {

  @Input() data: SpecialtyDistributionByCategory[] = [];
  selectedCategory: string = '';
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
      this.selectedCategory = this.data[0].category;
      this.filterData();
    } else {
      this.selectedCategory = '';
      this.filteredData = [];
    }
  }

  filterData(): void {
    const selected = this.data.find(item => item.category === this.selectedCategory);
    this.filteredData = selected ? selected.data : [];
  }

}
