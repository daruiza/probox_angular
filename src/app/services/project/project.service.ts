import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    public url = `${environment.baseAPI}`;
    public httpHeaders: HttpHeaders = new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        //'X-Content-Type-Options': 'nosniff',
    });

    constructor(
        protected http: HttpClient,
    ) { }

    public upate(id: number,formData: any): Observable<any> {
        const options = {
            // No tama los headers correctamente
            // headers: this.httpHeaders,
            params: {}
        };
        return this.http.post<any>(`${this.url}/project/upate`, formData, options);
    }
}