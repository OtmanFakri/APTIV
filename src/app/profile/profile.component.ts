import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {InfoProfileComponent} from "./me/info-profile/info-profile.component";
import {ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {ProfileService} from "./profile.service";
import {NzDrawerComponent, NzDrawerContentDirective} from "ng-zorro-antd/drawer";
import {UpdateProfileComponent} from "./update-profile/update-profile.component";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzNotificationComponent, NzNotificationService} from "ng-zorro-antd/notification";
import {EmployeeDetails} from "./Interfaces";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    InfoProfileComponent,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NzDrawerComponent,
    NzDrawerContentDirective,
    UpdateProfileComponent,
    NzButtonComponent
  ],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  userId: any;
  employeeProfile: EmployeeDetails | null = null;
  baseUrl = 'http://127.0.0.1:8011/';
  @ViewChild(UpdateProfileComponent) OnSubmetUpdate!: UpdateProfileComponent;
  @ViewChild('notificationBtnTpl', {static: true}) btnDelete!: TemplateRef<{ $implicit: NzNotificationComponent }>;

  get avatarUrl(): string {
    return this.employeeProfile?.profile_picture
      ? `${this.baseUrl}${this.employeeProfile.profile_picture}`
      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAr2409QmggQL6cHai_NgIVtmdGL7sMtJPPH83XJdq3w&s';
  }

  constructor(private route: ActivatedRoute,
              private router: Router,
              private notification: NzNotificationService,
              private profileService: ProfileService) {
  }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.profileService.getEmployeeProfile(this.userId).subscribe({
      next: (data) => {
        this.employeeProfile = data;
        //this.profileService.updateEmployeeProfile(data);

      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });


  }

  visibleUpdate = false;

  openUpdate(): void {
    this.visibleUpdate = true;
  }

  closeUpdate(): void {
    this.visibleUpdate = false;
  }

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }

  OnUpdate() {
    this.OnSubmetUpdate.submitForm();
  }

  Delete() {
    this.profileService.deleteEmployee(this.userId).subscribe({
      next: (re) => {
        // Now 'this' correctly refers to the component instance
        this.notification.success('success', 'The employee profile has been successfully deleted!',
          {nzPlacement: 'bottomLeft'});
        this.router.navigate(['/Employee']);
      },
      error: (err) => {
        // Now 'this' correctly refers to the component instance
        this.notification.error('error',
          'Failed to delete the employee profile!',
          {nzPlacement: 'bottomLeft'});
        console.error('Error deleting the employee:', err);
      },
      complete: () => {
        console.log('Deletion attempt completed');
      }
    });
  }

  openNotification(): void {
    this.notification.blank(
      'Delete Confirmed',
      'ARE YOU SURE ABOUT THIS',
      {
        nzButton: this.btnDelete,
        nzPlacement: "bottomLeft"
      }
    );
  }

}
