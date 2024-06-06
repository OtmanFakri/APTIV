import {Component, Input, OnInit} from '@angular/core';
import {ProfileService} from "../../profile/profile.service";
import {ProfileEmployee} from "../../interfaces/profileEmployee";

@Component({
    selector: 'app-info-employee',
    standalone: true,
    imports: [],
    templateUrl: './info-employee.component.html',
    styleUrl: './info-employee.component.css'
})
export class InfoEmployeeComponent implements OnInit {

    @Input() employee_id: any;
    employee_info!: ProfileEmployee;

    constructor(private profileService: ProfileService) {
    }

    ngOnInit(): void {
        this.fetchEmployeeProfile();
    }

    fetchEmployeeProfile() {
        this.profileService.getEmployeeProfile(Number(this.employee_id)).subscribe((data) => {
            this.employee_info = data;
        });
    }
}
