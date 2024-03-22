import { Component } from '@angular/core';
import {NzStepComponent, NzStepsComponent} from "ng-zorro-antd/steps";
import {PersoneInformationComponent} from "./steps/persone-information/persone-information.component";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-add-profile',
  standalone: true,
  imports: [
    NzStepsComponent,
    NzStepComponent,
    PersoneInformationComponent,
    NzButtonComponent,
    NgIf
  ],
  templateUrl: './add-profile.component.html'
})
export class AddProfileComponent {
  current = 0;

  pre(): void {
    this.current -= 1;
  }

  next(): void {
    this.current += 1;
  }

  done(): void {
    console.log('done');
  }

  constructor() {}

}
