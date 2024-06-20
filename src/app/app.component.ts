import {Component, HostListener, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {NgIf} from "@angular/common";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {Router} from '@angular/router';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenInterceptor} from "./auth/TokenInterceptor";
import {AuthentificatinService} from "./auth/authentificatin.service";
import {jwtDecode} from "jwt-decode";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, DashboardComponent, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
export class AppComponent implements OnInit {
  title = 'APTIV-Front';
  toggle_profile: boolean = false;
  close_side_bar: boolean = false;

  constructor(private router: Router,
              private authService: AuthentificatinService) {
  }

  ngOnInit(): void {
    this.checkTokenExpiration();
    console.log('sssssssssssssssssssssssssstart')
  }

  private checkTokenExpiration(): void {
    const token = this.authService.getJwtToken();
    if (token) {
      const decoded: any = jwtDecode(token);
      const expirationTime = decoded.exp * 1000; // exp is in seconds, convert to milliseconds
      const currentTime = Date.now();
      if (currentTime > expirationTime) {
        this.authService.logoutUser();
        this.router.navigate(['/login']);
      }
    }
  }

  isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }

  openSideBar() {
    this.close_side_bar = !this.close_side_bar;
  }

  toggleProfile() {
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
