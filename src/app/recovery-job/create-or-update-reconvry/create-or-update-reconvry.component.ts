import {Component, Input, OnInit} from '@angular/core';
import {RecoveryJobs} from "../InterfacesRecoveryJob";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {NzCheckboxComponent} from "ng-zorro-antd/checkbox";
import {NzAutosizeDirective, NzInputDirective} from "ng-zorro-antd/input";

@Component({
    selector: 'app-create-or-update-reconvry',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NzFormDirective,
        NzFormItemComponent,
        NzFormLabelComponent,
        NzFormControlComponent,
        NzCheckboxComponent,
        NzInputDirective,
        NzAutosizeDirective
    ],
    templateUrl: './create-or-update-reconvry.component.html',
})
export class CreateOrUpdateReconvryComponent implements OnInit {


    @Input() recoveryJob: RecoveryJobs | null = null;
    recoveryForm!: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.recoveryForm = this.fb.group({
            id: [this.recoveryJob?.id, Validators.required],
            description: [this.recoveryJob?.description || '', Validators.required],
            is_in_recovery: [this.recoveryJob?.is_in_recovery || false, Validators.required],
            is_visited: [this.recoveryJob?.is_visited || false, Validators.required],
            certificate_id: [this.recoveryJob?.certificate_id || '', Validators.required],
        });
    }


}
