import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Component, NgZone, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {catchError, throwError} from "rxjs";
import {SettingsService} from "../settings.service";
import {tokeninfo} from "../InterfacesSetting";
import {NzSpinComponent} from "ng-zorro-antd/spin";
import {NgForOf, NgIf} from "@angular/common";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzListComponent, NzListItemComponent} from "ng-zorro-antd/list";
import {NzCardComponent} from "ng-zorro-antd/card";

@Component({
    selector: 'app-outlook',
    standalone: true,
    imports: [
        NzSpinComponent,
        NgIf,
        NzButtonComponent,
        NzIconDirective,
        NgForOf,
        NzListComponent,
        NzListItemComponent,
        NzCardComponent
    ],
    templateUrl: './outlook.component.html',
})
export class OutlookComponent implements OnInit {
    private clientId = 'c10a9afa-2fd2-47d9-9f76-5c9bb407440a';
    private authority = 'https://login.microsoftonline.com/common/oauth2/v2.0/';
    private redirectUri = 'https://localhost:4200/auth-callback';
    private scope = 'User.Read';
    IsLoding = false;
    TokenInfo: tokeninfo | null = null;

    constructor(
        private route: ActivatedRoute,
        private settingsService: SettingsService
    ) {
    }

    ngOnInit() {
        this.TokenMe();
    }

    login() {
        const authUrl = `${this.authority}authorize?client_id=${this.clientId}&response_type=code&redirect_uri=${encodeURIComponent(this.redirectUri)}&scope=${encodeURIComponent(this.scope)}`;
        window.open(authUrl, 'Login', 'width=500,height=600');
    }

    TokenMe() {
        this.IsLoding = true;
        this.settingsService.GetTokenOutlook().subscribe({
            next: (data) => {
                this.TokenInfo = data;
                this.IsLoding = false;
            },
            error: (error: HttpErrorResponse) => {
                this.IsLoding = false;
                console.error('There was an error!', error);
            }
        })
    }

    logout() {

    }

    get listData() {
        if (!this.TokenInfo) return [];

        return [
            { label: 'User Principal Name', value: this.TokenInfo.userPrincipalName },
            { label: 'ID', value: this.TokenInfo.id },
            { label: 'Display Name', value: this.TokenInfo.displayName },
            { label: 'Surname', value: this.TokenInfo.surname },
            { label: 'Given Name', value: this.TokenInfo.givenName },
            { label: 'Preferred Language', value: this.TokenInfo.preferredLanguage },
            { label: 'Email', value: this.TokenInfo.mail },
            { label: 'Business Phones', value: this.TokenInfo.businessPhones.join(', ') || 'None' }
        ];
    }
}
