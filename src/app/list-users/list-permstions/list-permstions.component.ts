import {Component, OnInit} from '@angular/core';
import {Permissions, PermstionModels} from "../InterafcesUsers";
import {UsersServicesService} from "../users-services.service";
import {NzTabComponent, NzTabSetComponent} from "ng-zorro-antd/tabs";
import {NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {NzSwitchComponent} from "ng-zorro-antd/switch";
import {FormsModule} from "@angular/forms";
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {NzModalService} from "ng-zorro-antd/modal";
import {NzSpinComponent} from "ng-zorro-antd/spin";


@Component({
    selector: 'app-list-permstions',
    standalone: true,
    imports: [
        NzTabSetComponent,
        NzTabComponent,
        NgForOf,
        NzSwitchComponent,
        FormsModule,
        TitleCasePipe,
        NgIf,
        NzSpinComponent
    ],
    templateUrl: './list-permstions.component.html',
})
export class ListPermstionsComponent implements OnInit {
    ListPermstionsModels!: PermstionModels[];
    is_loading = false;
    is_setPermissions = false;

    constructor(private usersServicesService: UsersServicesService,
                private notification: NzNotificationService,
                private modal: NzModalService) {

    }

    ngOnInit(): void {
        this.FetachPermstions();
    }

    FetachPermstions() {
        this.is_loading = true;
        this.usersServicesService.GetPermstions().subscribe(
            (data: PermstionModels[]) => {
                // Handle the received data, for example, store it in a local variable
                this.ListPermstionsModels = data;
                this.is_loading = false;
            },
            (error) => {
                console.error('Error fetching permissions:', error);
                this.modal.error({
                    nzTitle: 'This is a notification message',
                    nzContent: `Error fetching permissions: ${error}`,
                    nzOnOk: () => console.log('Info OK')
                });
                this.is_loading = false;
            }
        );
    }

    onPermissionChange(modelName: string, permissionType: keyof Permissions, value: boolean) {
        this.is_setPermissions = true;
        const permissions = { [permissionType]: value };

        this.usersServicesService.setPermissions(modelName, permissions).subscribe(
            (data) => {
                this.notification.create('success',
                    'Success',
                    'Permissions updated successfully');

                this.is_setPermissions = false;
            },
            (error) => {
                console.error('Error updating permissions:', error);
                this.modal.error({
                    nzTitle: 'This is a notification message',
                    nzContent: `Error updating permissions: ${error.error.detail}`,
                    nzOnOk: () => console.log('Info OK')
                });
                this.is_setPermissions = false;
            }
        );
    }

    getPermissionKeys(): (keyof Permissions)[] {
        return ['can_create', 'can_read', 'can_update', 'can_delete'];
    }

    isBooleanPermission(key: keyof Permissions): boolean {
        return typeof this.ListPermstionsModels[0]?.permissions[key] === 'boolean';
    }


}
