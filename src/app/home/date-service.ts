import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  private _selectedDate = new EventEmitter<Date>();

  get selectedDate() {
    return this._selectedDate;
  }

  updateDate(date: Date) {
    this._selectedDate.emit(date);
  }}
