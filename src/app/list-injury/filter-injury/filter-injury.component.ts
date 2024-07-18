import {Component} from '@angular/core';
import {CategorySelectComponent} from "../../Components/category-select/category-select.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DepartmentSelectComponent} from "../../Components/department-select/department-select.component";
import {ShiftSelectorComponent} from "../../Components/shift-selector/shift-selector.component";
import {SelectDateComponent} from "../../Components/select-date/select-date.component";
import {extractDateComponents} from "../../helper/getCurrentFormattedDate";
import {InjuryQueryParams} from "../InterfacesInjury";

@Component({
    selector: 'app-filter-injury',
    standalone: true,
    imports: [
        CategorySelectComponent,
        FormsModule,
        ReactiveFormsModule,
        DepartmentSelectComponent,
        ShiftSelectorComponent,
        SelectDateComponent
    ],
    templateUrl: './filter-injury.component.html',
})
export class FilterInjuryComponent {
    filterForm: FormGroup;

    constructor(private fb: FormBuilder) {
        const currentDate = new Date();
        this.filterForm = this.fb.group({
            category: [null],
            department_id: [null],
            shift: [null],
            date: [currentDate.getDate()],
            month: [currentDate.getMonth() + 1],
            year: [currentDate.getFullYear()]
        });
    }


    handleShiftSelected(ShiftEnum: any) {
        this.filterForm.patchValue({
            shift: ShiftEnum
        })
    }

    handleDateChange(event: { date: Date | null, mode: 'date' | 'month' | 'year' }) {
        console.log("event :", event)
        const {year, month, day} = extractDateComponents(event.date, event.mode);
        this.filterForm.patchValue({
            year: year,
            month: month,
            date: day
        });
    }
}
