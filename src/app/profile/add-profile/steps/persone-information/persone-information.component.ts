import {Component, Input} from '@angular/core';
import {FormGroup, FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {JsonPipe, NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-persone-information',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    ReactiveFormsModule,
    NgIf,
    NgClass
  ],
  templateUrl: './persone-information.component.html',
})
export class PersoneInformationComponent {

  @Input() parentForm!: FormGroup;

  constructor() {}

}
