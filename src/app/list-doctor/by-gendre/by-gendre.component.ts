import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SpecialtyDistributionBygendre} from "../../interfaces/ListdoctorInterface";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-by-gendre',
    standalone: true,
    imports: [
        NgForOf,
        FormsModule
    ],
    templateUrl: './by-gendre.component.html',
    styleUrl: './by-gendre.component.css'
})
export class ByGendreComponent implements OnInit, OnChanges {

    @Input() data: SpecialtyDistributionBygendre[] = [];
    selectedGendre: string = '';
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
            this.selectedGendre = this.data[0].gendre;
            this.filterData();
        } else {
            this.selectedGendre = '';
            this.filteredData = [];
        }
    }

    filterData(): void {
        const selected = this.data.find(item => item.gendre === this.selectedGendre);
        this.filteredData = selected ? selected.data : [];
    }


}
