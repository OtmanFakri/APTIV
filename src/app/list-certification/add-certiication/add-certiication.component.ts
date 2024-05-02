import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {getISOWeek} from "date-fns";
import {NzDatePickerComponent, NzRangePickerComponent} from "ng-zorro-antd/date-picker";

@Component({
  selector: 'app-add-certiication',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NzRangePickerComponent,
    NzDatePickerComponent,
  ],
  templateUrl: './add-certiication.component.html',
})
export class AddCertiicationComponent {
  form: FormGroup;
  Duration: string='0 day';
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      employee_id: [null, Validators.required],
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      category: [null, Validators.required],
      validation: [null, Validators.required],
      department: [null, Validators.required],
      manager: [null, Validators.required],
      doctor_id: [null, Validators.required],
      specialty: [null, Validators.required],
      dateRange: [null, Validators.required] // Handles both dates
    });
  }
  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
  calculateDuration(startDate: Date, endDate: Date) {
    if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
      const diff = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
      this.Duration = diff > 0 ? diff + ' days' : '0 day';
      return diff > 0 ? diff + ' days' : '0 day';
    }

    return '0 day';
  }

  onRangeChange(result: Date[]): void {
    if (result && result.length === 2) {
      const [start, end] = result;
      this.form.patchValue({
        date_start: start,
        date_end: end
      });
      this.calculateDuration(start, end);
    }
  }



}
