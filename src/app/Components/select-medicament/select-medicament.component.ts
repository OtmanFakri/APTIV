import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, debounceTime, map, switchMap} from 'rxjs/operators';
import {ReadMedicament} from '../../list-medicament/InterfacesMedicaments';
import {MedicamentService} from "../../list-medicament/medicament.service";
import {NgForOf, NgIf} from "@angular/common";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {FormsModule} from "@angular/forms";
import {items, ListMedicaments} from "../../list-medicament/InteracesMedicaments";

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
  optionList: items[] = [];
  isLoading = false;
  currentPage = 1;

  @Input() searchTerm: string | null = null;
  @Input() selectedMedicament: items | null = null;
  @Output() medicationSelected = new EventEmitter<items>();
  compareWith = (o1: items, o2: items): boolean => (o1 && o2 ? o1.name === o2.name : o1 === o2);

  constructor(private medicamentService: MedicamentService) {}

  ngOnInit(): void {
    this.setupSearch();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedMedicament'] && this.selectedMedicament) {
      this.setDefaultSelection(this.selectedMedicament.name);
    } else if (changes['searchTerm'] && this.searchTerm) {
      this.setDefaultSelection(this.searchTerm);
    }
  }

  private setupSearch(): void {
    const searchMedication = (searchTerm: string): Observable<ListMedicaments> =>
      this.medicamentService.readMedicament(this.currentPage, searchTerm).pipe(
        map((response: any) => response as ListMedicaments),
        catchError(() => of({items: [], total: 0, page: 1, size: 0, pages: 0}))
      );

    this.searchChange$
      .asObservable()
      .pipe(
        debounceTime(500),
        switchMap(searchMedication),
        map((response: ListMedicaments) => response.items)
      )
      .subscribe(data => {
        this.optionList = data;
        this.isLoading = false;

        // If there's a selected medicament, ensure it's in the option list
        if (this.selectedMedicament) {
          const found = this.optionList.find(item => item.name === this.selectedMedicament?.name);
          if (!found) {
            this.optionList = [this.selectedMedicament, ...this.optionList];
          }
        }
      });
  }

  onSearch(value: string): void {
    this.isLoading = true;
    this.currentPage = 1;
    this.searchChange$.next(value);
  }

  onSelectionChange(value: items): void {
    this.selectedMedicament = value;
    this.medicationSelected.emit(value);
  }

  loadMore(): void {
    this.currentPage++;
    this.medicamentService.readMedicament(this.currentPage, this.searchChange$.getValue())
      .pipe(
        map((response: any) => response as ListMedicaments)
      )
      .subscribe(
        (data: ListMedicaments) => {
          this.optionList = [...this.optionList, ...data.items];
        },
        error => {
          console.error('Error loading more medicaments:', error);
        }
      );
  }

  private setDefaultSelection(searchTerm: string): void {
    if (!searchTerm) return;

    this.medicamentService.readMedicament(1, searchTerm)
      .pipe(
        map((response: any) => response as ListMedicaments),
        catchError(() => of({items: [], total: 0, page: 1, size: 0, pages: 0}))
      )
      .subscribe(response => {
        const foundItem = response.items.find(item => item.name === searchTerm);
        if (foundItem) {
          this.selectedMedicament = foundItem;
          this.optionList = [foundItem, ...this.optionList.filter(item => item.name !== searchTerm)];
        }
      });
  }
}
