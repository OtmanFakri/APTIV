import {Component, Input} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-professional-information',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './professional-information.component.html',
})
export class ProfessionalInformationComponent {
  @Input() parentForm!: FormGroup;

}
