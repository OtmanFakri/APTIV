import {Component, OnInit} from '@angular/core';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {RecoveryJobService} from "./recovery-job.service";
import {Page} from "../change-post/InterfaceChnagePost";
import {RecoveryJobs} from "./InterfacesRecoveryJob";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {CreateOrUpdateComponent} from "../list-injury/create-or-update/create-or-update.component";
import {NzDrawerComponent, NzDrawerContentDirective} from "ng-zorro-antd/drawer";
import {NzListComponent} from "ng-zorro-antd/list";
import {CreateOrUpdateReconvryComponent} from "./create-or-update-reconvry/create-or-update-reconvry.component";

@Component({
    selector: 'app-recovery-job',
    standalone: true,
    imports: [
        NzButtonComponent,
        NgIf,
        NgForOf,
        DatePipe,
        CreateOrUpdateComponent,
        NzDrawerComponent,
        NzDrawerContentDirective,
        NzListComponent,
        CreateOrUpdateReconvryComponent
    ],
    templateUrl: './recovery-job.component.html',
})
export class RecoveryJobComponent implements OnInit {
    isLoading = false
    recoveryJobs!: Page<RecoveryJobs>
    recoveryJob!: RecoveryJobs;
    isUpdateMode: boolean = false;
    is_CreateOrUpdate: boolean = false;
    childrenVisible: boolean=false;

    ngOnInit(): void {
        this.loadingRecovery()
    }

    constructor(private recoveryJobService: RecoveryJobService) {
    }

    loadingRecovery(): void {
        this.isLoading = true;
        this.recoveryJobService.getRecoveryJobs().subscribe({
            next: (jobs) => {
                this.recoveryJobs = jobs;
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Error loading recovery jobs:', error);
                this.isLoading = false;
            }
        });
    }

    onRowClick(item: RecoveryJobs) {
        this.recoveryJob = item;
        this.isUpdateMode = true;
    }

    closeDrawer() {
        this.isUpdateMode = false;
    }

    DeleteInjury() {

    }

    handleOk_update() {

    }

    openChildren(): void {
        this.childrenVisible = true;
    }

    closeChildren(): void {
        this.childrenVisible = false;
    }
}
