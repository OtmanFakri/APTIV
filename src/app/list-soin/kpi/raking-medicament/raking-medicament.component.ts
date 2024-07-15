import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {RakingCategoryComponent} from "./raking-category/raking-category.component";
import {RakingService} from "./raking.service";
import {InterfaceRankingMedicament, InterfaceRankingMedicamentParams} from "./InterfaceRankingMedicament";
import {extractDateComponents} from "../../../helper/getCurrentFormattedDate";

@Component({
    selector: 'app-raking-medicament',
    standalone: true,
    imports: [
        RakingCategoryComponent
    ],
    templateUrl: './raking-medicament.component.html',
})
export class RakingMedicamentComponent implements OnInit {
    rankingDataCategory!: InterfaceRankingMedicament;
    @Input() mode: 'date' | 'month' | 'year' = 'date';
    @Input() selectedDate: Date | null | undefined;

    constructor(private rankingService: RakingService) {
    }

    ngOnInit(): void {
        this.loadRankingData()
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['mode'] || changes['selectedDate']) {
            this.loadRankingData();
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


}
