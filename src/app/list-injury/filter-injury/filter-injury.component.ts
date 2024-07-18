import {Component} from '@angular/core';
import {CategorySelectComponent} from "../../Components/category-select/category-select.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DepartmentSelectComponent} from "../../Components/department-select/department-select.component";

@Component({
    selector: 'app-filter-injury',
    standalone: true,
    imports: [
        CategorySelectComponent,
        FormsModule,
        ReactiveFormsModule,
        DepartmentSelectComponent
    ],
    templateUrl: './filter-injury.component.html',
})
export class FilterInjuryComponent {
    filterForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.filterForm = this.fb.group({
            category: [null],
            department: [null]
        });
    }

    onSubmit() {
        console.log('Form submitted with value:', this.filterForm.value);
    }

}
