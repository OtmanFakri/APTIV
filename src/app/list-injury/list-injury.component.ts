import {Component, OnInit, ViewChild} from '@angular/core';
import {InjuryQueryParams, listInjury, ListInjuryItems} from "./InterfacesInjury";
import {InjuryService} from "./injury.service";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {NzSpinComponent} from "ng-zorro-antd/spin";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzDrawerComponent, NzDrawerContentDirective} from "ng-zorro-antd/drawer";
import {FilterInjuryComponent} from "./filter-injury/filter-injury.component";
import {NzModalComponent, NzModalContentDirective} from "ng-zorro-antd/modal";
import {CreateOrUpdateComponent} from "./create-or-update/create-or-update.component";
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Component({
    selector: 'app-list-injury',
    standalone: true,
    imports: [
        NgForOf,
        NzSpinComponent,
        NgIf,
        NzButtonComponent,
        DatePipe,
        NzDrawerComponent,
        NzDrawerContentDirective,
        FilterInjuryComponent,
        NzModalComponent,
        NzModalContentDirective,
        CreateOrUpdateComponent
    ],
    templateUrl: './list-injury.component.html',
})
export class ListInjuryComponent implements OnInit {
    @ViewChild(FilterInjuryComponent) filterInjuryComponent!: FilterInjuryComponent;
    @ViewChild(CreateOrUpdateComponent) createOrUpdateComponent!: CreateOrUpdateComponent;

    injuryItems!: listInjury;
    isLoading = false;
    is_CreateOrUpdate = false;
    visibleFilter: boolean = false;
    isVisible: boolean = false;
    isUpdateMode: boolean = false;
    selectedInjuryItem!: ListInjuryItems;

    handleCancel(): void {
        this.isVisible = false;
    }

    ngOnInit(): void {
        this.loadInjuryItems({
            day: new Date().getDate(),
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear()
        })
    }


    constructor(private injuryService: InjuryService,
                private notification: NzNotificationService) {
    }

    openFilter(): void {
        this.visibleFilter = true;
    }

    closeFilter(): void {
        this.visibleFilter = false;
    }

    loadInjuryItems(filterParams: InjuryQueryParams = {}): void {
        this.isLoading = true;
        this.injuryService.getInjuries(filterParams).subscribe(
            response => {
                this.injuryItems = response;
                this.isLoading = false;
            },
            error => {
                this.isLoading = false;
                console.error('Error loading injury items:', error);
            }
        );
    }


    createNew() {
        this.isVisible = true;
    }

    OnsubmetFilter() {
        const filterValues = this.filterInjuryComponent.filterForm.value;
        const queryParams: InjuryQueryParams = {
            department_id: filterValues.department_id,
            shift: filterValues.shift,
            day: filterValues.date,
            month: filterValues.month,
            year: filterValues.year
        };
        this.loadInjuryItems(queryParams);
    }

    handleOk() {
        if (this.createOrUpdateComponent.form.valid) {
            this.is_CreateOrUpdate = true;
            let formValue = {...this.createOrUpdateComponent.form.value};
            formValue.incident_datetime = this.convertToNaiveDate(formValue.incident_datetime);
            console.log(formValue);
            this.injuryService.CreateInjuries(formValue).subscribe({
                next: () => {
                    this.notification.success(
                        'Success',
                        'Injury item created successfully',
                        {
                            nzDuration: 5000,
                            nzPlacement: 'bottomLeft'
                        }
                    );
                    this.isVisible = false;
                    this.is_CreateOrUpdate = false;
                    this.loadInjuryItems();
                },
                error: (error) => {
                    this.notification.error(
                        'Error',
                        error,
                        {
                            nzDuration: 5000,
                            nzPlacement: 'bottomLeft'
                        }
                    );
                    this.is_CreateOrUpdate = false;
                    console.error('Error creating injury item:', error);
                }
            });
        } else {
            Object.values(this.createOrUpdateComponent.form.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({onlySelf: true});
                    this.notification.error(
                        'Error',
                        control.errors ? Object.values(control.errors).join(', ') : 'Invalid field',
                        {
                            nzDuration: 5000,
                            nzPlacement: 'bottomLeft'
                        }
                    );
                    console.error("INVALID: ", this.createOrUpdateComponent.form.value);
                }
            });
        }
    }

    convertToNaiveDate(date: Date): Date {
        let naiveDate = new Date(date);
        naiveDate.setMinutes(naiveDate.getMinutes() - naiveDate.getTimezoneOffset());
        return naiveDate;
    }

    openDrawerUpdate(item: ListInjuryItems) {
        if (item) {
            this.selectedInjuryItem = item;
            this.isUpdateMode = true;
        }
    }

    closeDrawer() {
        this.selectedInjuryItem = {} as ListInjuryItems;
        this.isUpdateMode = false
    }

    handleOk_update() {
        if (this.createOrUpdateComponent.form.valid) {
            this.is_CreateOrUpdate = true;
            let formValue = {...this.createOrUpdateComponent.form.value};
            formValue.incident_datetime = this.convertToNaiveDate(formValue.incident_datetime);
            console.log(formValue);
            this.injuryService.UpdateInjuries(formValue, this.selectedInjuryItem.id).subscribe({
                next: () => {
                    this.notification.success(
                        'Success',
                        'Injury item created successfully',
                        {
                            nzDuration: 5000,
                            nzPlacement: 'bottomLeft'
                        }
                    );
                    this.isVisible = false;
                    this.is_CreateOrUpdate = false;
                    this.loadInjuryItems();
                },
                error: (error) => {
                    this.notification.error(
                        'Error',
                        error,
                        {
                            nzDuration: 5000,
                            nzPlacement: 'bottomLeft'
                        }
                    );
                    this.is_CreateOrUpdate = false;
                    console.error('Error creating injury item:', error);
                }
            });
        } else {
            Object.values(this.createOrUpdateComponent.form.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({onlySelf: true});
                    this.notification.error(
                        'Error',
                        control.errors ? Object.values(control.errors).join(', ') : 'Invalid field',
                        {
                            nzDuration: 5000,
                            nzPlacement: 'bottomLeft'
                        }
                    );
                    console.error("INVALID: ", this.createOrUpdateComponent.form.value);
                }
            });
        }
    }

    DeleteInjury() {
        this.injuryService.DeleteInjuries(this.selectedInjuryItem.id).subscribe({
            next: () => {
                this.notification.success(
                    'Success',
                    'Injury item deleted successfully',
                    {
                        nzDuration: 5000,
                        nzPlacement: 'bottomLeft'
                    }
                );
                this.isVisible = false;
                this.is_CreateOrUpdate = false;
                this.loadInjuryItems();
            },
            error: (error) => {
                this.notification.error(
                    'Error',
                    error,
                    {
                        nzDuration: 5000,
                        nzPlacement: 'bottomLeft'
                    }
                );
                this.is_CreateOrUpdate = false;
                console.error('Error creating injury item:', error);
            }
        });

    }
}
