import {Component, EventEmitter, Output} from '@angular/core';
import {NzSpaceComponent, NzSpaceItemDirective} from "ng-zorro-antd/space";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-select-date',
    standalone: true,
    imports: [
        NzSpaceComponent,
        NzSelectComponent,
        NzSpaceItemDirective,
        NzOptionComponent,
        NzDatePickerComponent,
        FormsModule
    ],
    templateUrl: './select-date.component.html',
})
export class SelectDateComponent {
    mode: 'date' | 'month' | 'year' = 'date';
    selectedDate: Date = new Date();

    @Output() dateAndModeChange = new EventEmitter<{ date: Date | null, mode: 'date' | 'month' | 'year' }>();

    onModeChange() {
        this.emitChange();
    }

    onDateChange(date: Date ) {
        this.selectedDate = date;
        this.emitChange();
    }

    private emitChange() {
        this.dateAndModeChange.emit({date: this.selectedDate, mode: this.mode});
    }
}
