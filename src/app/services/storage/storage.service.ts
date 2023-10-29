import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
})
export class StorageService {

    public url = `${environment.baseAPI}`;
    public httpHeaders: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
    });

    constructor(
        protected http: HttpClient,
    ) {
    }

    public postUpload(folder: string, file: any): Observable<any> {
        const options = {
            headers: this.httpHeaders,
            params: {}
        };
        return this.http.post<any>(`${this.url}/upload/photo`, { folder, file }, options);

    }

    public downloadFile(path: string): Observable<any> {
        const options = {
            headers: this.httpHeaders,
            params: { path }
        };
        return this.http.get<any>(`${this.url}/upload/downloadfile`, options);

    }
}  