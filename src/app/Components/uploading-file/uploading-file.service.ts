import {Injectable} from '@angular/core';
import {NzUploadFile} from 'ng-zorro-antd/upload';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpRequest} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class UploadingFileService {

    private uploadUrl = 'https://www.mocky.io/v2/5cc8019d300000980a055e76'; // Replace with your actual upload URL
    private baseUrl = 'http://127.0.0.1:8011';

    constructor(private http: HttpClient) {
    }

    upload(file: NzUploadFile): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('file', file as any);

        const headers = new HttpHeaders({
            // Add any necessary headers here
        });

        const req = new HttpRequest('POST', this.uploadUrl, formData, {
            headers: headers,
            reportProgress: true,
            responseType: 'json'
        });

        return this.http.request(req);
    }

    uploadWithCertificationId(certification_id: number, files: File[]): Observable<any> {
        const formData: FormData = new FormData();
        files.forEach(file => formData.append('files', file as any));

        const headers = new HttpHeaders({
            // Add any necessary headers here
        });

        const url = `${this.baseUrl}/certificate/${certification_id}/uploading`;
        const req = new HttpRequest('POST', url, formData, {
            headers: headers,
            reportProgress: true,
            responseType: 'json'
        });

        return this.http.request(req);
    }

}
