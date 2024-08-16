import {Component, OnInit} from '@angular/core';
import {UsersServicesService} from "./users-services.service";
import {ListUsers, User} from "./InterafcesUsers";
import {NgForOf, NgIf} from "@angular/common";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzSwitchComponent} from "ng-zorro-antd/switch";
import {FormsModule} from "@angular/forms";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {NzModalComponent, NzModalContentDirective} from "ng-zorro-antd/modal";
import {NzModalModule} from 'ng-zorro-antd/modal';
import {ManagerSelectComponent} from "../Components/manager-select/manager-select.component";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {NzSpinComponent} from "ng-zorro-antd/spin";
import {ListPermstionsComponent} from "./list-permstions/list-permstions.component";

@Component({
    selector: 'app-list-users',
    standalone: true,
    imports: [
        NgForOf,
        NzButtonComponent,
        NzSwitchComponent,
        FormsModule,
        NzIconDirective,
        NzModalComponent,
        NzModalContentDirective,
        NzModalModule,
        ManagerSelectComponent,
        NzInputGroupComponent,
        NzInputDirective,
        NzSpinComponent,
        NgIf,
        ListPermstionsComponent
    ],
    templateUrl: './list-users.component.html',
})
export class ListUsersComponent implements OnInit {
    users!: ListUsers;
    is_loading: boolean = false
    isLoading: boolean = false
    isVisible = false;
    select_user: any;
    email!: string;
    is_permistion: boolean = false;

    constructor(private serviceUsers: UsersServicesService,
                private notification: NzNotificationService) {
    }

    createUser(): void {
        this.isVisible = true;
    }

    handleOk(): void {
        this.is_loading = true;
        this.serviceUsers.createUser(this.select_user.id, this.email).subscribe(
            () => {
                this.fetchUser();
                this.notification.success(
                    'Success',
                    'User created successfully',
                    {nzPlacement: 'bottomLeft'}
                )
            },
            (error) => {
                console.error('Error creating user:', error);
                this.is_loading = false;
                this.notification.error(
                    'Error',
                    'An error occurred while creating user. Please try again.',
                    {nzPlacement: 'bottomLeft'}
                )
            },
            () => {
                this.is_loading = false;
                this.isVisible = false;
            }
        );
        this.isVisible = false;
    }

    handleCancel(): void {
        console.log('Button cancel clicked!');
        this.isVisible = false;
    }

    ngOnInit() {
        this.fetchUser();
    }

    fetchUser() {
        this.isLoading = true;
        this.serviceUsers.getUsers().subscribe((data: ListUsers) => {
            this.users = data;
            this.isLoading = false
        })
    }


    setChnageUser(user: User, is_active: boolean) {
        this.is_loading = true;  // Set loading to true when updating starts
        this.serviceUsers.updateState_User(user.id, is_active).subscribe(
            () => {
                this.fetchUser();
                this.notification.success(
                    'Success',
                    'User status updated successfully',
                    {nzPlacement: 'bottomLeft'}
                )
            },
            (error) => {
                console.error('Error updating user:', error);
                this.is_loading = false;
                this.notification.error(
                    'Error',
                    'An error occurred while updating user status. Please try again.',
                    {nzPlacement: 'bottomLeft'}
                )// Set loading to false even if there's an error
            },
            () => {
                this.is_loading = false;  // Ensure loading is set to false after the operation completes
            }
        );
    }


    OpenPermstion() {
        this.is_permistion = true;
    }

    ClosePermstion() {
        this.is_permistion = false;
    }
}
