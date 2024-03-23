import { Component } from '@angular/core';
import {NzTabComponent, NzTabSetComponent} from "ng-zorro-antd/tabs";

@Component({
  selector: 'app-info-profile',
  standalone: true,
  imports: [
    NzTabSetComponent,
    NzTabComponent
  ],
  templateUrl: './info-profile.component.html',
})
export class InfoProfileComponent {

}
