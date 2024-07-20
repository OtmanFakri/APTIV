import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {NzColDirective} from "ng-zorro-antd/grid";
import {NzAutosizeDirective, NzInputDirective} from "ng-zorro-antd/input";
import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";
import {NzSwitchComponent} from "ng-zorro-antd/switch";
import {NzInputNumberComponent} from "ng-zorro-antd/input-number";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {EmployeeIdInputComponent} from "../../Components/employee-id-input/employee-id-input.component";
import {CreateOrUpdateRequest, ListInjuryItems} from '../InterfacesInjury';
import {ShiftSelectorComponent} from "../../Components/shift-selector/shift-selector.component";
import {getShiftOptions, ShiftEnum} from "../../enum/ShiftEnum";
import {Item} from "../../interfaces/ListEmployee";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-create-or-update',
    standalone: true,
    imports: [
        NzFormItemComponent,
        ReactiveFormsModule,
        NzFormLabelComponent,
        NzFormControlComponent,
        NzColDirective,
        NzInputDirective,
        NzDatePickerComponent,
        NzSwitchComponent,
        NzAutosizeDirective,
        NzInputNumberComponent,
        NzButtonComponent,
        NzFormDirective,
        EmployeeIdInputComponent,
        ShiftSelectorComponent,
        NgIf
    ],
    templateUrl: './create-or-update.component.html',
})
export class CreateOrUpdateComponent implements OnInit {

    @Input() existingData: ListInjuryItems | null = null;
    @Input() isUpdateMode = false;

    form!: FormGroup;
    currentShift: ShiftEnum | null = null;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.initForm();
        if (this.isUpdateMode && this.existingData) {
            console.log('Updating existing record', this.existingData)
            this.populateForm();
            console.log('Form populated', this.form.value)
        }
    }

    initForm() {
        this.form = this.fb.group({
            shift: ['', Validators.required],
            incident_datetime: [null, Validators.required],
            location_of_incident: ['', Validators.required],
            work_station: ['', Validators.required],
            type_of_incident: ['', Validators.required],
            body_parts_affected: ['', Validators.required],
            is_visited: [false],
            object_that_caused_injury: ['', Validators.required],
            description_of_incident: [''],
            transfer_to_hospital: [false],
            number_of_days_of_absence: [0, [Validators.required, Validators.min(0)]],
            employee_id: [null, [Validators.required, Validators.min(1)]]
        });
    }

    populateForm() {
        if (this.existingData) {
            // Create a copy of the existing data
            const formData = {...this.existingData};

            // Convert the string date to a Date object for the date picker


            // Convert the shift string to the corresponding enum value
            if (formData.shift) {
                const shiftOptions = getShiftOptions();
                const matchingShift = shiftOptions.find(option => option.label === formData.shift);
                if (matchingShift) {
                    formData.shift = matchingShift.value;
                }
            }

            // Patch the form with the modified data
            this.form.patchValue(formData);
        }
    }


    setShetft($event: ShiftEnum) {
        this.form.patchValue({
            shift: $event
        });
        this.currentShift = $event;
    }

    setEmployee($event: Item | null) {
        this.form.patchValue({
            employee_id: $event ? $event.id : null
        })
    }
}
