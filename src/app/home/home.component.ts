import { Component } from '@angular/core';
import {NgStyle} from "@angular/common";
import {NzCalendarComponent} from "ng-zorro-antd/calendar";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgStyle,
    NzCalendarComponent
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {

}
