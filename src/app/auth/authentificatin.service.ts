import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, mapTo, Observable, of, tap} from "rxjs";
import {LoginInterface} from "./AuthInterfaces";
import {initializeApp} from 'firebase/app';
import {getMessaging, getToken} from 'firebase/messaging';
import {environment} from "../configuration/environment";
import {getApp} from "@angular/fire/app";
import {environment as env_produ} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthentificatinService {
    private readonly JWT_TOKEN = 'JWT_TOKEN';
    private readonly USER_ID = 'USER_ID';
    private readonly USER_FULL_NAME = 'USER_FULL_NAME';
    private apiUrl = `${env_produ.apiUrl}`;


    constructor(private http: HttpClient) {
    }

    login(user: LoginInterface): Observable<boolean> {
        return this.http.post<any>(`${this.apiUrl}/user/login`, user).pipe(
            tap(response => this.doLoginUser(response.access_token)),
            mapTo(true),
            catchError(error => {
                alert(error.error);
                return of(false);
            })
        );
    }


    UpdateFcmToken(fcmToken: String) {
        return this.http.put(`${this.apiUrl}/user/${this.getLoggedUser().employee_id}/fcm-token?fcm_token=${fcmToken}`, {});
    }

    async signup(employeeId: number, hashedPassword: string) {
        try {
            // Register the service worker
            const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');

            const messaging = getMessaging(getApp());

            // Request permission and get token
            const permission = await Notification.requestPermission();
            if (permission !== 'granted') {
                throw new Error('Notification permission not granted');
            }

            const fcmToken = await getToken(messaging, {
                vapidKey: environment.vapidKey,
                serviceWorkerRegistration: registration
            });

            const requestBody = {
                employee_id: employeeId,
                hashed_password: hashedPassword,
                fcm_device_token: fcmToken
            };

            return await this.http.post(`${this.apiUrl}/user/create`, requestBody).toPromise();
        } catch (error) {
            console.error('Error in signup process:', error);
            throw error;
        }
    }

    logout(): Observable<boolean> {
        const token = this.getJwtToken();
        const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
        const options = {headers};
        return this.http.post<any>(`${this.apiUrl}/user/logout`, {}, options).pipe(
            tap(() => this.doLogoutUser()),
            mapTo(true),
            catchError(error => {
                alert(error.error);
                this.removeTokens()
                return of(false);
            })
        );
    }

    isLoggedIn(): boolean {
        return !!this.getJwtToken() && !!localStorage.getItem(this.USER_ID);
    }

    getJwtToken(): string | null {
        return localStorage.getItem(this.JWT_TOKEN);
    }

    private doLoginUser(accessToken: string): void {
        this.storeJwtToken(accessToken);
        this.decodeAndStoreUserInfo(accessToken);
    }

    private decodeAndStoreUserInfo(token: string): void {
        const decodedToken = this.decodeJwtToken(token);
        if (decodedToken) {
            localStorage.setItem(this.USER_ID, decodedToken.employee_id.toString());
            localStorage.setItem(this.USER_FULL_NAME, decodedToken.full_name);
        }
    }

    private decodeJwtToken(token: string): any {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            return JSON.parse(atob(base64));
        } catch (error) {
            console.error('Error decoding JWT token:', error);
            return null;
        }
    }

    private doLogoutUser(): void {
        this.removeTokens();
    }

    private storeJwtToken(jwt: string): void {
        localStorage.setItem(this.JWT_TOKEN, jwt);
    }

    getLoggedUser(): { employee_id: number | null, full_name: string | null } {
        return {
            employee_id: Number(localStorage.getItem(this.USER_ID)) || null,
            full_name: localStorage.getItem(this.USER_FULL_NAME)
        };
    }

    logoutUser(): void {
        this.doLogoutUser();
    }

    removeTokens(): void {
        localStorage.removeItem(this.JWT_TOKEN);
        localStorage.removeItem(this.USER_ID);
        localStorage.removeItem(this.USER_FULL_NAME);
    }
}
