import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {AuthentificatinService} from "./authentificatin.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthentificatinService, private router: Router) {
  }

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
