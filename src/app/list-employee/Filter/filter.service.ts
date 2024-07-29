import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {FilterEmployee} from "../../interfaces/ListEmployee";

@Injectable({
    providedIn: 'root'
})
export class FilterService {

    private _filterEmployee: FilterEmployee = {
        employee_id: null,
        sex: null,
        min_seniority_years: null,
        department_ids: [],
        manger_ids: [],
        job_ids: [],
        year: new Date().getFullYear(),
        include_deleted: false,
    };

    get filterEmployee(): FilterEmployee {
        return this._filterEmployee;
    }


    clearFilterEmployee(): void {
        this._filterEmployee = {
            employee_id: null,
            sex: null,
            min_seniority_years: null,
            department_ids: [],
            manger_ids: [],
            job_ids: [],
            year: new Date().getFullYear(),
            include_deleted: false,
        };
    }

    addManagerId(managerId: number): void {
        // Ensure this._filterEmployee and this._filterEmployee.manger_ids are not null or undefined
        if (this._filterEmployee && this._filterEmployee.manger_ids) {
            if (this._filterEmployee.manger_ids.indexOf(managerId) === -1) {
                this._filterEmployee.manger_ids.push(managerId);
            }
        } else {
            // Handle the case where this._filterEmployee or this._filterEmployee.manger_ids is null/undefined
            console.error('Attempted to add a manager ID to a null or undefined manger_ids array');
        }
    }
}
