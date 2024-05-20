import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {POSTExamination} from "../interfaces/ExaminitionInterface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExaminitationService {


  constructor(private http: HttpClient) {
  }

  // URL to the endpoint - adjust this URL to your actual endpoint
  private apiUrl = 'http://127.0.0.1:8011';

  NewConsulation(PostExamination: POSTExamination): Observable<POSTExamination> {
    return this.http.post<POSTExamination>(`${this.apiUrl}/consultation/`, PostExamination);
  }
}
