import {Component, Input} from '@angular/core';
import {FormGroup, FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-persone-information',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    ReactiveFormsModule
  ],
  templateUrl: './persone-information.component.html',
})
export class PersoneInformationComponent {

  @Input() parentForm!: FormGroup;

  constructor() {}

}
