import {Component, Input} from '@angular/core';
import {Item} from "../../../../interfaces/CertificateEmployee";

@Component({
  selector: 'app-show-certification',
  standalone: true,
  imports: [],
  templateUrl: './show-certification.component.html',
})
export class ShowCertificationComponent {

  @Input() item?: Item; // Use a specific type if possible

}
