import {Component, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NzUploadComponent, NzUploadFile} from "ng-zorro-antd/upload";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzRadioComponent, NzRadioGroupComponent} from "ng-zorro-antd/radio";
import {NzModalComponent} from "ng-zorro-antd/modal";
import { NzModalModule } from 'ng-zorro-antd/modal';


const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
@Component({
  selector: 'app-examination',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    NzModalModule,
    FormsModule,
    NzUploadComponent,
    NzButtonComponent,
    NzRadioGroupComponent,
    NzRadioComponent,
    NgForOf,
    NzModalComponent,
    NgStyle
  ],
  templateUrl: './examination.component.html',
})
export class ExaminationComponent implements  OnInit {

  fileList: NzUploadFile[] = [];
  previewImage: string | undefined = '';
  previewVisible = false;

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file['preview']) {
      file['preview'] = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file['preview'];
    this.previewVisible = true;
  };

  handleChange = (fileList: NzUploadFile[]): void => {
    if (fileList.length > 1) {
      this.fileList = [fileList[fileList.length - 1]]; // keep only the latest file
    } else {
      this.fileList = fileList;
    }
  };

  ngOnInit(): void {}
}
