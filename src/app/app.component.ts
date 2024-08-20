import {Component, HostListener, inject, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {NgIf} from "@angular/common";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {Router} from '@angular/router';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenInterceptor} from "./auth/TokenInterceptor";
import {AuthentificatinService} from "./auth/authentificatin.service";
import {jwtDecode} from "jwt-decode";
import {initializeApp} from "firebase/app";
import {environment} from "./configuration/environment";
import {getMessaging, getToken} from "firebase/messaging";
import {Messaging, onMessage} from "@angular/fire/messaging";
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {NzAlertComponent} from "ng-zorro-antd/alert";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, NgIf, DashboardComponent, RouterLink, RouterLinkActive, NzAlertComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',

})
export class AppComponent implements OnInit {
    title = 'APTIV-Front';
    toggle_profile: boolean = false;
    close_side_bar: boolean = false;
    private readonly _messaging = inject(Messaging);

    constructor(private router: Router,
                private authService: AuthentificatinService,
                private notification: NzNotificationService) {
    }

    ngOnInit(): void {
        this.checkTokenExpiration();
        //this._getDeviceToken();
        this._onMessage();
    }

    private _getDeviceToken(): void {
        getToken(this._messaging, {vapidKey: environment.vapidKey})
            .then((token) => {
                console.log(token);
                // save the token in the server, or do whathever you want
            })
            .catch((error) => console.log('Token error', error));
    }

    private _onMessage(): void {
        onMessage(this._messaging, {
            next: (payload) => {
                console.log('Message', payload);
                const notificationTitle = payload.notification?.title || 'New Message';
                const notificationBody = payload.notification?.body || 'You have a new message.';
                this.notification.info(notificationTitle, notificationBody,);
            },
            error: (error) => {
                console.log('Message error', error);
            },
            complete: () => {
                console.log('Done listening to messages');
            },
        });
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
