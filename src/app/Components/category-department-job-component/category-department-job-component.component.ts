import {Component, EventEmitter, forwardRef, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {CategoryItemData, DepartmentItemData, JobItemData} from "../../interfaces/ListDeprtemnt";
import {DepartmentService} from "../../list-department/department.service";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {NgForOf} from "@angular/common";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzButtonModule} from 'ng-zorro-antd/button';

@Component({
  selector: 'app-category-department-job-component',
  standalone: true,
  imports: [
    NzSelectComponent,
    ReactiveFormsModule,
    NgForOf,
    NzOptionComponent,
    NzButtonComponent,
    NzButtonModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CategoryDepartmentJobComponentComponent),
      multi: true
    }
  ],
  templateUrl: './category-department-job-component.component.html',
  styleUrl: './category-department-job-component.component.css'
})
export class CategoryDepartmentJobComponentComponent implements OnInit, ControlValueAccessor {
  form: FormGroup;
  categories: CategoryItemData[] = [];
  selectableDepartments: DepartmentItemData[] = [];
  selectableJobs: JobItemData[] = [];

  @Output() selectionChange = new EventEmitter<{ categories: number[], departments: number[], jobs: number[] }>();

  // ControlValueAccessor Interface
  onChange: any = () => { };
  onTouched: any = () => { };

  constructor(private fb: FormBuilder, private dataService: DepartmentService) {
    this.form = this.fb.group({
      categories: [[]],
      departments: [[]],
      jobs: [[]]
    });
  }

  ngOnInit(): void {
    this.dataService.getDepartments().subscribe(categories => {
      this.categories = this.removeDuplicates(categories, 'name');
    });

    this.form.get('categories')!.valueChanges.subscribe(categoryKeys => {
      // Find all departments associated with selected categories
      const departments = this.categories
        .filter(category => categoryKeys.includes(category.key))
        .flatMap(category => category.departments);
      this.selectableDepartments = this.removeDuplicates(departments, 'name');
      this.form.patchValue({ departments: [], jobs: [] }, { emitEvent: false });
      this.selectableJobs = [];
    });

    this.form.get('departments')!.valueChanges.subscribe(departmentKeys => {
      // Find all jobs associated with selected departments
      const jobs = this.selectableDepartments
        .filter(department => departmentKeys.includes(department.key))
        .flatMap(department => department.jobs);
      this.selectableJobs = this.removeDuplicates(jobs, 'name');
      this.form.patchValue({ jobs: [] }, { emitEvent: false });
    });

    this.form.valueChanges.subscribe(value => {
      this.onChange(value);
      this.selectionChange.emit({
        categories: value.categories,
        departments: value.departments,
        jobs: value.jobs
      });
    });
  }

  removeDuplicates<T extends { [key: string]: any }>(array: T[], key: string): T[] {
    return array.filter((item, index, self) =>
      index === self.findIndex((t) => t[key] === item[key])
    );
  }

  writeValue(value: any): void {
    if (value) {
      this.form.setValue(value, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  // Select All Operations
  selectAllCategories() {
    const allCategoryKeys = this.categories.map(c => c.key);
    this.form.patchValue({ categories: allCategoryKeys });
  }

  deselectAllCategories() {
    this.form.patchValue({ categories: [] });
  }

  selectAllDepartments() {
    const allDepartmentKeys = this.selectableDepartments.map(d => d.key);
    this.form.patchValue({ departments: allDepartmentKeys });
  }

  deselectAllDepartments() {
    this.form.patchValue({ departments: [] });
  }

  selectAllJobs() {
    const allJobIds = this.selectableJobs.map(j => j.id);
    this.form.patchValue({ jobs: allJobIds });
  }

  deselectAllJobs() {
    this.form.patchValue({ jobs: [] });
  }
}
