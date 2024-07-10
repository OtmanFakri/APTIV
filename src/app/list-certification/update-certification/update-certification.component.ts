import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {DoctorRequestInterface} from "../../interfaces/ListdoctorInterface";
import {CertificationsRequestInterface, Item} from "../../interfaces/ListCertificationInterface";
import {NzNotificationComponent, NzNotificationService} from "ng-zorro-antd/notification";
import {UploadingFileService} from "../../Components/uploading-file/uploading-file.service";
import {CertificatesService} from "../certificates.service";
import {ManagerSelectComponent} from "../../Components/manager-select/manager-select.component";
import {NgForOf, NgIf} from "@angular/common";
import {SearchManger} from "../../interfaces/ListEmployee";
import {convertFormToRequest} from "../certification-helper";
import {getShiftOptions, ShiftOption} from "../../enum/ShiftEnum";

@Component({
    selector: 'app-update-certification',
    standalone: true,
    imports: [
        FormsModule,
        NzSelectComponent,
        NzOptionComponent,
        ReactiveFormsModule,
        ManagerSelectComponent,
        NgIf,
        NgForOf
    ],
    templateUrl: './update-certification.component.html',
})
export class UpdateCertificationComponent implements OnInit {
    @Input() certification!: Item;
    ListFile: File[] = [];
    certificationForm: FormGroup;
    shiftOptions: ShiftOption[];

    constructor(
        private fb: FormBuilder,
        private notification: NzNotificationService,
        private uploadingFileService: UploadingFileService,
        private certificatesService: CertificatesService
    ) {
        this.certificationForm = this.fb.group({
            doctor_name: ['', Validators.required],
            doctor_speciality: ['', Validators.required],
            date: [null, Validators.required],
            date_start: [null, Validators.required],
            date_end: [null, Validators.required],
            validation: ['', Validators.required],
            date_planned: [null,],
            nbr_days: [null, Validators.required],
            is_visited: [false,],
            shift: ['', Validators.required],
            confirmed: [null]
        });
        this.shiftOptions = getShiftOptions();
    }

    ngOnInit() {
        if (this.certification) {
            this.certificationForm.patchValue({
                doctor_name: this.certification.doctor_name,
                doctor_speciality: this.certification.doctor_speciality,
                date: this.formatDate(this.certification.date),
                date_start: this.formatDate(this.certification.date_start),
                date_end: this.formatDate(this.certification.date_end),
                validation: this.certification.validation,
                date_planned: this.formatDate(this.certification.date_planned),
                nbr_days: this.certification.nbr_days,
                is_visited: this.certification.is_visited,
                shift: this.certification.shift,
            });
        }
        if (this.certification.confirmed_id) {
            const managerValue: SearchManger = {
                id: this.certification.confirmed_id,
                full_name: this.certification.confirmed ?? ''
            };
            this.certificationForm.get('confirmed')?.setValue(managerValue);
        }
    }

    get get_nb_certificationvalidation() {
        return this.certificationForm.get('nbr_days')?.value
    }


    handleOk(): void {
        if (this.certificationForm.valid) {
            const formValue = this.certificationForm.value;
            let requestData: CertificationsRequestInterface = convertFormToRequest(this.certificationForm);

            // Ensure 'confirmed' is only included when 'validation' is 'VPO'
            if (formValue.validation !== 'VPO') {
                requestData = {...requestData, confirmed_id: null};
            }

            console.log('Request Data:', requestData);

            this.certificatesService.updateCertificate(this.certification.employeeId, this.certification.id, requestData).subscribe({
                next: (response) => {
                    console.log('Update response:', response);
                    this.notification.create('success', 'Success', 'Certificate updated successfully', {nzPlacement: "bottomLeft"});
                    // Optionally, emit an event to refresh the parent component's data
                    // this.certificateUpdated.emit();
                },
                error: (error) => {
                    console.error('Error updating certificate:', error);
                    if (error.error && error.error.detail) {
                        // If there's a specific error message from the server, display it
                        this.notification.create('error', 'Update Error', error.error.detail, {nzPlacement: 'bottomLeft'});
                    } else {
                        // Generic error message
                        this.notification.create('error', 'Update Error', 'Failed to update certificate. Please try again.', {nzPlacement: 'bottomLeft'});
                    }
                }
            });
        } else {
            const validationErrors = this.getFormValidationErrors(this.certificationForm);
            console.log('Validation Errors:', validationErrors);
            this.notification.create('error', 'Validation Error', `Please correct the following errors: ${validationErrors.join(', ')}`, {nzPlacement: 'bottomLeft'});
        }
    }

    private getFormValidationErrors(form: FormGroup): string[] {
        const errors: string[] = [];
        for (const controlName in form.controls) {
            const control = form.get(controlName);
            if (control && control.invalid) {
                const controlErrors = control.errors;
                if (controlErrors) {
                    for (const key in controlErrors) {
                        errors.push(`${controlName}: ${this.getErrorMessage(key, controlErrors[key])}`);
                    }
                }
            }
        }
        return errors;
    }

    private getErrorMessage(errorKey: string, errorValue: any): string {
        const errorMessages: { [key: string]: string } = {
            required: 'is required',
            minlength: `minimum length is ${errorValue.requiredLength}`,
            maxlength: `maximum length is ${errorValue.requiredLength}`,
            // Add other error messages here as needed
        };
        return errorMessages[errorKey] || 'is invalid';
    }

    onFileListChange(fileList: File[]): void {
        this.ListFile = fileList;
    }

    // Helper function to format date into YYYY-MM-DD
    private formatDate(date: Date | string | null): string | null {
        if (!date) return null;
        const d = new Date(date);
        const year = d.getFullYear();
        const month = `${d.getMonth() + 1}`.padStart(2, '0');
        const day = `${d.getDate()}`.padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
}