import {Component, Input} from '@angular/core';
import {FormArray, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {JsonPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {
  NzAutocompleteComponent,
  NzAutocompleteOptionComponent,
  NzAutocompleteTriggerDirective
} from "ng-zorro-antd/auto-complete";
import {NzInputDirective} from "ng-zorro-antd/input";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {NzIconDirective} from "ng-zorro-antd/icon";


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
    NzIconDirective
  ],
  templateUrl: './professional-information.component.html',
})
export class ProfessionalInformationComponent {
  @Input() parentForm!: FormGroup;
  index = 0;
  filteredOptions: string[] = [];
  options = [
    'ASSEMBLY',
    'CUTTING',
    'MAINTENANCE',
    'ENGINEERING',
    'PROCESS ENGI',
    'PRODUCT ENGINEERING',
    'QUALITY',
    'LOGISTIC IMPO.EXPO',
    'PURCHASING',
    'FINANCE-CONTROLLING',
    'GENERAL MANAGEMENT',
    'HUMAN RESSOURCES',
    'SAFETY H.R',
    'IT',
  ];

  constructor() {
    this.filteredOptions = this.options;
  }
  listOfItem = ['jack', 'lucy'];


  get department() {
    return this.parentForm.get('department') as FormArray;
  }
  addItem(input: HTMLInputElement): void {
    const value = input.value;
    if (this.listOfItem.indexOf(value) === -1) {
      this.listOfItem = [...this.listOfItem, input.value || `New item ${this.index++}`];
    }
  }


}
