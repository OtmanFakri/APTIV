import {Component, OnDestroy, OnInit} from '@angular/core';
import {NzTabComponent, NzTabSetComponent} from "ng-zorro-antd/tabs";
import {Subscription} from "rxjs";
import {ProfileService} from "../../profile.service";
import {ProfileEmployee} from "../../../interfaces/profileEmployee";

@Component({
  selector: 'app-info-profile',
  standalone: true,
  imports: [
    NzTabSetComponent,
    NzTabComponent
  ],
  templateUrl: './info-profile.component.html',
})
export class InfoProfileComponent  implements  OnInit, OnDestroy{

  private subscription: Subscription = new Subscription();
  employeeProfile: ProfileEmployee | null = null;

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.subscription.add(this.profileService.employeeProfile$.subscribe(profile => {
      if (profile) {
        this.employeeProfile = profile // Example action
      }
    }));
  }

  ngOnDestroy(): void {
    // Unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
}
