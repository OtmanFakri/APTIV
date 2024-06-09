import {Component, Input, OnInit} from '@angular/core';
import {Item, Medicament, MedicamentAssociation} from "../InterfaceSoin";
import {FormArray, FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {EmployeeIdInputComponent} from "../../Components/employee-id-input/employee-id-input.component";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {SelectMedicamentComponent} from "../../Components/select-medicament/select-medicament.component";
import {ReadMedicament} from "../../list-medicament/InterfacesMedicaments";
import {SoinService} from "../soin.service";
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-update-soin',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    EmployeeIdInputComponent,
    NgForOf,
    NzOptionComponent,
    NzSelectComponent,
    SelectMedicamentComponent,
    ReactiveFormsModule
  ],
  templateUrl: './update-soin.component.html',
})
export class UpdateSoinComponent implements OnInit {
  @Input() soin: Item | null = null;
  soinForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private soinService: SoinService,
              private notification: NzNotificationService) {
  }

  ngOnInit() {
    this.initForm();

    if (this.soin) {
      this.patchForm();
    }
  }

  initForm() {
    this.soinForm = this.fb.group({
      employee_id: [0, Validators.required],
      diagnostic: [[]],
      soins: [[]],
      soins_poste_de_garde: [''],
      medicament_associations: this.fb.array([])
    });
  }

  patchForm() {
    if (this.soin) {
      this.soinForm.patchValue({
        employee_id: this.soin.employee_id,
        diagnostic: this.soin.diagnostic,
        soins: this.soin.soins,
        soins_poste_de_garde: this.soin.soins_poste_de_garde
      });

      this.soin.medicament_associations.forEach(assoc => {
        this.addMedicament(assoc);
      });
    }
  }

  get medicamentAssociations() {
    return this.soinForm.get('medicament_associations') as FormArray;
  }

  addMedicament(association: MedicamentAssociation | null = null) {
    const medicamentForm = this.fb.group({
      medicament: [association?.medicament || {id: 0, name: '', quantity: 0, id_product: 0}],
      quantite: [association?.quantite || 1, [Validators.required, Validators.min(1)]]
    });
    this.medicamentAssociations.push(medicamentForm);
  }

  removeMedicament(index: number) {
    this.medicamentAssociations.removeAt(index);
  }

  medicamentSelect(medication: ReadMedicament, index: number) {
    const medicamentControl = this.medicamentAssociations.at(index).get('medicament');
    if (medicamentControl) {
      medicamentControl.setValue(medication);
    }
  }

  onEmployeeSelected(employee: any) {
    this.soinForm.patchValue({employee_id: employee.id});
  }

  onSubmit() {
    if (this.soinForm.valid && this.soin) {
      const formValue = this.soinForm.value;
      console.log('Form submitted', formValue);
      this.soinService.UpdateSoin(this.soin.id, formValue).subscribe(
        response => {
          console.log('Form submission successful:', response);
          this.notification.success(
            'Form Submission Successful',
            'Your form has been submitted successfully.',
            {nzPlacement: 'bottomLeft'}
          );
        },
        error => {
          this.notification.error(
            'Form Submission Failed',
            'An error occurred while submitting your form.',
            {nzPlacement: 'bottomLeft'}
          );
          console.error('Error submitting form:', error);
        }
      );
    } else {
      // Mark all fields as touched to show validation errors
      Object.values(this.soinForm.controls).forEach(control => {
        control.markAsTouched();
        control.updateValueAndValidity();
      });
    }
  }
}
