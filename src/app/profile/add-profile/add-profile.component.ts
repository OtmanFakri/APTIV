import {ChangeDetectorRef, Component} from '@angular/core';
import {NzStepComponent, NzStepsComponent} from "ng-zorro-antd/steps";
import {PersoneInformationComponent} from "./steps/persone-information/persone-information.component";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {JsonPipe, NgIf} from "@angular/common";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProfessionalInformationComponent} from "./steps/professional-information/professional-information.component";
import {RolesInformationComponent} from "./steps/roles-information/roles-information.component";
import {NzNotificationService} from "ng-zorro-antd/notification";

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

  constructor( private notification: NzNotificationService) {}

  current = 0;

  multipleForm: FormGroup = new FormGroup<any>({
    personeInformation: new FormGroup({
      last_name: new FormControl('', Validators.required),
      first_name: new FormControl('', Validators.required),
      cin: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      sexe: new FormControl('', Validators.required),
      date_birth: new FormControl('', Validators.required),
      cnss: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      region: new FormControl('', Validators.required),
    }),
    professionalInformation: new FormGroup({
      mtc: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      department: new FormControl('', Validators.required),
      job: new FormControl('', Validators.required),
      date_hiring: new FormControl('', Validators.required),
      date_start: new FormControl('', Validators.required),
      date_visit: new FormControl('', Validators.required),
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
      this.notification
        .blank(
          'Notification Title',
          'Form is valid. Form submitted'
        )
        .onClick.subscribe(() => {
        console.log('Form is valid. Form submitted:', this.multipleForm.value);
      });
    } else {
      console.log('Form is invalid.');
    }
  }




}
