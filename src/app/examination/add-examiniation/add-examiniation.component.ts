import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {
  CategoryDepartmentJobComponentComponent
} from "../../Components/category-department-job-component/category-department-job-component.component";
import {mapNumbersToStrings} from "../../helper/mapNumbersToStrings";
import {dateRangeValidator, formatDate} from "../../helper/getCurrentFormattedDate";
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {ExaminitationService} from "../examinitation.service";
import {POSTExamination} from "../../interfaces/ExaminitionInterface";

@Component({
  selector: 'app-add-examiniation',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    NgForOf,
    NzSelectComponent,
    NzOptionComponent,
    CategoryDepartmentJobComponentComponent
  ],
  templateUrl: './add-examiniation.component.html',
})
export class AddExaminiationComponent {

  createAccountForm = this.fb.group({
    name: ['', [Validators.required]],
    seniority: [null, [Validators.required]],
    category: this.fb.array([], Validators.required),
    department_ids: this.fb.array([], Validators.required),
    job_ids: this.fb.array([], Validators.required),
    date_start: [formatDate(new Date()), [Validators.required]],
    date_end: ['', [Validators.required]]
  }, {validators: dateRangeValidator('date_start', 'date_end')});


  constructor(private fb: FormBuilder,
              private notification: NzNotificationService,
              private examinitationService: ExaminitationService) {
  }

  onSelectionChange(selection: { categories: number[], departments: number[], jobs: number[] }) {
    this.updateFormArray('job_ids', selection.jobs);
    this.updateFormArray('category', mapNumbersToStrings(selection.categories));
    this.updateFormArray('department_ids', selection.departments);
  }

  onSubmit() {
    if (this.createAccountForm.invalid) {
      this.notification.create(
        'error',
        'Error',
        'Please fill in all required fields before submitting the form.',
        {nzPlacement: 'bottomLeft'}
      );
    }

    const formData: POSTExamination = {
      name: this.createAccountForm.value.name ? this.createAccountForm.value.name : "",
      seniority: this.createAccountForm.value.seniority ? +this.createAccountForm.value.seniority : null,
      category: Array.isArray(this.createAccountForm.value.category)
        ? this.createAccountForm.value.category.map(String)
        : [],
      department_ids: Array.isArray(this.createAccountForm.value.department_ids) ? this.createAccountForm.value.department_ids.map(Number) : [],
      job_ids: Array.isArray(this.createAccountForm.value.job_ids) ? this.createAccountForm.value.job_ids.map(Number) : [],
      date_start: this.createAccountForm.value.date_start ? this.createAccountForm.value.date_start : "",
      date_end: this.createAccountForm.value.date_end ? this.createAccountForm.value.date_end : ""
    };
    this.examinitationService.NewConsulation(formData).subscribe({
      next: () => {
        this.notification.create(
          'success',
          'Success',
          'Examination has been created successfully.',
          {nzPlacement: 'bottomLeft'}
        );
      },
      error: () => {
        this.notification.create(
          'error',
          'Error',
          'Failed to create examination. Please try again later.',
          {nzPlacement: 'bottomLeft'}
        );
      }
    });

  }

  // Helper function to update FormArray fields
  updateFormArray(fieldName: string, values: number[] | string[]) {
    // Access the FormArray from the form
    const formArray = this.createAccountForm.get(fieldName) as FormArray;

    if (!formArray) {
      console.error(`${fieldName} FormArray is not found in the form!`);
      return;
    }

    // Log current state of the FormArray

    // Clear the existing FormArray
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }

    // Set the new values for the FormArray
    values.forEach(value => {
      formArray.push(this.fb.control(value));
    });

    // Log the updated state of the FormArray
  }
}
