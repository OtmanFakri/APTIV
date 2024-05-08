import {Component, Input} from '@angular/core';
import {FormArray, FormGroup, ReactiveFormsModule} from "@angular/forms";
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
    NzOptionGroupComponent
  ],
  templateUrl: './professional-information.component.html',
})
export class ProfessionalInformationComponent {
  @Input() parentForm!: FormGroup;
  options: DepartmentItemData[][] = [];
  optionsJobs: JobItemData[] = [];

  constructor(
    service: DepartmentService
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

  addItem(input: HTMLInputElement): void {
    const value = input.value;
  }

  getDepartments(value: DepartmentItemData) {
    this.optionsJobs=value.jobs
  }


}
