import {Component} from '@angular/core';
import {AuthentificatinService} from "../authentificatin.service";
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-singup',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './singup.component.html',
})
export class SingupComponent {
  employeeId!: number;
  password!: string;

  constructor(private authService: AuthentificatinService,
              private notification: NzNotificationService) {
  }

  async onSubmit() {
    try {

      await this.authService.signup(this.employeeId, this.password);
      console.log('Signup successful');
      this.notification.create(
        'success',
        'Notification Title',
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        {nzPlacement:'bottomRight'}

      );
    } catch (error) {
      console.error('Signup failed', error);
    }
  }

}
