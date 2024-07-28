import {Component} from '@angular/core';
import {NzUploadChangeParam, NzUploadComponent, NzUploadFile} from "ng-zorro-antd/upload";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzMessageService} from "ng-zorro-antd/message";
import {Observable, Observer} from "rxjs";
import {NzAlertComponent} from "ng-zorro-antd/alert";

@Component({
    selector: 'app-upload-employees',
    standalone: true,
    imports: [
        NzUploadComponent,
        NzIconDirective,
        NzAlertComponent
    ],
    templateUrl: './upload-employees.component.html',
})
export class UploadEmployeesComponent {
    selectedFile: NzUploadFile | null = null;

    constructor(private msg: NzMessageService) {}

    beforeUpload = (file: NzUploadFile): boolean => {
        const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
            file.type === 'application/vnd.ms-excel';
        if (!isExcel) {
            this.msg.error('You can only upload Excel files!');
            return false;
        }

        const isLt2M = file.size! / 1024 / 1024 < 2;
        if (!isLt2M) {
            this.msg.error('File must be smaller than 2MB!');
            return false;
        }

        this.selectedFile = file;
        return true;
    };

    handleChange(info: NzUploadChangeParam): void {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            this.msg.success(`${info.file.name} file uploaded successfully.`);
        } else if (info.file.status === 'error') {
            // Instead of showing an error, we'll treat it as a successful local "upload"
            this.msg.success(`${info.file.name} file processed successfully.`);
        }
    }
}
