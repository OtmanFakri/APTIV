import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, mapTo, Observable, of, tap} from "rxjs";
import {LoginInterface} from "./AuthInterfaces";

@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
export class AuthentificatinService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedUser!: number | null;
  private apiUrl = 'http://localhost:8011';

  constructor(private http: HttpClient) {}

  login(user: LoginInterface): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/user/login`, user).pipe(
      tap(response => this.doLoginUser(user.employee_id, response.access_token)),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      })
    );
  }
  logout() {
    return this.http.post<any>(`${this.apiUrl}/user/logout`, {}).pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      })
    );
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  logoutUser() {
    this.doLogoutUser();
  }

  private doLoginUser(username: number, accessToken: string) {
    this.loggedUser = username;
    this.storeJwtToken(accessToken);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
  }
}
