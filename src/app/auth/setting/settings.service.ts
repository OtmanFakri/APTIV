import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment as env_produ} from "../../../environments/environment";
import {AuthentificatinService} from "../authentificatin.service";
import {Observable} from "rxjs";
import {NotificationPreferences, requestUserPreferences} from "./InterfacesSetting";

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    constructor(private http: HttpClient,
                private authentificatinService: AuthentificatinService) {
    }

    private apiUrl = `${env_produ.apiUrl}`;

    getNotificationPreferences(): Observable<NotificationPreferences> {
        return this.http.get<NotificationPreferences>(`${this.apiUrl}/user/${this.user_id}/preferences`);
    }

    get user_id(): number | null {
        return this.authentificatinService.getLoggedUser().employee_id;
    }

    updateNotificationPreference(param: requestUserPreferences) {
        return this.http.put(`${this.apiUrl}/user/${this.user_id}/notification-preferences/${param.id}`, param);
    }
}
