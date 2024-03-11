import {Component, HostListener} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {NgIf} from "@angular/common";
import {DashboardComponent} from "./dashboard/dashboard.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, DashboardComponent, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'APTIV-Front';
  toggle_profile:boolean = false;
  close_side_bar:boolean = false;

  constructor(private router: Router) { }


  isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }

  openSideBar(){
    this.close_side_bar = !this.close_side_bar;
  }

  toggleProfile(){
    this.toggle_profile = !this.toggle_profile;
  }
  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (this.toggle_profile) {
      const target = event.target as HTMLElement;
      if (!target.closest('.relative')) {
        this.toggleProfile();
      }
    }
  }
}
