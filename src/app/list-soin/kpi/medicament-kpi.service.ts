import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicamentKpiService {
  private baseUrl = 'http://127.0.0.1:8011/medicament/kpis';

  constructor(private http: HttpClient) {
  }

  getTotalUsageByCategory(year: number | null, month?: number | null, day?: number | null): Observable<any> {
    let url = `${this.baseUrl}/total-medicament-usage-by-category?`;
    if (year !== null) url += `year=${year}&`;
    if (month !== null && month !== undefined) url += `month=${month}&`;
    if (day !== null && day !== undefined) url += `day=${day}`;
    return this.http.get(url.replace(/[&?]$/, ''));
  }

  getAverageMedicamentPerSoinByCategory(year: number | null, month?: number | null, day?: number | null): Observable<any> {
    let url = `${this.baseUrl}/average-medicament-quantity-per-soin-by-category?`;
    if (year !== null) url += `year=${year}&`;
    if (month !== null && month !== undefined) url += `month=${month}&`;
    if (day !== null && day !== undefined) url += `day=${day}`;
    return this.http.get(url.replace(/[&?]$/, ''));
  }

  getNumberOfSoinsByCategory(year: number | null, month?: number | null, day?: number | null): Observable<any> {
    let url = `${this.baseUrl}/number-of-soins-by-category?`;
    if (year !== null) url += `year=${year}&`;
    if (month !== null && month !== undefined) url += `month=${month}&`;
    if (day !== null && day !== undefined) url += `day=${day}`;
    return this.http.get(url.replace(/[&?]$/, ''));
  }

  getTotalUsageByDepartment(year: number | null, month?: number | null, day?: number | null): Observable<any> {
    let url = `${this.baseUrl}/total-medicament-usage-by-department?`;
    if (year !== null) url += `year=${year}&`;
    if (month !== null && month !== undefined) url += `month=${month}&`;
    if (day !== null && day !== undefined) url += `day=${day}`;
    return this.http.get(url.replace(/[&?]$/, ''));
  }

  getAverageMedicamentPerSoinByDepartment(year: number | null, month?: number | null, day?: number | null): Observable<any> {
    let url = `${this.baseUrl}/average-medicament-quantity-per-soin-by-department?`;
    if (year !== null) url += `year=${year}&`;
    if (month !== null && month !== undefined) url += `month=${month}&`;
    if (day !== null && day !== undefined) url += `day=${day}`;
    return this.http.get(url.replace(/[&?]$/, ''));
  }

  getNumberOfSoinsByDepartment(year: number | null, month?: number | null, day?: number | null): Observable<any> {
    let url = `${this.baseUrl}/number-of-soins-by-department?`;
    if (year !== null) url += `year=${year}&`;
    if (month !== null && month !== undefined) url += `month=${month}&`;
    if (day !== null && day !== undefined) url += `day=${day}`;
    return this.http.get(url.replace(/[&?]$/, ''));
  }

  getNumberOfSoinsByGender(year: number | null, month?: number | null, day?: number | null): Observable<any> {
    let url = `${this.baseUrl}/number_of_soins_by_gender?`;
    if (year !== null) url += `year=${year}&`;
    if (month !== null && month !== undefined) url += `month=${month}&`;
    if (day !== null && day !== undefined) url += `day=${day}`;
    return this.http.get(url.replace(/[&?]$/, ''));
  }

  getTotalUsageByGender(year: number | null, month?: number | null, day?: number | null): Observable<any> {
    let url = `${this.baseUrl}/total_medicament_usage_by_gender?`;
    if (year !== null) url += `year=${year}&`;
    if (month !== null && month !== undefined) url += `month=${month}&`;
    if (day !== null && day !== undefined) url += `day=${day}`;
    return this.http.get(url.replace(/[&?]$/, ''));
  }

  getAverageMedicamentPerSoinByGender(year: number | null, month?: number | null, day?: number | null): Observable<any> {
    let url = `${this.baseUrl}/average_medicament_quantity_per_soin_by_gender?`;
    if (year !== null) url += `year=${year}&`;
    if (month !== null && month !== undefined) url += `month=${month}&`;
    if (day !== null && day !== undefined) url += `day=${day}`;
    return this.http.get(url.replace(/[&?]$/, ''));
  }

}
