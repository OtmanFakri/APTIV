import {Component, Input} from '@angular/core';
import {InterfaceRankingMedicament_gendre} from "../InterfaceRankingMedicament";
import {NgForOf} from "@angular/common";

@Component({
    selector: 'app-raking-gendre',
    standalone: true,
    imports: [
        NgForOf
    ],
    templateUrl: './raking-gendre.component.html',
})
export class RakingGendreComponent {
    @Input() rankingData!: InterfaceRankingMedicament_gendre

}
