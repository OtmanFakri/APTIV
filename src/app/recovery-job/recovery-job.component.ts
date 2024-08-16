import {Component, OnInit, ViewChild, viewChild} from '@angular/core';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {RecoveryJobService} from "./recovery-job.service";
import {Page} from "../change-post/InterfaceChnagePost";
import {RecoveryJobs} from "./InterfacesRecoveryJob";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {CreateOrUpdateComponent} from "../list-injury/create-or-update/create-or-update.component";
import {NzDrawerComponent, NzDrawerContentDirective} from "ng-zorro-antd/drawer";
import {NzListComponent} from "ng-zorro-antd/list";
import {CreateOrUpdateReconvryComponent} from "./create-or-update-reconvry/create-or-update-reconvry.component";
import {NzNotificationService} from "ng-zorro-antd/notification";

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
    @ViewChild('createOrUpdateReconvryComponent') createOrUpdateReconvryComponent!: CreateOrUpdateReconvryComponent;
    isLoading = false
    recoveryJobs!: Page<RecoveryJobs>
    recoveryJob!: RecoveryJobs;
    isUpdateMode: boolean = false;
    is_CreateOrUpdate: boolean = false;
    childrenVisible: boolean = false;

    ngOnInit(): void {
        this.loadingRecovery()
    }

    constructor(private recoveryJobService: RecoveryJobService,
                private notification: NzNotificationService
    ) {
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
        if (this.createOrUpdateReconvryComponent) {
            const form = this.createOrUpdateReconvryComponent.recoveryForm.value;
            this.is_CreateOrUpdate = false;
            this.recoveryJobService.updtaeRecoveryJob(form.id, form)
                .subscribe({
                    next: (response) => {
                        // Handle successful response
                        this.notification.success('Success',
                            'Recovery job updated successfully',
                            {nzPlacement: 'bottomLeft'});
                        //this.loadingRecovery();
                        this.isUpdateMode = false;
                    },
                    error: (err) => {
                        // Handle error
                        console.error('Error updating recovery job', err);
                        this.notification.error('Error', 'Error updating recovery job', {nzPlacement: 'bottomLeft'});
                        this.isUpdateMode = false;
                    },
                    complete: () => {
                        // Optional: Handle any cleanup or final steps
                        console.log('Update process completed');
                        this.loadingRecovery();
                    }
                });
        } else {
            console.error('Child component not initialized');
        }
    }

    openChildren(): void {
        this.childrenVisible = true;
    }

    closeChildren(): void {
        this.childrenVisible = false;
    }
}
