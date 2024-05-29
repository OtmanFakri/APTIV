import {HttpEventType} from '@angular/common/http';
import {Component, EventEmitter, Output} from '@angular/core';
import {NzUploadComponent, NzUploadFile} from "ng-zorro-antd/upload";
import {UploadingFileService} from "./uploading-file.service";
import {NzModalComponent} from "ng-zorro-antd/modal";
import {NgStyle} from "@angular/common";


const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

@Component({
    selector: 'app-uploading-file',
    standalone: true,
    imports: [
        NzUploadComponent,
        NzModalComponent,
        NgStyle
    ],
    templateUrl: './uploading-file.component.html',
    styleUrl: './uploading-file.component.css'
})
export class UploadingFileComponent {
    @Output() fileListChange = new EventEmitter<File[]>();

    fileList: NzUploadFile[] = [];
    previewImage: string | undefined = '';
    previewVisible = false;
    previewTitle: string = '';

    constructor(private fileUploadService: UploadingFileService) {
    }

    handlePreview = async (file: NzUploadFile): Promise<void> => {
        if (file.type === 'application/pdf') {
            // For PDF files, set the previewImage to a placeholder or a PDF icon
            this.previewImage = 'https://static.vecteezy.com/system/resources/previews/023/234/824/non_2x/pdf-icon-red-and-white-color-for-free-png.png'; // Replace with your PDF icon path
            this.previewTitle = file.name;
        } else {
            if (!file.url && !file['preview']) {
                file['preview'] = await getBase64(file.originFileObj!);
            }
            this.previewImage = file.url || file['preview'];
            this.previewTitle = file.name;
        }
        this.previewVisible = true;
    };

    handleChange = (info: { file: NzUploadFile, fileList: NzUploadFile[] }) => {
        if (info.file.status === 'uploading') {
            console.log('Uploading file');
        }
        this.fileList = info.fileList;
        const fileListAsFiles = this.fileList.map(uploadFile => uploadFile.originFileObj!);
        this.fileListChange.emit(fileListAsFiles);
    };
}
