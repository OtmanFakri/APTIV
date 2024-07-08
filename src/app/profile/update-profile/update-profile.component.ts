import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {City, NewEmployee, RegionsResponse, SearchManger} from "../../interfaces/ListEmployee";
import {ProfileEmployee} from "../../interfaces/profileEmployee";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NzUploadComponent, NzUploadFile} from "ng-zorro-antd/upload";
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {DepartmentService} from "../../list-department/department.service";
import {EmployeeService} from "../../list-employee/employee.service";
import {CategoryItemData, DepartmentItemData, JobItemData} from "../../interfaces/ListDeprtemnt";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {CategoryInfo, Department, EmployeeDetails, EmployeeDetailsManager, EmployeeUpdate, Job} from "../Interfaces";
import {Category} from "../../examination/InterfacesExaminitaion";
import {NzEmptyComponent} from "ng-zorro-antd/empty";
import {ManagerSelectComponent} from "../../Components/manager-select/manager-select.component";

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzUploadComponent,
    NzSelectComponent,
    NzOptionComponent,
    NgForOf,
    NgClass,
    NgIf,
    NzEmptyComponent,
    ManagerSelectComponent
  ],
  templateUrl: './update-profile.component.html',
})
export class UpdateProfileComponent implements OnInit {
  @Input() profile: EmployeeDetails | null = null;
  profileForm: FormGroup;
  categories: CategoryInfo[] = [];
  filteredDepartments: Department[] = [];
  filteredJobs: Job[] = [];
  isLoading = false;
  cities: any;

  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private departmentService: DepartmentService,
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef
  ) {
    this.profileForm = this.fb.group({
      id: [{value: '', disabled: true}],
      category: ['', Validators.required],
      department_id: ['', Validators.required],
      job_id: ['', Validators.required],
      manager_id: [null],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      cin: ['', Validators.required],
      cnss: ['', Validators.required],
      phone_number: ['', Validators.required],
      birth_date: ['', Validators.required],
      Sexe: ['', Validators.required],
      city_id: ['', Validators.required],
      date_start: ['', Validators.required],
      date_hiring: ['', Validators.required],
      date_visit: [''],
      date_end: ['']
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.loadDepartments().then(() => {
      if (this.profile) {
        this.updateForm(this.profile);
      }
      this.isLoading = false;
    });
  }

  loadDepartments(): Promise<void> {
    return new Promise((resolve) => {
      this.departmentService.getDepartmentsIndex().subscribe(
        (data: CategoryInfo[]) => {
          this.categories = data;
          resolve();
        },
        error => {
          console.error('Error loading departments', error);
          resolve();
        }
      );
    });
  }

  onCategoryChange(category: string): void {
    const selectedCategory = this.categories.find(c => c.category === category);
    this.filteredDepartments = selectedCategory ? selectedCategory.departments : [];
    this.profileForm.get('department_id')?.setValue(null);
    this.profileForm.get('job_id')?.setValue(null);
    this.filteredJobs = [];
  }

  onDepartmentChange(departmentId: number): void {
    const selectedDepartment = this.filteredDepartments.find(d => d.id === departmentId);
    this.filteredJobs = selectedDepartment ? selectedDepartment.jobs : [];
    this.profileForm.get('job_id')?.setValue(null);
  }

  onManagerSelected(manager: SearchManger) {
    // Check if manager.id is not undefined and not null
    if (manager.id !== undefined && manager.id !== null) {
      console.log('Selected Manager:', manager);
    } else {
      console.log('Manager ID is undefined or null');
    }
  }

  private updateForm(profile: EmployeeDetails): void {
    this.profileForm.patchValue({
      id: profile.id,
      category: profile.department.category,
      first_name: profile.first_name,
      last_name: profile.last_name,
      cin: profile.cin,
      cnss: profile.cnss,
      phone_number: profile.phone_number,
      birth_date: profile.birth_date,
      Sexe: profile.Sexe,
      city_id: profile.city.id,
      date_start: profile.date_start,
      date_hiring: profile.date_hiring,
      date_visit: profile.date_visit,
      date_end: profile.date_end
    });

    if (profile.manager) {
      const managerValue: SearchManger = {
        id: profile.manager.id,
        full_name: profile.manager.full_name
      };
      this.profileForm.get('manager_id')?.setValue(managerValue);
    }

    // Set category and trigger change to populate departments
    this.profileForm.get('category')?.setValue(profile.department.category);
    this.onCategoryChange(profile.department.category);

    // Set department and trigger change to populate jobs
    this.profileForm.get('department_id')?.setValue(profile.department.id);
    this.onDepartmentChange(profile.department.id);

    // Set job
    this.profileForm.get('job_id')?.setValue(profile.job.id);

    this.cdr.detectChanges();
  }

  submitForm(): void {
    if (this.profileForm.valid) {
      const formValue = this.profileForm.value;
      const updatedProfile: EmployeeUpdate = {
        department_id: formValue.department_id,
        job_id: formValue.job_id,
        manager_id: formValue.manager_id?.id,
        first_name: formValue.first_name,
        last_name: formValue.last_name,
        cin: formValue.cin,
        cnss: formValue.cnss,
        phone_number: formValue.phone_number,
        birth_date: formValue.birth_date,
        Sexe: formValue.Sexe,
        city_id: formValue.city_id,
        date_start: formValue.date_start,
        date_hiring: formValue.date_hiring,
        date_visit: formValue.date_visit,
        date_end: formValue.date_end
      };
      console.log(updatedProfile);
      // Here you would typically call a service method to update the profile
    }
  }
}
