import {Component, EventEmitter, Output} from '@angular/core';
import {ShiftEnum} from "../../enum/ShiftEnum";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-shift-selector',
  standalone: true,
  imports: [
    NzSelectComponent,
    FormsModule,
    NzOptionComponent,
    NgForOf
  ],
  templateUrl: './shift-selector.component.html',
})
export class ShiftSelectorComponent {
  @Output() shiftSelected = new EventEmitter<ShiftEnum>();

  shifts = Object.entries(ShiftEnum).map(([key, value]) => ({key, value}));
  selectedShift: keyof typeof ShiftEnum | null = null;

  onShiftChange() {
    if (this.selectedShift) {
      this.shiftSelected.emit(ShiftEnum[this.selectedShift]);
    }
  }
}
