import {Component, Input, OnInit} from '@angular/core';
import {City, NewEmployee, RegionsResponse} from "../../interfaces/ListEmployee";
import {ProfileEmployee} from "../../interfaces/profileEmployee";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NzUploadComponent, NzUploadFile} from "ng-zorro-antd/upload";
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {DepartmentService} from "../../list-department/department.service";
import {EmployeeService} from "../../list-employee/employee.service";
import {CategoryItemData, DepartmentItemData, JobItemData} from "../../interfaces/ListDeprtemnt";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {NgClass, NgForOf} from "@angular/common";

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
    NgClass
  ],
  templateUrl: './update-profile.component.html',
})
export class UpdateProfileComponent implements OnInit {
  @Input() profile: ProfileEmployee | null = null;
  profileForm: FormGroup;
  fileList: NzUploadFile[] = [];
  previewImage: string | undefined = '';
  previewVisible = false;
  categories: CategoryItemData[] = [];
  filteredDepartments: DepartmentItemData[] = [];
  filteredJobs: JobItemData[] = [];
  regions?: RegionsResponse;
  cities: City[] = [];
  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file['preview']) {
      file['preview'] = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file['preview'];
    this.previewVisible = true;
  };

  handleChange = (fileList: NzUploadFile[]): void => {
    if (fileList.length >= 1) {
      this.fileList = [fileList[fileList.length - 1]]; // keep only the latest file
      //this.profile.get('avatar')?.setValue(this.fileList[0].originFileObj);
    } else {
      this.fileList = fileList;
    }

  };

  constructor(private fb: FormBuilder,
              private notification: NzNotificationService,
              private departmentService: DepartmentService,
              private employeeService: EmployeeService) {
    this.profileForm = this.fb.group({
      id: [{value: '', disabled: true}],
      category: ['', Validators.required],
      department_name: ['', Validators.required],
      job_name: ['', Validators.required],
      manager_name: [''],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      cin: ['', Validators.required],
      cnss: ['', Validators.required],
      phone_number: ['', Validators.required],
      birth_date: ['', Validators.required],
      Sexe: ['', Validators.required],
      city_name: ['', Validators.required],
      region_name: ['', Validators.required],
      date_start: ['', Validators.required],
      date_hiring: ['', Validators.required],
      date_visit: ['']
    });
  }

  ngOnInit(): void {
    // Initial form setup if needed
    this.departmentService.getDepartments().subscribe(data => {
      this.categories = data;
    });

    this.profileForm.get('category')!.valueChanges.subscribe(category => {
      this.filterDepartments(category);
    });

    this.profileForm.get('department_name')!.valueChanges.subscribe(department => {
      this.filterJobs(department);
    });
    if (this.profile) {
      this.updateForm(this.profile);
    }
  }


  private updateForm(profile: ProfileEmployee) {
    this.profileForm.patchValue({
      id: profile.id,
      category: profile.category,
      department_name: profile.department_name,
      job_name: profile.job_name,
      manager_name: profile.manager_name,
      first_name: profile.first_name,
      last_name: profile.last_name,
      cin: profile.cin,
      cnss: profile.cnss,
      phone_number: profile.phone_number,
      birth_date: profile.birth_date,
      Sexe: profile.Sexe,
      city_name: profile.city_name,
      region_name: profile.region_name,
      date_start: profile.date_start,
      date_hiring: profile.date_hiring,
      date_visit: profile.date_visit
    });
  }

  submitForm(): void {
    if (this.profileForm.valid) {
      this.notification.create('success', 'Success', 'Form submitted successfully', {nzPlacement: 'bottomLeft'});
      console.log('Form submitted', this.profileForm.value);
    } else {
      this.notification.create('error', 'Error', 'Please fill all the required fields', {nzPlacement: 'bottomLeft'});
    }
  }

  onCategoryChange(category: string): void {
    this.filterDepartments(category);
    this.profileForm.get('department_name')!.setValue(null);  // Reset department when category changes
    this.profileForm.get('job_name')!.setValue(null);  // Reset job when category changes
  }

  onDepartmentChange(department: any): void {
    this.filterJobs(department.jobs);
    this.profileForm.get('job_name')!.setValue(null);  // Reset job when department changes
    this.profileForm.get('department_name')!.setValue(department.key);

  }

  filterDepartments(category: string): void {
    const selectedCategory = this.categories.find(cat => cat.category === category);
    this.filteredDepartments = selectedCategory ? selectedCategory.departments : [];
  }

  filterJobs(department: string): void {
    const selectedDepartment = this.filteredDepartments.find(dept => dept.department === department);
    this.filteredJobs = selectedDepartment ? selectedDepartment.jobs : [];
  }
  onOpen(open: boolean) {
    if (open && !this.regions) {
      this.fetchRegions();
    }
  }

  fetchRegions() {
    this.employeeService.GETRegions().subscribe(
      (data: RegionsResponse) => {
        this.regions = data;
      },
      error => {
        console.error('Error fetching regions', error);
      }
    );
  }

  onRegionSelect(regionName: string) {
    const selectedRegion = this.regions?.items.find(region => region.name === regionName);
    if (selectedRegion) {
      // Assuming region IDs are based on index+1
      const regionId = (this.regions?.items?.indexOf(selectedRegion) ?? -1) + 1;
      this.fetchCities(regionId);
    }
  }

  fetchCities(regionId: number) {
    this.employeeService.GETCityByRegion(regionId).subscribe(
      (data: City[]) => {
        this.cities = data;
      },
      error => {
        console.error('Error fetching cities', error);
      }
    );
  }
}
