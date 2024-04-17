import {Component, OnInit} from '@angular/core';
import {NzTagComponent} from "ng-zorro-antd/tag";
import {NgForOf} from "@angular/common";
import {CategoryItemData, DepartmentItemData, JobItemData} from "../../../interfaces/ListDeprtemnt";
import {DepartmentService} from "../../../list-department/department.service";
import {FilterService} from "../filter.service";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {FormsModule} from "@angular/forms";
import {NzSwitchComponent} from "ng-zorro-antd/switch";

@Component({
  selector: 'app-filter-employee',
  standalone: true,
  imports: [
    NzTagComponent,
    NgForOf,
    NzSelectComponent,
    FormsModule,
    NzOptionComponent,
    NzSwitchComponent
  ],
  templateUrl: './filter-employee.component.html',
})
export class FilterEmployeeComponent implements OnInit {
  categories: CategoryItemData[] = [];
  tagsFromCategories: string[] = [];
  tagsFromDepartments: DepartmentItemData[] = []; // Use the defined type here
  selectedCategoryTags: string[] = [];
  filteredJobs: JobItemData[] = []; // Store filtered jobs here
  selectedJobTags: string[] = []; // Holds the tags for the selected jobs
  isViste: boolean = false;


  ngOnInit() {
    console.log('FilterEmployeeComponent',this.categories.length)
    this.departmentService.getDepartments().subscribe({
      next: (data) => {
        this.categories = data;
        this.tagsFromCategories = data.map(category => category.category);
        this.tagsFromDepartments = data.reduce((acc: DepartmentItemData[], category) => { // Specify the type explicitly
          category.departments.forEach(dept => {
            acc.push({expand: false, jobs: dept.jobs, nbEmployees: dept.nbEmployees, department: dept.department, key: dept.key });
          });
          return acc;
        }, []);
      },
      error: (err) => console.error('Failed to load categories and departments:', err)
    });
  }

  constructor(private departmentService: DepartmentService,
              private filterService: FilterService) {}

  selectedDepartmentTags: string[] = [];
  loadingViste: boolean =false;


  handleChangeCategory(checked: boolean, tag: string): void {
    this.handleTagChange(checked, tag, this.selectedCategoryTags, 'category');
  }

  handleChangeDepartment(checked: boolean, tag: string, departmentKey: number): void {
    this.handleTagChange(checked, tag, this.selectedDepartmentTags, 'department');
    this.filterService.updateSelectedDepartmentKeys(departmentKey, checked);
    this.filterJobs(); // Update filtered jobs whenever department selection changes

  }
  private filterJobs(): void {
    this.filteredJobs = [];
    this.tagsFromDepartments.forEach(dept => {
      if (this.selectedDepartmentTags.includes(dept.department)) {
        this.filteredJobs.push(...dept.jobs);
      }
    });
  }

  private handleTagChange(checked: boolean, tag: string, selectedTags: string[], type: 'category' | 'department'): void {
    if (checked) {
      selectedTags.push(tag);
    } else {
      const index = selectedTags.indexOf(tag);
      if (index !== -1) {
        selectedTags.splice(index, 1);
      }
    }
    if (type === 'category') {
      this.filterService.setSelectedCategoryTags(selectedTags);
    } else {
      this.filterService.setSelectedDepartmentTags(selectedTags);
    }
    if (type === 'department') {
      this.filterJobs(); // Make sure to filter jobs when departments are updated
    }
  }

  clickSwitch(): void {
    if (!this.loadingViste) {
      this.loadingViste = true;
      setTimeout(() => {
        this.isViste = !this.isViste;
        this.loadingViste = false;
      }, 3000);
    }
  }
}
