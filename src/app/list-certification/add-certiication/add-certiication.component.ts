import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {getISOWeek} from "date-fns";
import {NzDatePickerComponent, NzRangePickerComponent} from "ng-zorro-antd/date-picker";
import {NzAutocompleteComponent, NzAutocompleteTriggerDirective} from "ng-zorro-antd/auto-complete";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {DoctorService} from "../../list-doctor/doctor.service";
import {CertificationsRequestInterface} from "../../interfaces/ListCertificationInterface";
import {DoctorRequestInterface} from "../../interfaces/ListdoctorInterface";
import {CertificatesService} from "../certificates.service";
import {formatDate} from "../../helper/getCurrentFormattedDate";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {UploadingFileComponent} from "../../Components/uploading-file/uploading-file.component";
import {NzUploadFile} from "ng-zorro-antd/upload";
import {UploadingFileService} from "../../Components/uploading-file/uploading-file.service";
import {ShiftEnum} from "../../enum/ShiftEnum";
import {NgForOf, NgIf} from "@angular/common";
import {ManagerSelectComponent} from "../../Components/manager-select/manager-select.component";

@Component({
    selector: 'app-add-certiication',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        FormsModule,
        NzRangePickerComponent,
        NzDatePickerComponent,
        NzAutocompleteTriggerDirective,
        NzAutocompleteComponent,
        NzSelectComponent,
        NzOptionComponent,
        UploadingFileComponent,
        NgForOf,
        NgIf,
        ManagerSelectComponent,
    ],
    templateUrl: './add-certiication.component.html',
})
export class AddCertiicationComponent {
    form: FormGroup;
    Duration: string = '0 day';
    optionsDoctors: string[] = [];
    optionsSpecialties: string[] = [];
    date = null;
    private delayTimer?: number; // Timer to manage the delay
    Listfile: File[] = [];
    shiftEnumEntries: [string, string][];


    constructor(private fb: FormBuilder,
                public certificatesService: CertificatesService,
                private notification: NzNotificationService,
                private uploadingFileService: UploadingFileService,
                public doctorService: DoctorService) {
        this.form = this.fb.group({
            employee_id: [null, Validators.required],
            doctor_name: [null, Validators.required],
            doctor_specialty: [null, Validators.required],
            validation: [null, Validators.required],
            nb_days: [null, Validators.required],
            date_start: [null, Validators.required],
            date_end: [null, Validators.required],
            dateRange: [null, Validators.required],
            is_visited: [null,],
            shift: [null, Validators.required],
            confirmred_id: [null,]
            // Handles both dates
        });
        this.shiftEnumEntries = Object.entries(ShiftEnum);

    }

    get nbDays() {
        return this.form.get('nb_days')?.value ?? 0; // Default to 0 if null
    }

    onValidationChange(value: string): void {
        if (value !== 'VPO') {
            this.form.get('vpoDetails')?.reset();
        }
    }

    onSubmit(employeeId: Number) {
        console.log(this.form.value);
        var date = new Date();

        const doctorRequest: DoctorRequestInterface = {
            name: this.form.get('doctor_name')?.value,
            specialty: this.form.get('doctor_specialty')?.value,
        };
        const certificationRequest: CertificationsRequestInterface = {
            doctor: doctorRequest,
            date: formatDate(date), // Use actual date here
            date_start: formatDate(this.form.get('date_start')?.value), // Use actual start date here
            date_end: formatDate(this.form.get('date_end')?.value), // Use actual end date here
            validation: this.form.get('validation')?.value, // Use actual validation status here
            date_planned: null, // Use actual planned date or null
            nbr_days: Number(this.form.get('nb_days')?.value), // Use actual number of days here
            is_visited: this.form.get('is_visited')?.value ?? false, // Use actual is_visited status here
            shift: this.form.get('shift')?.value,
            confirmed_id: this.form.get('confirmred_id')?.value ?? null
        }
        console.log(employeeId)

        this.certificatesService.createCertification(Number(employeeId), certificationRequest).subscribe({
            next: (response) => {
                console.log('Certification created:', response);

                this.notification.create(
                    "success",
                    'Certification created',
                    response.message,
                    {nzPlacement: "bottomLeft"}
                );
                if (this.Listfile.length > 0) {
                    this.uploadingFileService.uploadWithCertificationId(response.id, this.Listfile).subscribe({
                        next: (response) => {
                            console.log('Files uploaded:', response);
                            this.notification.create(
                                "success",
                                'Files uploaded',
                                response.message,
                                {nzPlacement: "bottomLeft"}
                            );
                        },
                        error: (err) => {
                            console.error('Error uploading files:', err);
                            this.notification.create(
                                "error",
                                'Error uploading files',
                                err.message,
                                {nzPlacement: "bottomLeft"}
                            );
                        }
                    });
                }
            },
            error: (err) => {
                console.error('Error creating certification:', err);
                this.notification.create(
                    "error",
                    `Certification created ID_error: ${employeeId}`,
                    err.message,
                    {nzPlacement: "bottomLeft"}
                );
                console.log('Error Details:', err.error);
            }
        });

    }

    calculateDuration(startDate: Date, endDate: Date): string {
        if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
            const diff = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
            this.Duration = diff > 0 ? diff + ' days' : '0 day';
            return this.Duration;
        }
        return '0 day';
    }

    onRangeChange(result: Date[]): void {
        if (result && result.length === 2) {
            const [start, end] = result;
            this.form.patchValue({
                date_start: start,
                date_end: end
            });
            this.calculateDuration(start, end);
        }
    }


    onInputDoctors(event: Event): void {
        const value = (event.target as HTMLInputElement).value;
        this.logChange(value, 'doctor');
    }

    onInputSpecialty(event: Event): void {
        const value = (event.target as HTMLInputElement).value;
        this.logChange(value, 'specialty');
    }

    onFileListChange(fileList: File[]): void {
        this.Listfile = fileList;
        console.log('Updated file list:', this.Listfile);

    }

    logChange(value: string, type: string) {
        // Clear the existing timeout to ensure only the last change is logged
        if (this.delayTimer) {
            clearTimeout(this.delayTimer);
        }

        // Set a new timeout
        this.delayTimer = setTimeout(() => {
            if (type === 'doctor') {
                this.doctorService.searchDoctors(value).subscribe(
                    (result) => {
                        this.optionsDoctors = result.map((doctor) => doctor.name);
                    },
                    (error) => {
                        console.error('Error fetching doctors:', error);
                    }
                );
            } else if (type === 'specialty') {
                this.doctorService.searchSpecialties(value).subscribe(
                    (result) => {
                        this.optionsSpecialties = result.map((doctor) => doctor.specialty);
                    },
                    (error) => {
                        console.error('Error fetching specialties:', error);
                    }
                );
            }
            this.delayTimer = undefined; // Clear the timer reference once executed
        }, 2000); // Delay of 2000 milliseconds (2 seconds)
    }
}
