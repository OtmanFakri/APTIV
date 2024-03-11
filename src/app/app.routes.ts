import { Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ListEmployeeComponent} from "./list-employee/list-employee.component";
import {AddProfileComponent} from "./profile/add-profile/add-profile.component";

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  {path:'Employee', component:ListEmployeeComponent},
  {path:'Employee/new', component:AddProfileComponent},

];
