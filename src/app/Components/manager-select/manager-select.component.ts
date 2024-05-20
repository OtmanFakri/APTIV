import {Component, EventEmitter, forwardRef, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {SearchManger} from "../../interfaces/ListEmployee";
import {catchError, debounceTime, delay, distinctUntilChanged, startWith, switchMap, tap} from "rxjs";
import {EmployeeService} from "../../list-employee/employee.service";
import {Observable, of} from 'rxjs';
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {NzIconDirective} from "ng-zorro-antd/icon";


@Component({
  selector: 'app-manager-select',
  standalone: true,
  imports: [
    NzSelectComponent,
    ReactiveFormsModule,
    NgClass,
    NzOptionComponent,
    NzIconDirective,
    NgForOf,
    NgIf
  ],
  templateUrl: './manager-select.component.html',
  styleUrl: './manager-select.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ManagerSelectComponent),
      multi: true
    }
  ]
})
export class ManagerSelectComponent implements OnInit, ControlValueAccessor {
  optionList: SearchManger[] = [];
  isLoading = false;
  control = new FormControl();
  onChange: any = () => {};
  onTouch: any = () => {};

  @Output() managerSelected = new EventEmitter<SearchManger>();

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.control.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => {
        if (value) {
          this.onSearch(value);
        }
        return of([]);
      }),
      catchError(error => {
        console.error("Error in search: ", error);
        return of([]);
      })
    ).subscribe();
  }

  onSearch(query: string): void {
    if (query) {
      this.isLoading = true;
      this.employeeService.GETSERACHMANGER(query).subscribe(
        (data: SearchManger[]) => {
          this.optionList = data;
          this.isLoading = false;
        },
        error => {
          console.error('Error searching managers', error);
          this.isLoading = false;
        }
      );
    } else {
      this.optionList = [];
    }
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this.control.setValue(value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  selectManager(manager: SearchManger): void {
    this.managerSelected.emit(manager);
    this.onChange(manager.id);
    this.onTouch();
  }
}
