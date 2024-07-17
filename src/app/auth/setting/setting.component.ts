import { Component } from '@angular/core';
import {NzTabComponent, NzTabDirective, NzTabSetComponent} from "ng-zorro-antd/tabs";
import {NotificationPreferencesComponent} from "./notification-preferences/notification-preferences.component";

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [
    NzTabSetComponent,
    NzTabComponent,
    NzTabDirective,
    NotificationPreferencesComponent
  ],
  templateUrl: './setting.component.html',
})
export class SettingComponent {

}
