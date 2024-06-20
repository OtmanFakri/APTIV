import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, mapTo, Observable, of, tap} from "rxjs";
import {LoginInterface} from "./AuthInterfaces";


@Injectable({
  providedIn: 'root'
})
export class AuthentificatinService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedUser!: number | null;
  private apiUrl = 'http://localhost:8011';

  constructor(private http: HttpClient) {
  }

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
    return !!this.getJwtToken();
  }

  getJwtToken(): string | null {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  logoutUser(): void {
    this.doLogoutUser();
  }

  private doLoginUser(username: number, accessToken: string): void {
    this.loggedUser = username;
    this.storeJwtToken(accessToken);
  }

  private doLogoutUser(): void {
    this.loggedUser = null;
    this.removeTokens();
  }

  private storeJwtToken(jwt: string): void {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  getLoggedUser(): number | null {
    return this.loggedUser;
  }

  removeTokens(): void {
    localStorage.removeItem(this.JWT_TOKEN);
  }
}
