import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private selectedCategoryTags = new BehaviorSubject<string[]>([]);
  private selectedDepartmentTags = new BehaviorSubject<string[]>([]);
  private selectedDepartmentKeys: number[] = [];

  selectedCategoryTags$ = this.selectedCategoryTags.asObservable();
  selectedDepartmentTags$ = this.selectedDepartmentTags.asObservable();

  setSelectedCategoryTags(tags: string[]): void {
    this.selectedCategoryTags.next(tags);
  }

  setSelectedDepartmentTags(tags: string[]): void {
    this.selectedDepartmentTags.next(tags);
  }

  updateSelectedDepartmentKeys(key: number, add: boolean): void {
    if (add) {
      if (!this.selectedDepartmentKeys.includes(key)) {
        this.selectedDepartmentKeys.push(key);
      }
    } else {
      const index = this.selectedDepartmentKeys.indexOf(key);
      if (index > -1) {
        this.selectedDepartmentKeys.splice(index, 1);
      }
    }
  }
  // Method to get the current list of selected department keys
  getSelectedDepartmentKeys(): number[] {
    return this.selectedDepartmentKeys;
  }
  clearAllFilters(): void {
    // Clear all filters
    this.selectedCategoryTags.next([]);
    this.selectedDepartmentTags.next([]);
    this.selectedDepartmentKeys = []; // Resetting the array directly
  }
}
