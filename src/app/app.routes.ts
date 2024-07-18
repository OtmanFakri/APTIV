import {Routes} from '@angular/router';
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
import {AddCertiicationComponent} from "./list-certification/add-certiication/add-certiication.component";
import {DetailComponent} from "./examination/detail/detail.component";
import {ListMedicamentComponent} from "./list-medicament/list-medicament.component";
import {ListSoinComponent} from "./list-soin/list-soin.component";
import {AuthGuard} from "./auth/AuthGuard";
import {SingupComponent} from "./auth/singup/singup.component";
import {ListUsersComponent} from "./list-users/list-users.component";
import {ListInjuryComponent} from "./list-injury/list-injury.component";

export const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        children: [
            {path: '', component: HomeComponent},
            {path: 'Employee', component: ListEmployeeComponent},
            {path: 'Departments', component: ListDepartmentComponent},
            {path: 'Employee/new', component: AddProfileComponent},
            {
                path: 'Employee/:id',
                component: ProfileComponent,
                children: [
                    {path: 'profile', component: InfoProfileComponent},
                    {path: 'certification', component: InfoCertificationComponent},
                    {path: 'consultation', component: InfoConsultationComponent},
                    {path: 'accidents', component: InfoAccidentsComponent},
                ],
            },
            {path: 'Doctors', component: ListDoctorComponent},
            {path: 'Doctors/:id', component: DoctorComponent},
            {path: 'examination', component: ExaminationComponent},
            {path: 'examination/:id', component: DetailComponent},
            {path: 'certifications', component: ListCertificationComponent},
            {path: 'medicament', component: ListMedicamentComponent},
            {path: 'soins', component: ListSoinComponent},
            {path: 'users', component: ListUsersComponent},
            {path: 'injury', component: ListInjuryComponent},
            {path: 'singup', component: SingupComponent}
        ]
    },
    {path: 'login', component: LoginComponent}
];
