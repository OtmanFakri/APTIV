import { Component } from '@angular/core';
import {OverviewDepComponent} from "./overview-dep/overview-dep.component";
import {OverviewCatgoryComponent} from "./overview-catgory/overview-catgory.component";
import {OverviewGendreComponent} from "./overview-gendre/overview-gendre.component";

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    OverviewDepComponent,
    OverviewCatgoryComponent,
    OverviewGendreComponent
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {

}
