import {Component, Input} from '@angular/core';
import {FormArray, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {JsonPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {
  NzAutocompleteComponent,
  NzAutocompleteOptionComponent,
  NzAutocompleteTriggerDirective
} from "ng-zorro-antd/auto-complete";
import {NzInputDirective} from "ng-zorro-antd/input";
import {NzOptionComponent, NzOptionGroupComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {DepartmentService} from "../../../../list-department/department.service";
import {DepartmentItemData, JobItemData} from "../../../../interfaces/ListDeprtemnt";
import {EmployeeService} from "../../../../list-employee/employee.service";
import {SearchManger} from "../../../../interfaces/ListEmployee";


interface Option {
  label: string;
  value: string;
}

@Component({
  selector: 'app-professional-information',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgIf,
    NzAutocompleteTriggerDirective,
    NzAutocompleteComponent,
    NzInputDirective,
    NzSelectComponent,
    NzOptionComponent,
    NgForOf,
    NzAutocompleteOptionComponent,
    JsonPipe,
    NzDividerComponent,
    NzIconDirective,
    NzOptionGroupComponent,
    FormsModule
  ],
  templateUrl: './professional-information.component.html',
})
export class ProfessionalInformationComponent {
  @Input() parentForm!: FormGroup;
  options: DepartmentItemData[][] = [];
  optionsJobs: JobItemData[] = [];

  constructor(
    service: DepartmentService,
    private employeeService: EmployeeService
  ) {
    service.getDepartments().subscribe((data) => {
      this.options = data.map((item) => {
        console.log(item.departments)
        return item.departments;
      });
    });
  }


  get department() {
    return this.parentForm.get('department') as FormArray;
  }



  getDepartments(value: DepartmentItemData) {
    this.optionsJobs=value.jobs
  }
  optionList: SearchManger[] = [];
  isLoading = false;


  onSearch(query: string): void {
    if (query) {
      this.isLoading = true;
      this.employeeService.GETSERACHMANGER(query).subscribe(
        (data: SearchManger[]) => {
          this.optionList = data.map(manager => ({ id: manager.id, full_name: manager.full_name }));
          this.isLoading = false;
        },
        error => {
          console.error('Error searching managers', error);
          this.isLoading = false;
        }
      );
    } else {
      this.optionList = [];
    }
  }

}
