import {Component, Input} from '@angular/core';
import {InterfaceRankingMedicament_Depar, RankingMedicament_Department} from "../InterfaceRankingMedicament";
import {NgForOf} from "@angular/common";

@Component({
    selector: 'app-raking-department',
    standalone: true,
    imports: [
        NgForOf
    ],
    templateUrl: './raking-department.component.html',
})
export class RakingDepartmentComponent {
    @Input() rankingData!: InterfaceRankingMedicament_Depar

}
