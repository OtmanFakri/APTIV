import {Component, Input} from '@angular/core';
import {MedicamentKpiCategoryComponent} from "./medicament-kpi-category/medicament-kpi-category.component";

@Component({
  selector: 'app-kpi',
  standalone: true,
  imports: [
    MedicamentKpiCategoryComponent
  ],
  templateUrl: './kpi.component.html',
})
export class KpiComponent {
  @Input() selectedDate: Date | null | undefined;
  @Input() indexTabs: number | undefined;
  @Input() mode: 'date' | 'month' | 'year' = 'date';


}
