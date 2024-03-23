import { Component } from '@angular/core';
import {InfoProfileComponent} from "./me/info-profile/info-profile.component";
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    InfoProfileComponent,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  constructor(private router: Router) { }

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }
}
