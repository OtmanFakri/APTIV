import { Injectable } from '@angular/core';
import {FormData, PersonInformation, ProfessionalInformation} from "./profile.module";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  demoPersonInformation: PersonInformation = {
    last_name: 'Doe',
    first_name: 'John',
    cin: 'AB123456',
    phone: '+1234567890',
    sexe: 'Male',
    date_birth: new Date('1990-01-01'),
    cnss: 'CNSS123456',
    city: 'New York',
    region: 'NY',
  };
  demoProfessionalInformation: ProfessionalInformation = {
    mtc: '123',
    category: 'Category1',
    department: 'IT Department',
    job: 'Software Engineer',
    manager: 'Jane Smith',
    date_hiring: new Date('2020-01-01'),
    date_start: new Date('2020-02-01'),
    date_visit: new Date('2022-01-01'),
  };
  ListProfile: FormData[] = [
    {
      personInformation: this.demoPersonInformation,
      professionalInformation: this.demoProfessionalInformation,
    },
  ];
  constructor() { }


  getProfile() {
    return this.ListProfile;
  }
  addProfile(profile: any) {
    this.ListProfile.push(profile);
    console.log(profile)
  }
}
