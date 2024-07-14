import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ListUsers} from "./InterafcesUsers";
import {Observable} from "rxjs";
import {generatePassword} from "../helper/PasswordGenerator";

@Injectable({
    providedIn: 'root'
})
export class UsersServicesService {

    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {
    }


    getUsers(): Observable<ListUsers> {
        return this.http.get<ListUsers>(`${this.apiUrl}/user`)
    }

    createUser(employee_id: number) {
        return this.http.post(`${this.apiUrl}/user/create`, {
            employee_id: employee_id,
            hashed_password: generatePassword(),
        })

    }

    updateState_User(user_id: number, is_active: boolean) {
        return this.http.put(`${this.apiUrl}/user/${user_id}/set-status?is_active=${is_active}`,
            {})
    }

}
