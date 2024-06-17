import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthentificatinService} from "./authentificatin.service";
import {BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError} from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public authService: AuthentificatinService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.getJwtToken()) {
      request = this.addToken(request, this.authService.getJwtToken());
    }

    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          this.handle401Error();
          return throwError(error);
        } else {
          return throwError(error);
        }
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  private handle401Error() {
    // Perform any necessary actions when a 401 error occurs
    // For example, you can redirect the user to the login page
    this.authService.logoutUser();
    // Optionally, you can navigate to the login page
    // this.router.navigate(['/login']);
  }
}
