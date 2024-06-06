import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-create-soin',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './create-soin.component.html',
})
export class CreateSoinComponent {
  medicalForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.medicalForm = this.fb.group({
      employee_id: [1, Validators.required],
      diagnostic: this.fb.array([this.fb.control('')]),
      medicaments: this.fb.array([this.createMedicamentGroup()]),
      soins: this.fb.array([this.fb.control('')]),
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

  addDiagnostic() {
    this.diagnostic.push(this.fb.control(''));
  }

  removeDiagnostic(index: number) {
    this.diagnostic.removeAt(index);
  }

  addMedicament() {
    this.medicaments.push(this.createMedicamentGroup());
  }

  removeMedicament(index: number) {
    this.medicaments.removeAt(index);
  }

  addSoin() {
    this.soins.push(this.fb.control(''));
  }

  removeSoin(index: number) {
    this.soins.removeAt(index);
  }

  onSubmit() {
    console.log(this.medicalForm.value);
  }
}
