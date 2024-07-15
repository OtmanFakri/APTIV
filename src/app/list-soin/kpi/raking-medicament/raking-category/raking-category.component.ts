import {Component, Input} from '@angular/core';
import {InterfaceRankingMedicament} from "../InterfaceRankingMedicament";
import {NgForOf} from "@angular/common";

@Component({
    selector: 'app-raking-category',
    standalone: true,
  imports: [
    NgForOf
  ],
    templateUrl: './raking-category.component.html',
})
export class RakingCategoryComponent {
    @Input() rankingData!: InterfaceRankingMedicament;

}
