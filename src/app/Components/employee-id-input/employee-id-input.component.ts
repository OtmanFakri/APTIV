import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, debounceTime, map, switchMap} from 'rxjs/operators';
import {EmployeeService} from "../../list-employee/employee.service";
import {Item, ListEmployee} from "../../interfaces/ListEmployee";
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzIconDirective} from "ng-zorro-antd/icon";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {ProfileService} from "../../profile/profile.service";
import {EmployeeDetails} from "../../profile/Interfaces";

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
export class EmployeeIdInputComponent implements OnInit, OnChanges {
    searchChange$ = new BehaviorSubject<string>('');
    optionList: Item[] = [];
    isLoading = false;
    selectedEmployee: Item | null = null;

    @Input() employeeId: number | null = null;
    @Input() disabled = false;
    @Output() employeeSelected = new EventEmitter<Item | null>();

    constructor(private employeeService: EmployeeService) {
    }

    ngOnInit(): void {
        this.setupSearch();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['employeeId'] && this.employeeId) {
            this.loadEmployeeById(this.employeeId);
        }
    }

    setupSearch(): void {
        const searchEmployee = (searchTerm: string): Observable<ListEmployee> =>
            this.employeeService.filterEmployeesById(Number(searchTerm))
                .pipe(
                    catchError(() => of({items: [], total: 0, page: 1, size: 50, pages: 1}))
                );

        const optionList$: Observable<Item[]> = this.searchChange$
            .asObservable()
            .pipe(
                debounceTime(500),
                switchMap(searchEmployee),
                map((response: ListEmployee) => response.items)
            );

        optionList$.subscribe(data => {
            this.optionList = data;
            this.isLoading = false;
        });
    }

    loadEmployeeById(id: number): void {
        this.isLoading = true;
        this.employeeService.filterEmployeesById(id).subscribe(
            (response: ListEmployee) => {
                if (response.items.length > 0) {
                    const employee = response.items[0];
                    this.selectedEmployee = employee;
                    this.optionList = [employee];
                    this.employeeSelected.emit(employee);
                } else {
                    console.error('Employee not found');
                    this.selectedEmployee = null;
                    this.employeeSelected.emit(null);
                }
                this.isLoading = false;
            },
            error => {
                console.error('Error loading employee:', error);
                this.isLoading = false;
            }
        );
    }

    onSearch(value: string): void {
        this.isLoading = true;
        this.searchChange$.next(value);
    }

    onSelectionChange(value: Item | null): void {
        this.selectedEmployee = value;
        this.employeeSelected.emit(value);
    }

    displayEmployee(employee: Item): string {
        return employee ? `${employee.first_name} ${employee.last_name} (ID: ${employee.id})` : '';
    }
}
