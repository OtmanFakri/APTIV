import {Component, Input} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ExaminitationService} from "../../examinitation.service";
import {EmployeeExaminition} from "../../InterfacesExaminitaion";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzDropDownDirective, NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";
import {NzMenuDirective, NzMenuItemComponent} from "ng-zorro-antd/menu";
import {NzTableComponent, NzTbodyComponent, NzTheadComponent} from "ng-zorro-antd/table";
import {PaginationComponent} from "../../../Components/pagination/pagination.component";
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzModalModule} from 'ng-zorro-antd/modal';

@Component({
    selector: 'app-employee-examinition',
    standalone: true,
    imports: [
        NgIf,
        NgForOf,
        NzButtonComponent,
        NzModalModule,
        NzDropDownDirective,
        NzDropdownMenuComponent,
        NzMenuDirective,
        NzMenuItemComponent,
        NzTableComponent,
        NzTbodyComponent,
        NzTheadComponent,
        PaginationComponent,
        RouterLink,
        FormsModule
    ],
    templateUrl: './employee-examinition.component.html',
    styleUrl: './employee-examinition.component.css'
})
export class EmployeeExaminitionComponent {
    @Input() ExaminitionId?: string | null = null;

    employeeExaminations: EmployeeExaminition | null = null;
    selectedValue: boolean = true;
    searchValue: string = '';
    searchTimeout: any;
    isVisible = false;
    comment = '';
    userId: number | undefined; // Define userId as a class property

    showModal(): void {
        this.isVisible = true;
    }

    handleOk(): void {
        if (this.comment !== '') {
            if (this.userId !== undefined) { // Ensure userId is defined
                this.PostEmployeeExamination(Number(this.ExaminitionId), this.userId);
            }
        } else {
            this.notification.create(
                'error',
                'Examination Assignment Failed',
                'Please fill in the comment field.',
                {nzPlacement: 'bottomLeft'}
            );
        }
        this.isVisible = false;
    }


    handleCancel(): void {
        console.log('Button cancel clicked!');
        this.isVisible = false;
    }

    constructor(private examinitationService: ExaminitationService,
                private notification: NzNotificationService) {
    }


    ngOnInit(): void {
        this.GetEmployeeExamination(Number(this.ExaminitionId), this.selectedValue);
    }

    GetEmployeeExamination(id_Examinition: number, associated: boolean): void {
        this.examinitationService.GetEmployeeExamination(id_Examinition, associated).subscribe(
            (data: EmployeeExaminition) => {
                this.employeeExaminations = data;
                console.log("EmployeeExaminitionComponent", data);
            });
    }

    searchEmployeeExamination(id_Examinition: number, page = 1, search: string): void {
        this.examinitationService.searchEmployeeExamination(id_Examinition, page, search).subscribe(
            (data: EmployeeExaminition) => {
                this.employeeExaminations = data;
                console.log("EmployeeExaminitionComponent", data);
            });
    }

    onDropdownChange(event: Event): void {
        const selectedValue = (event.target as HTMLSelectElement).value === 'true';
        this.selectedValue = selectedValue;
        this.GetEmployeeExamination(Number(this.ExaminitionId), this.selectedValue);
    }

    onDropdownChangeExaminition(event: Event, userId: number | undefined): void {
        const selectedValue = (event.target as HTMLSelectElement).value === 'true';
        this.selectedValue = selectedValue;
        this.userId = userId; // Store the userId in the class property
        if (userId !== null) {
            if (this.selectedValue) {
                // Show new modal
                this.isVisible = true;
            } else {
                this.DeleteEmployeeExamination(Number(this.ExaminitionId), userId);
            }
        }
    }

    PostEmployeeExamination(id_Examination: number, id_Employee: number | undefined): void {
        this.examinitationService.PostEmployeeExamination(
            id_Examination,
            Number(id_Employee),
            this.comment).subscribe(
            () => {
                this.notification.create(
                    'success',
                    'Examination Assigned',
                    'The employee examination has been successfully assigned.',
                    {nzPlacement: 'bottomLeft'}
                );
            },
            (error) => {
                this.notification.create(
                    'error',
                    'Examination Assignment Failed',
                    'There was an error assigning the employee examination.',
                    {nzPlacement: 'bottomLeft'}
                );
            }
        );
    }

    DeleteEmployeeExamination(id_Examination: number, id_Employee: number | undefined): void {
        this.examinitationService.DeleteEmployeeExamination(id_Examination, Number(id_Employee)).subscribe(
            () => {
                this.notification.create(
                    'success',
                    'Examination Unassigned',
                    'The employee examination has been successfully unassigned.',
                    {nzPlacement: 'bottomLeft'}
                );
            },
            (error) => {
                this.notification.create(
                    'error',
                    'Examination Unassignment Failed',
                    'There was an error unassigning the employee examination.'
                );
            }
        );
    }

    onPageChange(page: number): void {
        if (this.ExaminitionId) {
            const id_Examinition = Number(this.ExaminitionId);
            this.examinitationService.GetEmployeeExamination(id_Examinition, this.selectedValue, page).subscribe(
                (data: EmployeeExaminition) => {
                    this.employeeExaminations = data;
                    console.log('EmployeeExaminitionComponent', data);
                },
                (error) => {
                    this.notification.error('Error', 'Failed to fetch employee examinations for page ' + page);
                    console.error('Error fetching employee examinations for page', page, error);
                }
            );
        }
    }

    onSearchChange($event: any) {
        clearTimeout(this.searchTimeout); // Clear the previous timeout
        this.searchTimeout = setTimeout(() => {
            if (this.searchValue !== null && this.searchValue !== '') {
                this.searchEmployeeExamination(Number(this.ExaminitionId), 1, this.searchValue);
            } else {
                this.GetEmployeeExamination(Number(this.ExaminitionId), this.selectedValue);
            }
        }, 2000); // Delay of 2 seconds
    }
}
