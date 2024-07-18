import {Component, OnInit, ViewChild} from '@angular/core';
import {InjuryQueryParams, listInjury} from "./InterfacesInjury";
import {InjuryService} from "./injury.service";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {NzSpinComponent} from "ng-zorro-antd/spin";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzDrawerComponent, NzDrawerContentDirective} from "ng-zorro-antd/drawer";
import {FilterInjuryComponent} from "./filter-injury/filter-injury.component";

@Component({
    selector: 'app-list-injury',
    standalone: true,
    imports: [
        NgForOf,
        NzSpinComponent,
        NgIf,
        NzButtonComponent,
        DatePipe,
        NzDrawerComponent,
        NzDrawerContentDirective,
        FilterInjuryComponent
    ],
    templateUrl: './list-injury.component.html',
})
export class ListInjuryComponent implements OnInit {
    @ViewChild(FilterInjuryComponent) filterInjuryComponent!: FilterInjuryComponent;

    injuryItems!: listInjury;
    isLoading = false;
    visibleFilter: boolean = false;

    ngOnInit(): void {
        this.loadInjuryItems()
    }


    constructor(private injuryService: InjuryService) {
    }

    openFilter(): void {
        this.visibleFilter = true;
    }

    closeFilter(): void {
        this.visibleFilter = false;
    }

    loadInjuryItems(filterParams: InjuryQueryParams = {}): void {
        this.isLoading = true;
        this.injuryService.getInjuries(filterParams).subscribe(
            response => {
                this.injuryItems = response;
                this.isLoading = false;
            },
            error => {
                this.isLoading = false;
                console.error('Error loading injury items:', error);
            }
        );
    }


    createNew() {

    }

    OnsubmetFilter() {
        const filterValues = this.filterInjuryComponent.filterForm.value;
        const queryParams: InjuryQueryParams = {
            department_id: filterValues.department_id,
            shift: filterValues.shift,
            day: filterValues.date,
            month: filterValues.month,
            year: filterValues.year
        };
        this.loadInjuryItems(queryParams);
    }

}
