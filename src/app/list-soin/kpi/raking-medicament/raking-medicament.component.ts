import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {RakingCategoryComponent} from "./raking-category/raking-category.component";
import {RakingService} from "./raking.service";
import {
    InterfaceRankingMedicament, InterfaceRankingMedicament_Depar, InterfaceRankingMedicament_gendre,
    InterfaceRankingMedicamentParams,
    RankingMedicament_Department
} from "./InterfaceRankingMedicament";
import {extractDateComponents} from "../../../helper/getCurrentFormattedDate";
import {RakingDepartmentComponent} from "./raking-department/raking-department.component";
import {RakingGendreComponent} from "./raking-gendre/raking-gendre.component";

@Component({
    selector: 'app-raking-medicament',
    standalone: true,
    imports: [
        RakingCategoryComponent,
        RakingDepartmentComponent,
        RakingGendreComponent
    ],
    templateUrl: './raking-medicament.component.html',
})
export class RakingMedicamentComponent implements OnInit {
    rankingDataCategory!: InterfaceRankingMedicament;
    @Input() mode: 'date' | 'month' | 'year' = 'date';
    @Input() selectedDate: Date | null | undefined;
    rankingDataDepartment!: InterfaceRankingMedicament_Depar;
    RankingMedicament_gendre!: InterfaceRankingMedicament_gendre;

    constructor(private rankingService: RakingService) {
    }

    ngOnInit(): void {
        this.loadRankingData();
        this.loadRankingDataDepartment();
        this.loadRankingDataGendre()
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['mode'] || changes['selectedDate']) {
            this.loadRankingData();
            this.loadRankingDataDepartment();
            this.loadRankingDataGendre()
        }
    }

    loadRankingData() {
        const ss = extractDateComponents(this.selectedDate!, this.mode)
        const params: InterfaceRankingMedicamentParams = {
            year: ss.year !== null ? ss.year : new Date().getFullYear(),
            month: ss.month !== null ? ss.month : undefined,
            day: ss.day !== null ? ss.day : undefined
        };
        this.rankingService.getRankingCategortMedicaments(params).subscribe(
            (data) => {
                this.rankingDataCategory = data;
            },
            (error) => {
                console.error('Error fetching ranking data:', error);
            }
        );
    }

    loadRankingDataDepartment() {
        const ss = extractDateComponents(this.selectedDate!, this.mode)
        const params: InterfaceRankingMedicamentParams = {
            year: ss.year !== null ? ss.year : new Date().getFullYear(),
            month: ss.month !== null ? ss.month : undefined,
            day: ss.day !== null ? ss.day : undefined
        };
        this.rankingService.getRankingDepartmentMedicaments(params).subscribe(
            (data) => {
                this.rankingDataDepartment = data;
            },
            (error) => {
                console.error('Error fetching ranking data:', error);
            }
        );
    }

    loadRankingDataGendre() {
        const ss = extractDateComponents(this.selectedDate!, this.mode)
        const params: InterfaceRankingMedicamentParams = {
            year: ss.year !== null ? ss.year : new Date().getFullYear(),
            month: ss.month !== null ? ss.month : undefined,
            day: ss.day !== null ? ss.day : undefined
        };
        this.rankingService.getRankingGendreMedicaments(params).subscribe(
            (data) => {
                this.RankingMedicament_gendre = data;
            },
            (error) => {
                console.error('Error fetching ranking data:', error);
            }
        );
    }


}
