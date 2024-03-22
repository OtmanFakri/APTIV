import { Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ListEmployeeComponent} from "./list-employee/list-employee.component";
import {AddProfileComponent} from "./profile/add-profile/add-profile.component";
import {ProfileComponent} from "./profile/profile.component";
import {LoginComponent} from "./auth/login/login.component";

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'Employee', component: ListEmployeeComponent },
      { path: 'Employee/new', component: AddProfileComponent },
      { path: 'Employee/:id', component: ProfileComponent },
    ]
  },
  {path:'login', component:LoginComponent}
];
