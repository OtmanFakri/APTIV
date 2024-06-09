import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, debounceTime, map, switchMap} from 'rxjs/operators';
import {EmployeeService} from "../../list-employee/employee.service";
import {Item, ListEmployee} from "../../interfaces/ListEmployee";
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzIconDirective} from "ng-zorro-antd/icon";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-employee-id-input',
  standalone: true,
  imports: [
    NzSelectModule,
    NzIconDirective,
    FormsModule,
    NgForOf,
    NgIf,
  ],
  templateUrl: './employee-id-input.component.html',
})
export class EmployeeIdInputComponent implements OnInit {
  searchChange$ = new BehaviorSubject<string>('');
  optionList: Item[] = [];
  isLoading = false;
  selectedEmployee: Item | null = null;

  @Input() employeeId: number | null = null;
  @Output() employeeSelected = new EventEmitter<Item>();

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    if (this.employeeId) {
      this.onSearch(String(this.employeeId));
    }

    const searchEmployee = (searchTerm: string): Observable<ListEmployee> =>
      this.employeeService.filterEmployeesById(Number(searchTerm))
        .pipe(
          catchError(() => of({ items: [], total: 0, page: 1, size: 50, pages: 1 }))
        );

    const optionList$: Observable<Item[]> = this.searchChange$
      .asObservable()
      .pipe(debounceTime(500))
      .pipe(switchMap(searchEmployee))
      .pipe(map((response: ListEmployee) => response.items));

    optionList$.subscribe(data => {
      this.optionList = data;
      this.selectedEmployee = data[0];
      this.isLoading = false;
    });
  }

  onSearch(value: string): void {
    this.isLoading = true;
    this.searchChange$.next(value);
  }

  onSelectionChange(value: Item): void {
    this.employeeSelected.emit(value);
  }
}
