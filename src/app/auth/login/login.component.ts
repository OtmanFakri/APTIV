import {Component, inject} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {LoginInterface} from "../AuthInterfaces";
import {AuthentificatinService} from "../authentificatin.service";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {getToken} from 'firebase/messaging';
import {environment} from "../../configuration/environment";
import {Messaging} from "@angular/fire/messaging";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        NgIf,
        RouterLink,
        ReactiveFormsModule,
        NgClass,
        NzButtonComponent
    ],
    templateUrl: './login.component.html',
})
export class LoginComponent {
    public showPassword: boolean = false;
    public is_loading: boolean = false;
    public loginForm: FormGroup;
    private readonly _messaging = inject(Messaging);

    constructor(
        private fb: FormBuilder,
        private authService: AuthentificatinService,
        private router: Router,
    ) {
        this.loginForm = this.fb.group({
            employee_id: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
            hashed_password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.is_loading = true;
            const loginData: LoginInterface = this.loginForm.value;
            this.authService.login(loginData).subscribe(
                (success) => {
                    this.is_loading = false;
                    if (success) {
                        // Login successful, navigate to the desired page
                        this.router.navigate(['/']);
                        this.updateFcmToken();
                    } else {
                        // Login failed, handle the error (e.g., display an error message)
                        console.log('Login failed');
                    }
                },
                (error) => {
                    this.is_loading = false;
                    // Handle any error that occurred during the login process
                    console.error('Login error:', error);
                }
            );
        }
    }

    private async updateFcmToken() {
        try {
            const token = await this.getDeviceToken();
            if (token) {
                this.authService.UpdateFcmToken(token).subscribe({
                    next: (response) => {
                        //console.log('FCM token updated successfully', response);
                    },
                    error: (error) => {
                        console.error('Error updating FCM token:', error);
                    }
                });
            } else {
                console.log('Failed to get FCM token');
            }
        } catch (error) {
            console.error('Error in updateFcmToken:', error);
        }
    }

    private getDeviceToken(): Promise<string | null> {
        return getToken(this._messaging, {vapidKey: environment.vapidKey})
            .then(token => {
                if (token) {
                    //console.log('Device token:', token);
                    return token;
                } else {
                    console.log('No registration token available. Request permission to generate one.');
                    return null;
                }
            })
            .catch(err => {
                console.error('An error occurred while retrieving token:', err);
                return null;
            });
    }
}
