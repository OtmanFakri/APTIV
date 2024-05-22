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
    }

    getCurrentYear(): number {
        return new Date().getFullYear();
    }

    getCurrentWeek(): number {
        const currentDate = new Date();
        const startDate = new Date(currentDate.getFullYear(), 0, 1);
        const days = Math.floor((currentDate.valueOf() - startDate.valueOf()) / (24 * 60 * 60 * 1000));
        const weekNumber = Math.ceil((currentDate.getDay() + 1 + days) / 7);
        return weekNumber;
    }

}
