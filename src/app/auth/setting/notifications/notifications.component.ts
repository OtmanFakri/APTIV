import {Component, OnInit} from '@angular/core';
import {SettingsService} from "../settings.service";
import {Page} from "../../../change-post/InterfaceChnagePost";
import {RespencesNotifcations} from "../InterfacesSetting";
import {NzSpinComponent} from "ng-zorro-antd/spin";
import {NgForOf, NgIf} from "@angular/common";
import {NzRibbonComponent} from "ng-zorro-antd/badge";
import {NzCardComponent} from "ng-zorro-antd/card";

@Component({
    selector: 'app-notifications',
    standalone: true,
    imports: [
        NzSpinComponent,
        NgIf,
        NzRibbonComponent,
        NzCardComponent,
        NgForOf
    ],
    templateUrl: './notifications.component.html',
})
export class NotificationsComponent implements OnInit {
    PageNotification!: Page<RespencesNotifcations>
    IsLoding: boolean = false

    ngOnInit(): void {
        this.fetchNotification()
    }


    constructor(private ServiceSetting: SettingsService) {
    }

    fetchNotification() {
        this.IsLoding = true
        this.ServiceSetting.GetNotification().subscribe({
            next: (response) => {
                // Handle the response her
                this.PageNotification = response
                this.IsLoding = false
            },
            error: (error) => {
                // Handle any errors here
                console.error(error)
                this.IsLoding = false
            },
            complete: () => {
                // Optional: Handle completion
                this.IsLoding = false

            }
        });
    }

    getActionColor(action: string): string {
        switch (action.toUpperCase()) {
            case 'CREATE':
                return 'green';
            case 'UPDATE':
                return 'blue';
            case 'DELETE':
                return 'red';
            default:
                return 'pink';
        }
    }
}
