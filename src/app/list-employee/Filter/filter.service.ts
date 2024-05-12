import { Injectable } from '@angular/core';
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
    job_ids: []
  };

  get filterEmployee(): FilterEmployee {
    return this._filterEmployee;
  }

  set filterEmployee(employee: FilterEmployee) {
    this._filterEmployee = employee;
  }
  clearFilterEmployee(): void {
    this._filterEmployee = {
      employee_id: null,
      sex: null,
      min_seniority_years: null,
      department_ids: [],
      manger_ids: [],
      job_ids: []
    };
  }
}
