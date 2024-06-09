import {Component} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {EmployeeIdInputComponent} from "../../Components/employee-id-input/employee-id-input.component";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzDrawerModule} from 'ng-zorro-antd/drawer';
import {InfoEmployeeComponent} from "../../list-certification/info-employee/info-employee.component";
import {SelectMedicamentComponent} from "../../Components/select-medicament/select-medicament.component";
import {ReadMedicament} from "../../list-medicament/InterfacesMedicaments";
import {SoinService} from "../soin.service";
import {CreateSoin} from "../InterfaceSoin";

@Component({
  selector: 'app-create-soin',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    NzSelectComponent,
    NzOptionComponent,
    EmployeeIdInputComponent,
    NgIf,
    NzDrawerModule,
    InfoEmployeeComponent,
    SelectMedicamentComponent
  ],
  templateUrl: './create-soin.component.html',
})
export class CreateSoinComponent {
  medicalForm: FormGroup;
  employee_selected: any;
  listOfdiagnostic: string[] = [];
  listOfsoins: string[] = []

  constructor(private fb: FormBuilder,
              private soinService: SoinService,
              private notification: NzNotificationService) {
    this.medicalForm = this.fb.group({
      employee_id: [null, Validators.required],
      diagnostic: this.fb.array([this.fb.control([])], Validators.required), // Initialize as an array
      medicaments: this.fb.array([this.createMedicamentGroup()], Validators.required),
      soins: this.fb.array([this.fb.control([])],), // Initialize as an array
      soins_poste_de_garde: ['', Validators.required]
    });
  }

  get diagnostic() {
    return this.medicalForm.get('diagnostic') as FormArray;
  }

  get medicaments() {
    return this.medicalForm.get('medicaments') as FormArray;
  }

  get soins() {
    return this.medicalForm.get('soins') as FormArray;
  }

  createMedicamentGroup() {
    return this.fb.group({
      medicament_id: ['', Validators.required],
      quantite: ['', Validators.required]
    });
  }

  get diagnosticControl(): FormControl {
    return this.diagnostic.at(0) as FormControl;
  }

  addMedicament() {
    this.medicaments.push(this.createMedicamentGroup());
  }

  removeMedicament(index: number) {
    this.medicaments.removeAt(index);
  }

  get soinsControl(): FormControl {
    return this.soins.at(0) as FormControl;
  }


  onSubmit() {
    if (this.medicalForm.valid) {
      const soinData: CreateSoin = {
        ...this.medicalForm.value,
        diagnostic: this.diagnostic.controls.flatMap(control => control.value),
        soins: this.soins.controls.flatMap(control => control.value)
      };
      this.soinService.CreateSoin(soinData).subscribe(
        response => {
          this.notification.create(
            'success',
            'Form Submission Successful',
            'Your form has been submitted successfully.',
            {nzPlacement: 'bottomLeft'}
          );
          // You can handle the response here
          console.log(response);
        },
        error => {
          this.notification.create(
            'error',
            'Form Submission Failed',
            'There was an error submitting your form. Please try again.',
            {nzPlacement: 'bottomLeft'}
          );
          // You can handle the error here
          console.error(error);
        }
      );
    } else {
      this.notification.create(
        'error',
        'Form Validation Error',
        'Please fill in all required fields before submitting the form.',
        {nzPlacement: 'bottomLeft'}
      );
    }
  }

  getEmployee($event: any) {
    this.employee_selected = $event;
    this.medicalForm.patchValue({
      employee_id: $event.id
    })
  }

  employeeDetail() {
    if (this.employee_selected !== undefined && this.employee_selected !== null) {
      this.employeeDetailvisible = true;
    }
  }

  employeeDetailvisible = false;


  employeeDetailclose(): void {
    this.employeeDetailvisible = false;
  }

  medicamentSelect($event: ReadMedicament, index: number): void {
    const medicamentArray = this.medicaments;
    if (medicamentArray && medicamentArray.length > index) {
      medicamentArray.at(index).patchValue({medicament_id: $event.id});
    } else {
      this.notification.error('Error', 'Invalid medicament index');
    }
  }

  isOpen($event: boolean) {
    if ($event) {
      this.soinService.Last10soinAndDig().subscribe(
        response => {
          if (Array.isArray(response)) {
            this.listOfdiagnostic = [...new Set(response.flatMap(item => item.diagnostic))];
            this.listOfsoins = [...new Set(response.flatMap(item => item.soins))];

          } else {
            console.error('Unexpected response structure:', response);
          }
        },
        error => {
          console.error('Error fetching diagnostic data:', error);
        }
      );
    }
  }
}
