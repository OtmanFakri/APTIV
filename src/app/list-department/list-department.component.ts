import {Component, OnInit} from '@angular/core';
import {
  NzFilterTriggerComponent,
  NzTableComponent,
  NzTbodyComponent,
  NzTdAddOnComponent, NzThAddOnComponent,
  NzTheadComponent, NzThMeasureDirective,
  NzTrDirective, NzTrExpandDirective
} from "ng-zorro-antd/table";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NgForOf, NgIf} from "@angular/common";
import {CategoryItemData, CreateDepartment, DepartmentItemData, JobItemData} from "../interfaces/ListDeprtemnt";
import {DepartmentService} from "./department.service";
import {FormsModule} from "@angular/forms";
import {NzDropDownDirective, NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";
import {NzInputDirective} from "ng-zorro-antd/input";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzModalComponent, NzModalModule} from "ng-zorro-antd/modal";
import {NzColorPickerComponent} from "ng-zorro-antd/color-picker";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {NzRadioGroupComponent} from "ng-zorro-antd/radio";
import {NzRadioModule} from 'ng-zorro-antd/radio';
import {NzNotificationModule, NzNotificationService} from 'ng-zorro-antd/notification';


@Component({
  selector: 'app-list-department',
  standalone: true,
  imports: [
    NzTheadComponent,
    NzRadioModule,
    NzNotificationModule,
    NzTableComponent,
    NzTbodyComponent,
    NzModalModule,
    NzTrDirective,
    NzTdAddOnComponent,
    NzIconDirective,
    NzThMeasureDirective,
    NgIf,
    NgForOf,
    NzTrExpandDirective,
    NzThAddOnComponent,
    FormsModule,
    NzFilterTriggerComponent,
    NzDropdownMenuComponent,
    NzInputDirective,
    NzButtonComponent,
    NzModalComponent,
    NzColorPickerComponent,
    NzOptionComponent,
    NzDividerComponent,
    NzSelectComponent,
    NzDropDownDirective,
    NzRadioGroupComponent,
  ],
  templateUrl: './list-department.component.html'
})
export class ListDepartmentComponent implements OnInit {
  listOfCategoryData: CategoryItemData[] = [];
  filteredData: CategoryItemData[] = [];
  selectedColor: string = '#ffffff';  // Initialize with default color if needed
// For rendering filtered data
  listOfFilter = [
    {text: 'DH', value: 'DH'},
    {text: 'IH', value: 'IH'},
    {text: 'IS', value: 'IS'}
  ];
  departmentSearchValue: string = ''; // Search string for department
  jobSearchValue: string = ''; // Search string for jobs
  visibleDept = false;
  visibleJob = false;
  isVisibleCreate: boolean = false;
  index = 0;
  radioValue = 'DH';
  listOfOption: Array<{ label: string; value: string }> = [];
  departmentName: string = '';
  jobsValues: string[] = [];
  isVisibleUpdate: boolean = false;
  allDepartments: DepartmentItemData[] = [];

  constructor(private departmentService: DepartmentService,
              private notification: NzNotificationService) {
  }

