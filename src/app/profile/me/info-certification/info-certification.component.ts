import {Component} from '@angular/core';
import {NzModalComponent, NzModalContentDirective, NzModalModule} from "ng-zorro-antd/modal";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {ShowCertificationComponent} from "./show-certification/show-certification.component";

@Component({
  selector: 'app-info-certification',
  standalone: true,
  imports: [
    NzModalComponent,
    NzModalContentDirective,
    NzButtonComponent,
    NzModalModule,
    ShowCertificationComponent
  ],
  templateUrl: './info-certification.component.html',
})
export class InfoCertificationComponent {
  isVisible = false;
  isOkLoading = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
