import {Component, Input, OnInit} from '@angular/core';
import {CreateSoin, Item, Medicament, MedicamentAssociation} from "../InterfaceSoin";
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
      medicamentControl.markAsDirty();
      medicamentControl.updateValueAndValidity();
    }
  }

  onEmployeeSelected(employee: any) {
    if (employee) {
      this.soinForm.patchValue({employee_id: employee.id});
    } else {
      this.soinForm.patchValue({employee_id: null});
    }
  }

  onSubmit(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.soinForm.valid && this.soin) {
        const soinData: CreateSoin = {
          employee_id: this.soinForm.value.employee_id,
          diagnostic: this.soinForm.value.diagnostic,
          soins: this.soinForm.value.soins,
          soins_poste_de_garde: this.soinForm.value.soins_poste_de_garde,
          medicaments: this.soinForm.value.medicament_associations.map((assoc: any) => ({
            medicament_id: assoc.medicament.id,
            quantite: assoc.quantite
          }))
        };

        this.soinService.UpdateSoin(this.soin.id, soinData).subscribe(
          response => {
            this.notification.create(
              'success',
              'Form Update Successful',
              'Your form has been updated successfully.',
              {nzPlacement: 'bottomLeft'}
            );
            resolve();
          },
          error => {
            this.notification.create(
              'error',
              'Form Update Failed',
              'There was an error updating your form. Please try again.',
              {nzPlacement: 'bottomLeft'}
            );
            console.error(error);
            reject(error);
          }
        );
      } else {
        this.notification.create(
          'error',
          'Form Validation Error',
          'Please fill in all required fields before submitting the form.',
          {nzPlacement: 'bottomLeft'}
        );
        reject(new Error('Form validation failed'));
      }
    });
  }
}

