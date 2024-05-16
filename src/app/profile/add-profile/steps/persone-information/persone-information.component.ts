import {Component, Input} from '@angular/core';
import {FormGroup, FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {JsonPipe, NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
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


const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

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
        NgForOf,
        NgStyle
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
        if (fileList.length >= 1) {
            this.fileList = [fileList[fileList.length - 1]]; // keep only the latest file
            this.parentForm.get('avatar')?.setValue(this.fileList[0].originFileObj);
        } else {
            this.fileList = fileList;
        }

    };

    handleCancel(): void {
        this.previewVisible = false;
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
