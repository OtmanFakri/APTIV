import {Component, OnDestroy, OnInit} from '@angular/core';
import {NzTabComponent, NzTabSetComponent} from "ng-zorro-antd/tabs";
import {Subscription} from "rxjs";
import {ProfileService} from "../../profile.service";
import {ProfileEmployee} from "../../../interfaces/profileEmployee";
import {EmployeeDetails} from "../../Interfaces";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-info-profile',
    standalone: true,
    imports: [
        NzTabSetComponent,
        NzTabComponent
    ],
    templateUrl: './info-profile.component.html',
})
export class InfoProfileComponent implements OnInit, OnDestroy {
    private subscription: Subscription = new Subscription();
    employeeProfile: EmployeeDetails | null = null;
    error: string | null = null;
    userId: any;

    constructor(private profileService: ProfileService,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        console.log("InfoProfileComponent initialized");
        this.route.parent?.paramMap.subscribe(params => {
            this.userId = params.get('id');
            this.loadEmployeeProfile();
        });
    }

    loadEmployeeProfile(): void {
        this.subscription.add(
            this.profileService.employeeProfile$.subscribe({
                next: (profile) => {
                    if (profile) {
                        this.employeeProfile = profile;
                        this.error = null;
                    } else {
                        this.error = "No profile data available";
                        console.warn("Received null profile");
                    }
                },
                error: (err) => {
                    this.error = "Error loading profile";
                }
            })
        );

        // Trigger profile load if not already done
        this.profileService.loadEmployeeProfile(this.userId);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
