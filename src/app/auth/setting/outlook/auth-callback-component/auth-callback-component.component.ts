import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {SettingsService} from "../../settings.service";

@Component({
    selector: 'app-auth-callback-component',
    standalone: true,
    imports: [],
    templateUrl: './auth-callback-component.component.html',
})
export class AuthCallbackComponentComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private settingsService: SettingsService) {
    }


    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            if (params['code']) {
                // Navigate back to the main component with the code
                //this.router.navigate(['/'], { queryParams: { code: params['code'] } });
                console.info(params['code'])
                this.getToken(params['code']);
            } else {
                // Handle error cases
                console.error('No code received in callback');
                //this.router.navigate(['/']);
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
