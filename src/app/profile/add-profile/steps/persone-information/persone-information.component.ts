import {Component, Input} from '@angular/core';
import {FormGroup, FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {JsonPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {NzUploadComponent, NzUploadFile} from "ng-zorro-antd/upload";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzUploadModule} from 'ng-zorro-antd/upload';
import {NzMessageService} from "ng-zorro-antd/message";
import {Observable, Observer} from "rxjs";
import {NzModalComponent} from "ng-zorro-antd/modal";
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {EmployeeService} from "../../../../list-employee/employee.service";
import {City, RegionsResponse} from "../../../../interfaces/ListEmployee";

@Component({
  selector: 'app-persone-information',
  standalone: true,
  imports: [
    FormsModule,
    NzModalModule,
    NzUploadModule,
    JsonPipe,
    ReactiveFormsModule,
    NgIf,
    NgClass,
    NzUploadComponent,
    NzIconDirective,
    NzModalComponent,
    NzSelectComponent,
    NzOptionComponent,
    NgForOf
  ],
  templateUrl: './persone-information.component.html',
})
export class PersoneInformationComponent {

  @Input() parentForm!: FormGroup;
  loading = false;
  avatarUrl?: string;
  regions?: RegionsResponse;
  cities: City[] = [];


  constructor(private msg: NzMessageService,
              private employeeService: EmployeeService) {
  }

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.msg.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.msg.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  handleChange(info: { file: NzUploadFile }): void {
    console.log('File status:', info.file.status);
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        console.log('Upload done:', info.file.response);
        // Ensure that the response has the URL of the uploaded image
        const response = info.file.response;
        if (response && response.url) {
          this.avatarUrl = response.url;
          this.loading = false;
        } else {
          this.msg.error('Upload failed');
          this.loading = false;
        }
        break;
      case 'error':
        this.msg.error('Network error');
        console.error('Upload error:', info.file.error);
        this.loading = false;
        break;
    }
  }

  onOpen(open: boolean) {
    if (open && !this.regions) {
      this.fetchRegions();
    }
  }

  fetchRegions() {
    this.employeeService.GETRegions().subscribe(
      (data: RegionsResponse) => {
        this.regions = data;
      },
      error => {
        console.error('Error fetching regions', error);
      }
    );
  }

  onRegionSelect(regionName: string) {
    const selectedRegion = this.regions?.items.find(region => region.name === regionName);
    if (selectedRegion) {
      // Assuming region IDs are based on index+1
      const regionId = (this.regions?.items?.indexOf(selectedRegion) ?? -1) + 1;
      this.fetchCities(regionId);
    }
  }

  fetchCities(regionId: number) {
    this.employeeService.GETCityByRegion(regionId).subscribe(
      (data: City[]) => {
        this.cities = data;
      },
      error => {
        console.error('Error fetching cities', error);
      }
    );
  }


}
