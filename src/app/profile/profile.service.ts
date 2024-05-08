import { Injectable } from '@angular/core';
import {FormData, PersonInformation, ProfessionalInformation} from "./profile.module";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {ProfileEmployee} from "../interfaces/profileEmployee";
import {NewEmployee} from "../interfaces/ListEmployee";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseUrl = 'http://127.0.0.1:8011/employee';

  constructor(private http: HttpClient) { }

  getEmployeeProfile(employeeId: number): Observable<ProfileEmployee> {
    const url = `${this.baseUrl}/${employeeId}`;
    return this.http.get<ProfileEmployee>(url);
  }

  // Observable source
  private employeeProfileSource = new BehaviorSubject<ProfileEmployee | null>(null);
  // Observable stream
  employeeProfile$ = this.employeeProfileSource.asObservable();

  // Method to update employee profile
  updateEmployeeProfile(profile: ProfileEmployee | null) {
    this.employeeProfileSource.next(profile);
  }

  addProfile(profile: NewEmployee) {
    console.log(profile)
  }
}
