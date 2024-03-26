import { Component } from '@angular/core';
import {NgStyle} from "@angular/common";
import {NzCalendarComponent} from "ng-zorro-antd/calendar";
import {LbarLineChartComponent} from "./lbar-line-chart/lbar-line-chart.component";
import {ContresVisitesPieComponent} from "./contres-visites-pie/contres-visites-pie.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgStyle,
    NzCalendarComponent,
    LbarLineChartComponent,
    ContresVisitesPieComponent
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {

  onValueChange(value: Date): void {
    console.log(`Current value: ${value}`);
  }

  onPanelChange(change: { date: Date; mode: string }): void {
    console.log(`Current value: ${change.date}`);
    console.log(`Current mode: ${change.mode}`);
  }
}
