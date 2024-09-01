import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {SettingsService} from "../../settings.service";
import {AuthentificatinService} from "../../../authentificatin.service";

@Component({
    selector: 'app-auth-callback-component',
    standalone: true,
    imports: [],
    templateUrl: './auth-callback-component.component.html',
})
export class AuthCallbackComponentComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private settingsService: SettingsService,
        private authService: AuthentificatinService
    ) {
    }


    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            const code = params['code'];
            if (code) {
                this.authService.getOutlookToken(code).subscribe(
                    success => {
                        if (success) {
                            this.router.navigate(['/']); // or wherever you want to redirect after successful login
                        } else {
                            this.router.navigate(['/login']);
                        }
                    },
                    error => {
                        console.error('Authentication error:', error);
                        this.router.navigate(['/login']);
                    }
                );
            } else {
                this.router.navigate(['/login']);
            }
        });
    }

    private getToken(code: string) {
        console.log('Sending request to FastAPI backend...');
        this.settingsService.SetTokenOutlook(code).subscribe({
            next: data => {
                console.log('Received response from FastAPI backend:', data);
                },
            error: error => {
                console.error('An error occurred:', error);
                this.handleError(error);

            }
        })
    }

    private handleError(error: HttpErrorResponse) {
        console.error('An error occurred:', error);
        if (error.error instanceof ErrorEvent) {
            console.error('Client-side error:', error.error.message);
        } else {
            console.error(`Backend returned code ${error.status}, body was:`, error.error);
        }
        return throwError('Something bad happened; please try again later.');
    }
}
