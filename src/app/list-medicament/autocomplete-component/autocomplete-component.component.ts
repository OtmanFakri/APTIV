import {Component, EventEmitter, Output} from '@angular/core';
import {autocompleteMedicament, Datum} from "../InterfacesMedicaments";
import {MedicamentService} from "../medicament.service";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {BehaviorSubject, catchError, debounceTime, distinctUntilChanged, map, Observable, of, switchMap} from "rxjs";
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NgForOf, NgIf} from "@angular/common";

@Component({
    selector: 'app-autocomplete-component',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NzSelectModule,
        NzIconDirective,
        NgIf,
        NgForOf,
        FormsModule
    ],
    templateUrl: './autocomplete-component.component.html',
})
export class AutocompleteComponentComponent {

    searchChange$ = new BehaviorSubject<string>('');
    optionList: Datum[] = [];
    selectedUser?: Datum;
    isLoading = false;

    @Output() userSelected = new EventEmitter<Datum>();

    constructor(private medicamentService: MedicamentService) {}

    ngOnInit(): void {
        const getMedicamentList = (keyword: string): Observable<Datum[]> =>
            this.medicamentService.autocomplete(keyword)
                .pipe(
                    catchError(() => of({
                        data: [],
                        total: 0,
                        pageSize: 0,
                        page: 0,
                        totalPages: 0
                    } as autocompleteMedicament)),
                    map((res: autocompleteMedicament) => res.data)
                );

        const optionList$: Observable<Datum[]> = this.searchChange$
            .asObservable()
            .pipe(debounceTime(500))
            .pipe(switchMap(getMedicamentList));

        optionList$.subscribe(data => {
            this.optionList = data;
            this.isLoading = false;
        });
    }

    onSearch(value: string): void {
        this.isLoading = true;
        this.searchChange$.next(value);
    }

    onSelect(value: Datum): void {
        this.selectedUser = value;
        this.userSelected.emit(value);
    }


}
