import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {
  CategoryDepartmentJobComponentComponent
} from "../../Components/category-department-job-component/category-department-job-component.component";

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
    date_start: ['', [Validators.required]],
    date_end: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder) {
  }

  onSelectionChange(selection: {categories: number[], departments: number[], jobs: number[]}) {
    console.log('Selection changed:', selection);
  }

}
