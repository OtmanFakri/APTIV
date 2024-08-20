import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Component, NgZone, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {catchError, throwError} from "rxjs";

@Component({
    selector: 'app-outlook',
    standalone: true,
    imports: [],
    templateUrl: './outlook.component.html',
})
export class OutlookComponent implements OnInit {
    private clientId = 'c10a9afa-2fd2-47d9-9f76-5c9bb407440a';
    private authority = 'https://login.microsoftonline.com/common/oauth2/v2.0/';
    private redirectUri = 'https://localhost:4200/auth-callback';
    private scope = 'User.Read';

    constructor(
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            const code = params['code'];
        });
    }

    login() {
        const authUrl = `${this.authority}authorize?client_id=${this.clientId}&response_type=code&redirect_uri=${encodeURIComponent(this.redirectUri)}&scope=${encodeURIComponent(this.scope)}`;
        window.open(authUrl, 'Login', 'width=500,height=600');
    }


}
