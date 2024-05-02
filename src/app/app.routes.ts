import { Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ListEmployeeComponent} from "./list-employee/list-employee.component";
import {AddProfileComponent} from "./profile/add-profile/add-profile.component";
import {ProfileComponent} from "./profile/profile.component";
import {LoginComponent} from "./auth/login/login.component";
import {InfoProfileComponent} from "./profile/me/info-profile/info-profile.component";
import {InfoCertificationComponent} from "./profile/me/info-certification/info-certification.component";
import {InfoConsultationComponent} from "./profile/me/info-consultation/info-consultation.component";
import {InfoAccidentsComponent} from "./profile/me/info-accidents/info-accidents.component";
import {HomeComponent} from "./home/home.component";
import {ListCertificationComponent} from "./list-certification/list-certification.component";
import {ListDepartmentComponent} from "./list-department/list-department.component";
import {ListDoctorComponent} from "./list-doctor/list-doctor.component";
import {DoctorComponent} from "./list-doctor/doctor/doctor.component";
import {ExaminationComponent} from "./examination/examination.component";

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'Employee', component: ListEmployeeComponent },
      { path: 'Departments', component: ListDepartmentComponent },
      { path: 'Employee/new', component: AddProfileComponent },
      { path: 'Employee/:id',
        component: ProfileComponent,
        children: [
          { path: 'profile', component: InfoProfileComponent },
          { path: 'certification', component: InfoCertificationComponent },
          { path: 'consultation', component: InfoConsultationComponent },
          { path: 'accidents', component: InfoAccidentsComponent },
        ],
      },
      {path:'Doctors', component:ListDoctorComponent},
      {path:'Doctors/:id', component:DoctorComponent},
      { path: 'examination', component: ExaminationComponent},
      { path: 'certifications', component: ListCertificationComponent },

    ]
  },
  {path:'login', component:LoginComponent}
];
