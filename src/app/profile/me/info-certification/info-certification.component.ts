import {Component} from '@angular/core';
import {NzModalComponent, NzModalContentDirective, NzModalModule} from "ng-zorro-antd/modal";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {ShowCertificationComponent} from "./show-certification/show-certification.component";
import {NzDatePickerComponent, NzRangePickerComponent} from "ng-zorro-antd/date-picker";
import { getISOWeek } from 'date-fns';
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-info-certification',
    standalone: true,
    imports: [
        NzModalComponent,
        NzModalContentDirective,
        NzButtonComponent,
        NzModalModule,
        ShowCertificationComponent,
        NzRangePickerComponent,
        NzDatePickerComponent,
        FormsModule
    ],
    templateUrl: './info-certification.component.html',
})
export class InfoCertificationComponent {
    isVisible = false;
    isOkLoading = false;
    date = null;

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


    onChange(result: Date[]): void {
        console.log('onChange: ', result);
    }

    getWeek(result: Date[]): void {
        console.log('week: ', result.map(getISOWeek));
    }
}
