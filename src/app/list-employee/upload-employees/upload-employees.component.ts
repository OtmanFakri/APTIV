import {Component} from '@angular/core';
import {NzUploadChangeParam, NzUploadComponent, NzUploadFile} from "ng-zorro-antd/upload";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzMessageService} from "ng-zorro-antd/message";
import {Observable, Observer} from "rxjs";
import {NzAlertComponent} from "ng-zorro-antd/alert";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {HttpClient} from '@angular/common/http';
import {environment} from "../../../environments/environment";

@Component({
    selector: 'app-upload-employees',
    standalone: true,
    imports: [
        NzUploadComponent,
        NzIconDirective,
        NzAlertComponent,
        NzButtonComponent
    ],
    templateUrl: './upload-employees.component.html',
})
export class UploadEmployeesComponent {
    uploading = false;
    fileList: NzUploadFile[] = [];

    constructor(
        private http: HttpClient,
        private msg: NzMessageService
    ) {
    }

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

        // Ensure only one file is added to the fileList
        this.fileList = [file];
        return false;
    };


    getFullApiUrl(): string {
        //const cleanedPath = this.cleanPath(path);
        return `${environment.Url}/avatars/OriginaleFiles/Employee_Active.xlsx`;
    }
}
