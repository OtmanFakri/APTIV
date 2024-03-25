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
import {async, map, startWith} from "rxjs";
import {NzDividerComponent} from "ng-zorro-antd/divider";


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
    NzDividerComponent
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

  onChange(value: string): void {
    this.filteredOptions = this.options.filter(option =>
      option.toLowerCase().indexOf(value.toLowerCase()) !== -1 && option.toLowerCase() !== value.toLowerCase()
    );
    const isValidOption = this.options.some(option => option.toLowerCase() === value.toLowerCase());


    if (!isValidOption) {
      this.parentForm.get('department')!.setValue(' ');
      this.filteredOptions = this.options;
      return;
    }

  }

  get department() {
    return this.parentForm.get('department') as FormArray;
  }
  addItem(input: HTMLInputElement): void {

    const value = input.value;
    if (this.options.indexOf(value) === -1) {
      this.options = [...this.options, input.value || `New item ${this.index++}`];
    }
  }


}
