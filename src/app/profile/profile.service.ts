import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  ListProfile: any[] = [];
  constructor() { }


  getProfile() {
    return this.ListProfile;
  }
  addProfile(profile: any) {
    this.ListProfile.push(profile);
  }
}
