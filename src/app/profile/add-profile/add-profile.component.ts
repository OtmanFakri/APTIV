import {ChangeDetectorRef, Component} from '@angular/core';
import {NzStepComponent, NzStepsComponent} from "ng-zorro-antd/steps";
import {PersoneInformationComponent} from "./steps/persone-information/persone-information.component";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {JsonPipe, NgIf} from "@angular/common";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProfessionalInformationComponent} from "./steps/professional-information/professional-information.component";
import {RolesInformationComponent} from "./steps/roles-information/roles-information.component";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {ProfileService} from "../profile.service";
import {Router} from "@angular/router";
import {NewEmployee} from '../../interfaces/ListEmployee';

@Component({
    selector: 'app-add-profile',
    standalone: true,
    imports: [
        NzStepsComponent,
        NzStepComponent,
        PersoneInformationComponent,
        NzButtonComponent,
        NgIf,
        JsonPipe,
        ReactiveFormsModule,
        ProfessionalInformationComponent,
        RolesInformationComponent
    ],
    templateUrl: './add-profile.component.html'
})
export class AddProfileComponent {
    profile: NewEmployee | null = null;

    constructor(
        private router: Router,
        private profileService: ProfileService,
        private notification: NzNotificationService) {
    }

    current = 0;

    multipleForm: FormGroup = new FormGroup<any>({
        personeInformation: new FormGroup({
            last_name: new FormControl('', Validators.required),
            first_name: new FormControl('', Validators.required),
            cin: new FormControl('', Validators.required),
            phone: new FormControl('', Validators.required),
            sexe: new FormControl('', Validators.required),
            date_birth: new FormControl('', Validators.required),
            cnss: new FormControl(''),
            city: new FormControl('', Validators.required),
            region: new FormControl('', Validators.required),
            avatar: new FormControl(null,),  // Add this line

        }),
        professionalInformation: new FormGroup({
            mtc: new FormControl(''),
            category: new FormControl(''),
            department: new FormControl('', Validators.required),
            job: new FormControl('', Validators.required),
            manger: new FormControl('', Validators.required),
            date_hiring: new FormControl('', Validators.required),
            date_start: new FormControl('', Validators.required),
            date_visit: new FormControl(''),
        }),
    });

    get personeInformation(): FormGroup {
        return this.multipleForm.get('personeInformation') as FormGroup;
    }

    get professionalInformation(): FormGroup {
        return this.multipleForm.get('professionalInformation') as FormGroup;
    }

    pre(): void {
        this.current -= 1;
    }

    next(): void {
        if (this.current < 2) {
            this.current += 1;
        } else {
            this.onSubmit();
        }
    }

    onIndexChange(index: number): void {
        this.current = index;
    }


    onSubmit(): void {
        if (this.multipleForm.valid) {
            const personeInformationControl = this.multipleForm.get('personeInformation');
            const professionalInformationControl = this.multipleForm.get('professionalInformation');

            if (personeInformationControl && professionalInformationControl) {
                const personeInformationValues = personeInformationControl.value;
                const professionalInformationValues = professionalInformationControl.value;
                console.log("personeInformationValues : ",personeInformationValues);
                const newEmployee: NewEmployee = {
                    id: 0, // Assuming this is generated on the server side
                    department_id: professionalInformationValues.department.key, // Extracting department value
                    job_id: professionalInformationValues.job, // Extracting job value
                    manager_id: professionalInformationValues.manger || null, // Extracting manager value, providing a default value if it's undefined
                    first_name: personeInformationValues.first_name,
                    last_name: personeInformationValues.last_name,
                    cin: personeInformationValues.cin,
                    cnss: personeInformationValues.cnss,
                    phone_number: personeInformationValues.phone,
                    birth_date: personeInformationValues.date_birth,
                    Sexe: personeInformationValues.sexe,
                    city_id: personeInformationValues.city,
                    date_start: professionalInformationValues.date_start,
                    date_hiring: professionalInformationValues.date_hiring,
                    date_end: '', // You can set this value if needed
                    date_visit: professionalInformationValues.date_visit || '', // Providing a default value if it's undefined
                    avatar: personeInformationValues.avatar, // Extracting avatar value
                };
                console.log(newEmployee);

                // You need to pass the newEmployee object, not the NewEmployee interface
                this.profileService.addProfile(newEmployee).subscribe(() => {
                    this.notification.success(
                        'Success',
                        `Profile added successfully ${newEmployee.id}`);
                });
            } else {
                console.error('Either personeInformation or professionalInformation control is null or undefined');
                this.notification.error(
                    'Error',
                    'Either personeInformation or professionalInformation control is null or undefined',
                );
                // Handle the case when either personeInformation or professionalInformation control is null or undefined
            }
        } else {
            this.notification.error('Error',
                this.multipleForm.value,);
        }
    }


}
