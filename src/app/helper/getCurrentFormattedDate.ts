import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';


export function formatDate(date: Date): string {
  let d = date;
  let month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}


// Custom validator to check that end date is after start date
export function dateRangeValidator(startControlName: string, endControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const start = control.get(startControlName)?.value;
    const end = control.get(endControlName)?.value;

    // Check if both dates are present and end date is before start date
    if (start && end && new Date(start) > new Date(end)) {
      // Return error if end date is before start date
      return {'dateRange': true};
    }
    return null;  // No error
  };
}
