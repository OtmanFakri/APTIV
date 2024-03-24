import {ChangeDetectorRef, Component} from '@angular/core';
import {NzStepComponent, NzStepsComponent} from "ng-zorro-antd/steps";
import {PersoneInformationComponent} from "./steps/persone-information/persone-information.component";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {JsonPipe, NgIf} from "@angular/common";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

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
    ReactiveFormsModule
  ],
  templateUrl: './add-profile.component.html'
})
export class AddProfileComponent {

  constructor( private cdr: ChangeDetectorRef) {}

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
  });

  get personeInformation(): FormGroup {
    return this.multipleForm.get('personeInformation') as FormGroup;
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

  onSubmit(): void {
    console.log('Form submitted:', this.multipleForm.value);
    // Handle the form submission logic here
  }


}
