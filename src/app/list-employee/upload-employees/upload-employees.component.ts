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
    constructor(private msg: NzMessageService) {}

    handleUpload = (file: NzUploadFile): Observable<boolean> =>
        new Observable((observer: Observer<boolean>) => {
            const reader = new FileReader();
            reader.readAsArrayBuffer(file as any);
            reader.onload = () => {
                // Here you can process the file data
                const arrayBuffer = reader.result as ArrayBuffer;

                // Example: convert to Base64 (you might not need this step)
                const base64 = btoa(
                    new Uint8Array(arrayBuffer)
                        .reduce((data, byte) => data + String.fromCharCode(byte), '')
                );

                // TODO: Implement your file processing logic here
                console.log('File content:', base64);

                // Simulate a successful upload
                setTimeout(() => {
                    this.msg.success(`${file.name} file uploaded successfully`);
                    observer.next(true);
                    observer.complete();
                }, 1000);
            };
            reader.onerror = (error) => {
                this.msg.error(`${file.name} file upload failed.`);
                observer.error(error);
            };
        });
}
