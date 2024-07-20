import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from '@angular/common/http';
import {
    ChangePostCreate,
    ChangePostResponse,
    ChangePostUpdate,
    Page,
    QueryParams,
    StatusEnum
} from "./InterfaceChnagePost";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PostChangeService {
    private baseUrl = `${environment.apiUrl}/changepost`;

    constructor(private http: HttpClient) {
    }

    createChangePost(changepost: ChangePostCreate): Observable<ChangePostResponse> {
        return this.http.post<ChangePostResponse>(this.baseUrl, changepost);
    }

    getChangePosts(
        QueryParams: QueryParams
    ): Observable<Page<ChangePostResponse>> {
        let params = new HttpParams();
        if (QueryParams.status) params = params.set('status', QueryParams.status);
        if (QueryParams.year) params = params.set('year', QueryParams.year.toString());
        if (QueryParams.employee_id) params = params.set('employee_id', QueryParams.employee_id.toString());
        if (QueryParams.month) params = params.set('month', QueryParams.month.toString());
        if (QueryParams.day) params = params.set('day', QueryParams.day.toString());

        return this.http.get<Page<ChangePostResponse>>(this.baseUrl, {params});
    }

    updateChangePost(id: number, changepost: ChangePostUpdate): Observable<ChangePostResponse> {
        return this.http.put<ChangePostResponse>(`${this.baseUrl}/${id}`, changepost);
    }

    deleteChangePost(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
