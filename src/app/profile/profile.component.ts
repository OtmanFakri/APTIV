import {Component, OnInit} from '@angular/core';
import {InfoProfileComponent} from "./me/info-profile/info-profile.component";
import {ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {ProfileEmployee} from "../interfaces/profileEmployee";
import {ProfileService} from "./profile.service";

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
export class ProfileComponent implements OnInit{
  userId: any;
  employeeProfile: ProfileEmployee | null = null;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private profileService: ProfileService) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.profileService.getEmployeeProfile(this.userId).subscribe({
      next: (data) => {
        this.employeeProfile = data;
        this.profileService.updateEmployeeProfile(data);

      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });

  }


  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }
}
