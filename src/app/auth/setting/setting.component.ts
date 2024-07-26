import { Component } from '@angular/core';
import {NzTabComponent, NzTabDirective, NzTabSetComponent} from "ng-zorro-antd/tabs";
import {NotificationPreferencesComponent} from "./notification-preferences/notification-preferences.component";
import {GeneralComponent} from "./general/general.component";
import {ExportationComponent} from "./exportation/exportation.component";

@Component({
  selector: 'app-setting',
  standalone: true,
    imports: [
        NzTabSetComponent,
        NzTabComponent,
        NzTabDirective,
        NotificationPreferencesComponent,
        GeneralComponent,
        ExportationComponent
    ],
  templateUrl: './setting.component.html',
})
export class SettingComponent {

}
