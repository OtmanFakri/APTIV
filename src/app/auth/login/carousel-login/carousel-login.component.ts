import {Component} from '@angular/core';
import {NzCarouselComponent, NzCarouselContentDirective} from "ng-zorro-antd/carousel";
import {NgForOf} from "@angular/common";
import {NzIconDirective} from "ng-zorro-antd/icon";

interface CompanyValue {
    icon: string;
    text: string;
}

@Component({
    selector: 'app-carousel-login',
    standalone: true,
  imports: [
    NzCarouselComponent,
    NzCarouselContentDirective,
    NgForOf,
    NzIconDirective
  ],
    templateUrl: './carousel-login.component.html',
})
export class CarouselLoginComponent {
    values: CompanyValue[] = [
        {icon: 'trophy', text: 'Play to Win'},
        {icon: 'thunderbolt', text: 'Urgency'},
        {icon: 'team', text: 'One Team'},
        {icon: 'pie-chart', text: 'Passion'},
        {icon: 'cloud', text: 'Think Like Owner'},
        {icon: 'handshake', text: 'Respect'}
    ];
}
