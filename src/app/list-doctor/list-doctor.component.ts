import {Component, OnInit} from '@angular/core';
import {DoctorService} from "./doctor.service";
import {
    GetdoctorInterface,
    SpecialtyDistributionByCategory,
    SpecialtyDistributionByDepartment,
    SpecialtyDistributionBygendre
} from "../interfaces/ListdoctorInterface";
import {NzTableComponent, NzTbodyComponent, NzTheadComponent} from "ng-zorro-antd/table";
import {NgForOf} from "@angular/common";
import {NzDrawerComponent, NzDrawerContentDirective} from "ng-zorro-antd/drawer";
import {PaginationComponent} from "../Components/pagination/pagination.component";
import {NzTabChangeEvent, NzTabComponent, NzTabSetComponent} from "ng-zorro-antd/tabs";
import {ByGendreComponent} from "./by-gendre/by-gendre.component";
import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";
import {FormsModule} from "@angular/forms";
import {ByCategoryComponent} from "./by-category/by-category.component";
import {ByDepartmentComponent} from "./by-department/by-department.component";

@Component({
    selector: 'app-list-doctor',
    standalone: true,
    imports: [
        NzTableComponent,
        NzTheadComponent,
        NzTbodyComponent,
        NgForOf,
        NzDrawerComponent,
        NzDrawerContentDirective,
        PaginationComponent,
        NzTabSetComponent,
        NzTabComponent,
        ByGendreComponent,
        NzDatePickerComponent,
        FormsModule,
        ByCategoryComponent,
        ByDepartmentComponent
    ],
    templateUrl: './list-doctor.component.html'
})
export class ListDoctorComponent implements OnInit {
    listOfData: GetdoctorInterface | undefined;  // Allow it to be undefined initially
    visible = false;
    distribution_gendre: SpecialtyDistributionBygendre[] = [];  // Initialize as an empty array
    distribution_category: SpecialtyDistributionByCategory[] = [];  // Initialize as an empty array
    distribution_department: SpecialtyDistributionByDepartment[] = [];  // Initialize as an empty array

    date: Date = new Date();

    open(): void {
        this.visible = true;
    }

    close(): void {
        this.visible = false;
    }

    constructor(private doctorService: DoctorService) {
    }

    ngOnInit(): void {
        this.fetchDoctor();
    }

    fetchDoctor(page: number = 1): void {
        this.doctorService.getDoctors(page).subscribe({
            next: (response: GetdoctorInterface) => {
                this.listOfData = response;
            },
            error: (error) => {
                console.error('Failed to fetch doctors:', error);
            }
        });
    }

    specialty_distribution_category(year: number): void {
        //Fetch the date Gender distribution
        this.doctorService.specialty_distribution_gendre(year).subscribe({
            next: (response: SpecialtyDistributionBygendre[]) => {
                this.distribution_gendre = response;
            },
            error: (err) => {
                console.error('Error fetching specialty distribution by category', err);
            },
            complete: () => {
                console.log('Fetch specialty distribution by category completed');
            }
        });
        //Fetch the date Category distribution
        this.doctorService.specialty_distribution_category(year).subscribe({
            next: (response: SpecialtyDistributionByCategory[]) => {
                this.distribution_category = response;
            },
            error: (err) => {
                console.error('Error fetching specialty distribution by category', err);
            },
            complete: () => {
                console.log('Fetch specialty distribution by category completed');
            }
        });
        //Fetch the date Department distribution
        this.doctorService.specialty_distribution_department(year).subscribe({
            next: (response: SpecialtyDistributionByDepartment[]) => {
                this.distribution_department = response;
            },
            error: (err) => {
                console.error('Error fetching specialty distribution by category', err);
            },
            complete: () => {
                console.log('Fetch specialty distribution by category completed');
            }
        });
    }

    onPageChange(page: number): void {
        this.fetchDoctor(page);
    }

    onChnageTab($event: NzTabChangeEvent): void {
        if ($event.index === 1 && this.distribution_gendre.length === 0) {
            this.specialty_distribution_category(this.date.getFullYear());
        }
    }

    onChange($event: any): void {
        this.specialty_distribution_category($event.getFullYear());
    }
}
