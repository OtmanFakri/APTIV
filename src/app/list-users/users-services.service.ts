import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ListUsers, PermstionModels} from "./InterafcesUsers";
import {Observable} from "rxjs";
import {generatePassword} from "../helper/PasswordGenerator";
import {AuthentificatinService} from "../auth/authentificatin.service";

@Injectable({
    providedIn: 'root'
})
export class UsersServicesService {

    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient,
                private authentificatinService: AuthentificatinService) {
    }

    get_CurrentUser() {
        return this.authentificatinService.getLoggedUser();
    }

    getUsers(): Observable<ListUsers> {
        return this.http.get<ListUsers>(`${this.apiUrl}/user/`)
    }

    createUser(employee_id: number, email: string) {
        return this.http.post(`${this.apiUrl}/user/create`, {
            employee_id: employee_id,
            email: email,
            hashed_password: generatePassword(),
        })

    }

    updateState_User(user_id: number, is_active: boolean) {
        return this.http.put(`${this.apiUrl}/user/${user_id}/set-status?is_active=${is_active}`,
            {})
    }

    GetPermstions(): Observable<PermstionModels[]> {
        //http://127.0.0.1:8011/api/permstions/get_all_model_permissions/{user_id}
        return this.http.get<PermstionModels[]>(`${this.apiUrl}/permstions/get_all_model_permissions/${this.get_CurrentUser().employee_id}`)
    }

    setPermissions(modelName: string, permissions: { [key: string]: boolean }) {
        return this.http.post(
            `${this.apiUrl}/permstions/set_permissions/${this.get_CurrentUser().employee_id}?model_name=${modelName}`,
            permissions
        );
    }
}
