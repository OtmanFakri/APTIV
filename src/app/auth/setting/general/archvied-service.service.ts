import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ArchviedServiceService {
    private readonly localStorageKey = 'is_delete';

    constructor() {
    }

    getSwitchValue(): boolean {
        const value = localStorage.getItem(this.localStorageKey);
        return value === 'true'; // Convert string to boolean
    }

    setSwitchValue(value: boolean): void {
        localStorage.setItem(this.localStorageKey, value.toString());
    }
}
