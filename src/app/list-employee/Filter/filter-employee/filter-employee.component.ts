import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NzTagComponent} from "ng-zorro-antd/tag";
import {NgForOf, NgIf} from "@angular/common";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {FormsModule} from "@angular/forms";
import {NzSwitchComponent} from "ng-zorro-antd/switch";
import {FilterService} from "../filter.service";
import {DepartmentService} from "../../../list-department/department.service";
import {DepartmentItemData, JobItemData} from "../../../interfaces/ListDeprtemnt";
import {ManagerSelectComponent} from "../../../Components/manager-select/manager-select.component";
import {SearchManger} from "../../../interfaces/ListEmployee";
import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";

@Component({
    selector: 'app-filter-employee',
    standalone: true,
    imports: [
        NzTagComponent,
        NgForOf,
        NzSelectComponent,
        FormsModule,
        NzOptionComponent,
        NzSwitchComponent,
        NgIf,
        ManagerSelectComponent,
        NzDatePickerComponent
    ],
    templateUrl: './filter-employee.component.html',
})
export class FilterEmployeeComponent implements OnInit {
    amount: number = 0;
    category: string = '';
    showDropdownOne: boolean = false;
    listOfOptionDeps: DepartmentItemData[] = [];
    listOfOptionJobs: JobItemData[] = [];
    currentDate: Date = new Date();

    constructor(public filterService: FilterService,
                private departmentService: DepartmentService,
                private cdRef: ChangeDetectorRef
    ) {
    }


    ngOnInit(): void {
        this.departmentService.getDepartments().subscribe((data) => {
            this.listOfOptionDeps = data.flatMap(item => item.departments);
        });
    }

    onJobUploading(dep: DepartmentItemData[]) {
        this.listOfOptionJobs = dep.flatMap((item) => item.jobs);
    }

    changeAmount(change: number): void {
        this.amount = Math.max(0, this.amount + change);
        this.filterService.filterEmployee.min_seniority_years = this.amount;
    }


    selectGender(gender: string) {
        this.filterService.filterEmployee.sex = gender
    }

    onChangeDate(date: Date): void {
        this.filterService.filterEmployee.year = this.currentDate.getFullYear();
    }

    onManagerSelected(manager: SearchManger) {
        // Check if manager.id is not undefined and not null
        if (manager.id !== undefined && manager.id !== null) {
            console.log('Selected Manager:', manager);
            this.filterService.addManagerId(manager.id);
            console.log('Updated Manager IDs:', this.filterService.filterEmployee.manger_ids);
        } else {
            console.log('Manager ID is undefined or null');
        }
    }


}
