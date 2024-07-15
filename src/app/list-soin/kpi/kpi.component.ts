import {Component, Input} from '@angular/core';
import {MedicamentKpiCategoryComponent} from "./medicament-kpi-category/medicament-kpi-category.component";
import {RakingMedicamentComponent} from "./raking-medicament/raking-medicament.component";

@Component({
  selector: 'app-kpi',
  standalone: true,
    imports: [
        MedicamentKpiCategoryComponent,
        RakingMedicamentComponent
    ],
  templateUrl: './kpi.component.html',
})
export class KpiComponent {
  @Input() selectedDate: Date | null | undefined;
  @Input() indexTabs: number | undefined;
  @Input() mode: 'date' | 'month' | 'year' = 'date';


}
