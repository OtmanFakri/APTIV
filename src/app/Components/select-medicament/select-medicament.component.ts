import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, debounceTime, map, switchMap} from 'rxjs/operators';
import {ReadMedicament} from '../../list-medicament/InterfacesMedicaments';
import {MedicamentService} from "../../list-medicament/medicament.service";
import {NgForOf, NgIf} from "@angular/common";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-select-medicament',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NzIconDirective,
    NzOptionComponent,
    NzSelectComponent,
    FormsModule
  ],
  templateUrl: './select-medicament.component.html',
})
export class SelectMedicamentComponent implements OnInit {
  searchChange$ = new BehaviorSubject<string>('');
  optionList: ReadMedicament[] = [];
  selectedMedication: ReadMedicament | null = null;
  isLoading = false;

  @Input() searchTerm: string | null = null;
  @Output() medicationSelected = new EventEmitter<ReadMedicament>();

  constructor(private medicationService: MedicamentService) {
  }

  ngOnInit(): void {
    if (this.searchTerm) {
      this.onSearch(this.searchTerm);
    }

    const searchMedication = (searchTerm: string): Observable<ReadMedicament[]> =>
      this.medicationService.selectMedicament(searchTerm)
        .pipe(
          catchError(() => of([]))
        );

    const optionList$: Observable<ReadMedicament[]> = this.searchChange$
      .asObservable()
      .pipe(debounceTime(500))
      .pipe(switchMap(searchMedication))
      .pipe(map((response: ReadMedicament[]) => response));

    optionList$.subscribe(data => {
      this.optionList = data;
      this.selectedMedication = data[0];
      this.isLoading = false;
    });
  }

  onSearch(value: string): void {
    this.isLoading = true;
    this.searchChange$.next(value);
  }

  onSelectionChange(value: ReadMedicament): void {
    this.medicationSelected.emit(value);
  }
}