  ngOnInit() {
    this.departmentService.getDepartments().subscribe({
      next: (data) => {
        this.listOfCategoryData = data;
        this.filteredData = [...this.listOfCategoryData]; // Initially, no filters are applied
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });


  }


  onFilterChange(value: string[], key: string): void {
    if (value.length) {
      // @ts-ignore
      this.filteredData = this.listOfCategoryData.filter(item => value.includes(item[key]));
    } else {
      this.filteredData = [...this.listOfCategoryData]; // Reset to original data if no filter is active
    }
  }

  reset(field: 'dept' | 'job'): void {
    if (field === 'dept') {
      this.departmentSearchValue = '';
    } else {
      this.jobSearchValue = '';
    }
    this.search(field);
  }

  search(field: 'dept' | 'job'): void {
    if (field === 'dept') {
      // Create a new filtered list with modified structure
      this.filteredData = this.listOfCategoryData.reduce((acc, category) => {
        // Filter departments within each category
        const matchingDepartments = category.departments.filter(department =>
          department.department.toLowerCase().includes(this.departmentSearchValue.toLowerCase())
        );

        // Only add categories that have matching departments
        if (matchingDepartments.length > 0) {
          // @ts-ignore
          acc.push({
            ...category, // spread the original category data
            departments: matchingDepartments // replace its departments with only the matching ones
          });
        }
        return acc;
      }, []);
      this.visibleDept = false;
      console.log('Filtered Data: ', this.filteredData);
    } else if (field === 'job') {
      // Create a new filtered list with modified structure for jobs
      this.filteredData = this.listOfCategoryData.reduce((acc, category) => {
        const matchingDepartments = category.departments.map(department => {
          const matchingJobs = department.jobs.filter(job =>
            job.job.toLowerCase().includes(this.jobSearchValue.toLowerCase())
          );
          return matchingJobs.length > 0 ? {...department, jobs: matchingJobs} : null;
        }).filter(dep => dep !== null);
        if (matchingDepartments.length > 0) {
          // @ts-ignore
          acc.push({...category, departments: matchingDepartments});
        }
        return acc;
      }, []);
      this.visibleDept = false; // Update this variable name if jobs have a different visibility toggle
      console.log('Filtered Data: ', this.filteredData);
    } else {
      // Apply your search logic here for jobs
    }
  }

  showModalCreate() {
    this.isVisibleCreate = true;
  }

  showModalUpdate() {
    this.isVisibleUpdate = true;
  }

  handleCancel() {
    this.isVisibleCreate = false;
    this.departmentName = '';
    this.jobsValues = [];
    this.selectedColor = '#ffffff';
    this.radioValue = 'DH';
  }

  UpdatehandleCancel() {
    this.isVisibleUpdate = false;
    //all the values should be reset
    this.departmentName = '';
    this.jobsValues = [];
    this.selectedColor = '#ffffff';
    this.radioValue = 'DH';
  }

  UpdatehandleOk() {
    this.isVisibleUpdate = false;

    //all the values should be showing
    const departmentData: CreateDepartment = {
      name: this.selectedDepartment?.department || '',
      color: this.selectedColor,
      category: this.radioValue,
      jobs: this.jobsValues.map(job => ({name: job}))
    };
    //validation for all
    if (departmentData.name === '' || departmentData.category === '' || departmentData.jobs.length === 0) {
      console.error('Please fill all the fields');
      this.notification.error('Error',
        'Please fill all the fields',
        {nzPlacement: 'bottomLeft'});
      return;
    }
    this.departmentService.UPDATEDepartment(this.selectedDepartment?.key || 0, departmentData).subscribe({
      next: (data) => {
        console.log('Department updated successfully!', data);
        this.notification.success('Success',
          'Department updated successfully!',
          {nzPlacement: 'bottomLeft'});
        this.departmentService.clearCache();
        this.departmentService.getDepartments().subscribe({
          next: (data) => {
            this.listOfCategoryData = data;
            this.filteredData = [...this.listOfCategoryData]; // Initially, no filters are applied
          },
          error: (error) => {
            console.error('There was an error!', error);
          }
        });
      }
    });

  }

  handleOk() {
    this.isVisibleCreate = false;
    const departmentData: CreateDepartment = {
      name: this.departmentName,
      color: this.selectedColor,
      category: this.radioValue,
      jobs: this.jobsValues.map(job => ({name: job}))
    };
    //validation for all
    if (departmentData.name === '' || departmentData.category === '' || departmentData.jobs.length === 0) {
      console.error('Please fill all the fields');
      this.notification.error('Error',
        'Please fill all the fields',
        {nzPlacement: 'bottomLeft'});
      return;
    }
    this.departmentService.POSTDepartment(departmentData).subscribe({
      next: (data) => {
        console.log('Department created successfully!', data);
        this.notification.success('Success',
          'Department created successfully!',
          {nzPlacement: 'bottomLeft'});
        this.departmentService.clearCache();
        this.departmentService.getDepartments().subscribe({
          next: (data) => {
            this.listOfCategoryData = data;
            this.filteredData = [...this.listOfCategoryData]; // Initially, no filters are applied
          },
          error: (error) => {
            console.error('There was an error!', error);
          }
        });
      }
    });
    // Log the data or send it to a backend server
    console.log(departmentData);

  }


  filteredJobs: JobItemData[] = [];

  selectedDepartment: DepartmentItemData | null = null;

  onCategoryChange(category: string) {
    this.radioValue = category;
    // Filter departments based on selected category
    this.allDepartments = this.listOfCategoryData.filter(dept => dept.category === category).map(dept => dept.departments).flat();

  }
  onDepartmentChange(department: DepartmentItemData) {
    this.selectedDepartment = department;
    this.jobsValues = department.jobs.map(job => job.job);
  }
}
