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
        'Content-Type': 'multipart/form-data',
        //'X-Content-Type-Options': 'nosniff',
    });

    constructor(
        protected http: HttpClient,
    ) {
    }

    public postUpload(folder: string, file: File): Observable<any> {
        const formData = new FormData();
        formData.append("folder", folder);
        formData.append("file", file, file.name);
        const options = {
            // No tama los headert correctamente
            // headers: this.httpHeaders,
            params: {}
        };
        return this.http.post<any>(`${this.url}/upload/photo`, formData, options);

    }

    public downloadFile(path: string): Observable<any> {
        const options = {
            // headers: this.httpHeaders,
            responseType: 'blob' as 'json',
            params: { path }
        };
        return this.http.get<Blob>(`${this.url}/upload/downloadfile`, options);

    }
}  