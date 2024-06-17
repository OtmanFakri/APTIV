import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {autocompleteMedicament, MedicamentCreate, MedicamentDetail, ReadMedicament} from "./InterfacesMedicaments";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MedicamentService {


  private apiUrl = 'http://127.0.0.1:8011';
  private medicamentapi = 'https://api.medicament.ma/v2'

  constructor(private http: HttpClient) {
  }

  createMedicament(medicament: MedicamentCreate): Observable<MedicamentCreate> {
    return this.http.post<MedicamentCreate>(`${this.apiUrl}/medicaments`, medicament);
  }

  updateMedicament(id: number, medicament: MedicamentCreate): Observable<MedicamentCreate> {
    return this.http.put<MedicamentCreate>(`${this.apiUrl}${id}`, medicament);
  }

  readMedicament(page: number = 1) {
    return this.http.get(`${this.apiUrl}/medicaments/?page=${page}`);
  }

  autocomplete(keyword: string, comparison: string = 'contains'): Observable<autocompleteMedicament> {
    return this.http.get<autocompleteMedicament>(`${this.apiUrl}/medicaments/medication/?keyword=${keyword}`,);
  }

  informationMedicament(id: number): Observable<MedicamentDetail> {
    return this.http.get<MedicamentDetail>(`${this.medicamentapi}/medicines/id/${id}`);
  }

  selectMedicament(name: string): Observable<ReadMedicament[]> {
    return this.http.post<ReadMedicament[]>(`${this.apiUrl}/medicaments/search?name=${name}`, {});
  }
}
