import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NzSwitchComponent} from "ng-zorro-antd/switch";
import {ArchviedServiceService} from "./archvied-service.service";

@Component({
    selector: 'app-general',
    standalone: true,
    imports: [
        FormsModule,
        NzSwitchComponent
    ],
    templateUrl: './general.component.html',
})
export class GeneralComponent {
    is_delete: boolean = false;

    constructor(private switchService: ArchviedServiceService) {
    }

    ngOnInit(): void {
        // Load the switch value from the service on initialization
        this.is_delete = this.switchService.getSwitchValue();
    }

    onSwitchChange(value: boolean): void {
        // Save the switch value using the service
        this.switchService.setSwitchValue(value);
    }
}
