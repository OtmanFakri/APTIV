import {Component, OnInit} from '@angular/core';
import {SettingsService} from "../settings.service";
import {NotificationPreferences, NotificationPreferencesChild} from "../InterfacesSetting";
import {NgForOf, NgIf} from "@angular/common";
import {NzCollapseComponent, NzCollapsePanelComponent} from "ng-zorro-antd/collapse";
import {NzSwitchComponent} from "ng-zorro-antd/switch";
import {FormsModule} from "@angular/forms";
import {NzSpinComponent} from "ng-zorro-antd/spin";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
    selector: 'app-notification-preferences',
    standalone: true,
    imports: [
        NgForOf,
        NzCollapseComponent,
        NzCollapsePanelComponent,
        NzSwitchComponent,
        FormsModule,
        NzSpinComponent,
        NgIf
    ],
    templateUrl: './notification-preferences.component.html',
})
export class NotificationPreferencesComponent implements OnInit {
    notificationPreferences!: NotificationPreferences;
    is_loading: boolean = false;
    is_updating: boolean = false;

    constructor(private settingsService: SettingsService,
                private notification: NzNotificationService) {
    }

    ngOnInit(): void {
        this.fetchNotificationPreferences();
    }

    fetchNotificationPreferences() {
        this.is_loading = true;
        this.settingsService.getNotificationPreferences().subscribe({
            next: (data: NotificationPreferences) => {
                this.notificationPreferences = data;
                this.is_loading = false;
            },
            error: (error) => {
                console.error('Error fetching notification preferences:', error);
                this.is_loading = false;
            }
        });
    }

    onPreferenceChange(pref: NotificationPreferencesChild) {
        console.log('Preference changed:', pref);
        this.updatePreference(pref);
    }

    onActionChange(pref: NotificationPreferencesChild, action: string) {
        console.log(`Action '${action}' changed for user ${pref.user_id}:`, pref.action.includes(action));
        this.updatePreference(pref);
    }

    updatePreference(pref: NotificationPreferencesChild) {
        this.is_updating = true;

        this.settingsService.updateNotificationPreference(pref).subscribe({
            next: (updatedPref) => {
                this.notification.success(
                    'Success',
                    'Preference updated successfully',
                    {nzPlacement: 'bottomLeft'}
                )
                this.fetchNotificationPreferences();
                this.is_updating = false
            },

            error: (error) => {
                console.error('Error updating preference:', error);
                this.notification.error(
                    'Error',
                    'Failed to update preference',
                    {nzPlacement: 'bottomLeft'});
                this.is_updating = false
            }
        });
    }

    isActionEnabled(pref: NotificationPreferencesChild, action: string): boolean {
        return pref.action.includes(action);
    }

    toggleAction(pref: NotificationPreferencesChild, action: string) {
        if (this.isActionEnabled(pref, action)) {
            pref.action = pref.action.filter(a => a !== action);
        } else {
            pref.action.push(action);
        }
        this.onActionChange(pref, action);
    }
}